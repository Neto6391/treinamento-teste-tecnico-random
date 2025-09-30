import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { JwtUserPayload } from 'src/auth/user.interface';
import { UsersService } from 'src/users/users.service';
import { User as UserEntity } from 'src/users/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('tasks')
export class TasksController {
  constructor(private tasks: TasksService, private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all() {
    return this.tasks.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@User() user: JwtUserPayload, @Body() dto: CreateTaskDto) {
    return this.tasks.create({...dto, owner: (await this.usersService.findByUserId(parseInt(user.userId)) as UserEntity )});
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto) {
    return this.tasks.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasks.remove(id);
  }
}
