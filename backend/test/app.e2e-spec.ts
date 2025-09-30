import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import { UsersService } from '../src/users/users.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../src/auth/auth.module';
import { Task } from '../src/tasks/task.entity';
import { TasksModule } from '../src/tasks/tasks.module';
import { User } from '../src/users/user.entity';
import { UsersModule } from '../src/users/users.module';
import bcryptjs from 'bcryptjs';
import { JwtModule } from '@nestjs/jwt';

describe('E2E', () => {
  let app: INestApplication;
  let token: string;
  let usersService: UsersService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        // Replicamos os módulos do AppModule, mas trocamos a config do banco
        ConfigModule.forRoot({ isGlobal: true }),
        UsersModule,
        AuthModule,
        TasksModule,
        // E aqui vem a mágica:
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Task],
          synchronize: true,
        }),
        JwtModule.register({
          global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('v1');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('login should return a token', async () => {
    const res = await request(app.getHttpServer())
      .post('/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'admin@local.com', password: 'admin' })
    expect(res.status).toBe(201);
    expect(res.body.access_token).toBeDefined();
    token = res.body.access_token;
  });

  it('should create, list, update and delete a task', async () => {
    // create
    const created = await request(app.getHttpServer())
      .post('/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Task' })
      .expect(201);

    const id = created.body.id;
    expect(created.body.name).toBe('Test Task');

    // list
    const list = await request(app.getHttpServer())
      .get('/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(Array.isArray(list.body)).toBe(true);

    // update
    const updated = await request(app.getHttpServer())
      .patch(`/v1/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'done' }) // falhará enquanto enum/validação permitir valores quaisquer e service fizer create()
      .expect(200);
    expect(updated.body.status).toBe('done');

    // delete
    await request(app.getHttpServer())
      .delete(`/v1/tasks/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
