import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { strictEqual } from 'assert';
import { log } from 'console';
import { query } from 'express';
import { get } from 'https';
import { title } from 'process';
import { retry } from 'rxjs';
import { CreateTaslDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Tasks, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Tasks[] {
    // if we have any filter defined, call taskService.getTaskWithFilter
    // otherwise getAllTask
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaslDto) {
    this.tasksService.createTasks(createTaskDto);
    console.log('Body', createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Tasks {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deletTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Tasks {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateStatusByTaskId(id, status);
  }
}
