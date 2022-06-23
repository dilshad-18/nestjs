import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaslDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Tasks, TaskStatus } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  getTaskWithFilter(getTaskFIlterDto: GetTaskFilterDto): Tasks[] {
    const { status, search } = getTaskFIlterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  createTasks(createTaskDto: CreateTaslDto): Tasks {
    const task: Tasks = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Tasks {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with id = ${id} not found`);
    }
    return found;
  }

  deleteTaskById(id: string): void {
    const found = this.tasks.find((task) => task.id === id); // not the best way since we are wasting network calls
    if (!found) {
      throw new NotFoundException(`Task with id = ${id} not found`);
    }
    this.tasks = this.tasks.filter((task) => task.id != id);
  }

  updateStatusByTaskId(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
