import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './tasks.status';
import { TasksRepository1 } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository1) {}

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.tasksRepository.getTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    return await this.tasksRepository.updateTaskStatus(id, status);
  }
}
