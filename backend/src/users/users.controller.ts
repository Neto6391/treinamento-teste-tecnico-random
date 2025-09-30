import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private users: UsersService, private auth: AuthService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    dto.password = await this.auth.passwordHash(dto.password);
    return this.users.create({ passwordHash: dto.password, email: dto.email });
  }

}
