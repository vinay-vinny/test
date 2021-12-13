import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTasks():Observable<Task[]> {
    return this.http.get<Task[]>('../../assets/tasks.json');
  }
addTask(task:Task):Observable<boolean> | boolean {
  
  return this.http.post<boolean>('../../assets/tasks.json',task);
}

}