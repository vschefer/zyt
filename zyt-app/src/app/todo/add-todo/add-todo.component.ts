import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {MatSnackBar} from '@angular/material';
import { ProjectService } from '../../_services/project.service';
import { TodoService } from '../../_services/todo.service';
import { UserService } from '../../_services';
import * as moment from 'moment';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent  implements OnInit {
    now = moment().format('YYYY-MM-DD');
    name:string
    data
    todo:Object
    proj:Array<String>;
    title: string
    description:string
    selectedUser
    status: string
    u: any
    projectID
    id
    
    activeProj
    
    constructor(
        private userService: UserService, 
        private projectService: ProjectService,
        private todoService: TodoService, 
        public snackBar: MatSnackBar
    ) {}

    message = this.title + 'wurde hinzugefügt';
    action = 'Ok';
    openSnackBar(message, action) {
        this.snackBar.open(message, action, {
            duration: 5000,
        });
    }
    
    getProjects() {
        this.projectService.getProjects().subscribe((response) => {
        this.data = response;
        let activeProj =[]
        this.data.forEach(element => {
          if(element.deadline >= this.now){
            activeProj.push(element)
          }
        });
        this.activeProj = activeProj
      },
      (error) => console.log(error)
    )
    }
    
    bleh(id) {
        this.projectID = id
        this.projectService.getProject(id).subscribe((response) => {
            let proj = [];
            
            let project = response;
            project['assigned_users'].forEach((user) => {
                proj.push({
                    "archived": user.archived,
                    "_id": user._id,
                    "first_name": user.first_name,
                    "surname": user.surname
                });
            });
            this.proj = proj;
        },
        (error) => console.log(error))  
    }
    
    getUser(id) {
        this.userService.getUser(id).subscribe((response) => {
            let proj = [];
            
            this.u = response;
            this.id = this.u._id
        },
        (error) => console.log(error)) 
    }
    
    onSave(){
        let nextButton = document.querySelector('.next')
        let prevButton = document.querySelector('.prev')
        let wrapper = document.querySelector('.wrapper')
        
        this.todo={
            status: 0,
            project: this.projectID,
            briefing:{
                title: this.title,
                description: this.description
            },
            assigned_users: [this.id]
        }
        this.todoService.addTodo(this.todo).subscribe((response) => {

        this.openSnackBar(`Das Todo ${this.title} wurde hinzugefügt.`, 'Ok');
        }
        )
    }  
    checkValid(){
        let invalid: Boolean
        let error = document.querySelector('.error-message')
        let input = document.querySelectorAll('mat-form-field')
        
        
        for(let i = 0; i < input.length; i++){
            if(input[i].classList.contains('ng-invalid')){
                invalid = true;
            }
        }
        if(!invalid){
            this.onSave()
        }else{
            error.classList.remove('hidden')
            
        }
    }
    
    ngOnInit() {
        this.getProjects()
        
    }
    
}
