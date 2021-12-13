import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-app';
  contactForm;
  tasks: Task[]=[];
  userId: string="test user";
  constructor(private formBuilder: FormBuilder,private taskService:TaskService) {
    this.contactForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(500)]],
      attachments: [[]]
    });
    this.getTasks();
  }
  get description() {
    return this.contactForm.get('description');
  }
  getTasks(){
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }
  onSubmit() {
    console.log(this.contactForm.value);
    let task =  {description:this.contactForm.value.description,postImage:this.contactForm.value.attachments,createAt:new Date(),updateAt:new Date(),userId:this.userId} as Task;
    if(this.taskService.addTask(task))
    {
      this.tasks.push(task);
      //this.getTasks();
    };
    this.contactForm.reset();
  }
}
