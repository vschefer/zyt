import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {MatSnackBar} from '@angular/material';
import { TodoAddService } from './add-todo.service';
import { UsersUpdateService } from '../../user/update-user/update-user.service';
import { ProjectService } from '../../_services/project.service';


@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent  implements OnInit {
    name:string
    data: Object
    todo:Object
    proj:Array<String>;
    title: string
    description:string
    selectedUser
    status: string
    u: any
    projectID
    id
    
    
    
    constructor(
        private usersService: UsersUpdateService, 
        private projectService: ProjectService,
        private addTodoService: TodoAddService, 
        public snackBar: MatSnackBar
    ) {}

    message = this.name + 'wurde hinzugefügt';
    action = 'Ok';
    openSnackBar() {
        this.snackBar.open(this.message, this.action, {
            duration: 5000,
        });
    }
    
    getProject(){
        this.projectService.getProjects().subscribe(
            (response)=> {
                this.data = response;
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
        this.usersService.getUser(id).subscribe((response) => {
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
        this.addTodoService.addTodo(this.todo).subscribe(
            (response)=> console.log(response),
        )
        this.openSnackBar()
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
        this.getProject()
        
    }
    
}
