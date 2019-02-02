import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {MatSnackBar} from '@angular/material';
import { FormBuilder, FormGroup, FormArray} from '@angular/forms'
import { UsersService } from '../../user/user.service';
import { UsersUpdateService } from '../../user/update-user/update-user.service';
import { ProjectService } from '../../_services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent  implements OnInit {
  name:string = ''
  description:string
  capitain:string
  startDate:any
  endDate:any
  servers:Object
  users:Object
  assigned_users: Object
  right: number = 0
  count:number = 0
  u: Object
  user: Object
  select: Array<String>
  us:Object;
  userList:Array<String>;
  posList:Array<String>;
  total = 0
  selectedUser
  myForm: FormGroup
  constructor(private projectService: ProjectService,
    private usersService: UsersService,
    private userService: UsersUpdateService,
    public snackBar: MatSnackBar, private fb: FormBuilder) {}
    
    openSnackBar() {
      let message = this.name + 'wurde hinzugefügt';
      let action = 'Ok';
      this.snackBar.open(message,action, {
        duration: 5000,
      });
    }
    getUsers(){
      this.usersService.getUsers().subscribe(
        (response)=> {
          this.users = response;
        },
        (error) => console.log(error)
      ) 
    }
    getManager(id) {
      this.userService.getUser(id).subscribe((response) => {
      let proj = [];
      this.u = response;
    },(error) => console.log(error)) 
  }
  getUser(id) {
    let userList = [];
    this.select.forEach((user)=>{
      this.userService.getUser(user).subscribe((response) => { 
        this.us = response;
        userList.push(this.us);
      },
      (error) => console.log(error))
    })
    this.userList = userList
  }
  
  onSave(){
    let nextButton = document.querySelector('.next')
    let prevButton = document.querySelector('.prev')
    let wrapper = document.querySelector('.wrapper')
    let posList = [];
    this.postitionForm.controls[0].value
    this.postitionForm.controls.forEach((pos)=>{
      posList.push(
        pos.value
      );
    })
    posList.forEach((number) =>{
      let n = number.total_time_offered
      this.total += n
    })
    this.posList = posList
    
    this.servers= {
      project_managers: [
        this.capitain
      ],
      positions: this.posList,
      assigned_users: this.select,
      name: this.name,
      briefing: {
        description: this.description
      },
      start: this.startDate,
      deadline: this.endDate,
      total_time_offered: this.total
    }
    this.projectService.addProject(this.servers).subscribe()
    this.openSnackBar()
    this.name = ''
    wrapper.setAttribute("style", "transform: translate( 0px)" );
    
    prevButton.classList.add('hidden')
    if(nextButton.classList.contains('hidden')){
      nextButton.classList.remove('hidden')
    }
  }  
  
  
  getNextPage(){
    let nextButton = document.querySelector('.next')
    let prevButton = document.querySelector('.prev')
    let wrapper = document.querySelector('.wrapper')
    let form = document.querySelectorAll('.project-form__page')
    let input = document.querySelectorAll('mat-form-field')
    let sliderLength = document.querySelectorAll('.project-form__page').length
    let save = document.querySelector('.button--save')
    let windowWidth = window.outerWidth
    let invalid: Boolean
    let page = document.querySelector('.project-form__page').clientWidth
    
    for(let i = 0; i < input.length; i++){
      if(this.count == 0){
        if(input[i].classList.contains('ng-invalid') && i <= 4){
          invalid = true;
        }
      }else if(this.count == 1){
        if(input[i].classList.contains('ng-invalid') && i <= 6 ){
          invalid = true;
        }
      }else if(this.count == 2){
        if(input[i].classList.contains('ng-invalid') ){
          save.classList.add('hidden')
        }
      }
      
    }
    
    if(!invalid){
      this.right += page;
      this.count += 1;
      if(this.count <= (sliderLength -1)){
        wrapper.setAttribute("style","transform: translate("+ -(this.right) + "px)" );
        if(this.count == (sliderLength -1)){
          nextButton.classList.add('hidden')
        }else if(nextButton.classList.contains('.hidden')){
          nextButton.classList.remove('hidden')
        }
      }
      if(this.count == sliderLength-1){ 
        save.removeAttribute("disabled");
        save.setAttribute("enabled", "");
      }
      if(prevButton.classList.contains('hidden')){
        prevButton.classList.remove('hidden')
      }
      nextButton.classList.remove('readyForClick');
    }
  }
  
  getPreviosPage(){
    let prevButton = document.querySelector('.prev')
    let nextButton = document.querySelector('.next')
    let page = document.querySelector('.project-form__page').clientWidth
    let wrapper = document.querySelector('.wrapper')
    this.right = this.right - page
    this.count -= 1;
    let sliderLength = document.querySelectorAll('.project-form__page').length
    
    if(this.count <= 0){
      prevButton.classList.add('hidden')
    }
    if(this.count <= (sliderLength -1)){
      wrapper.setAttribute("style", "transform: translate("+ -(this.right) + "px)" );
    }
    if(nextButton.classList.contains('hidden')){
      nextButton.classList.remove('hidden')
    }
  }
  
  get postitionForm (){
    return this.myForm.get('positions') as FormArray
  }
  
  ngOnInit() {
    this.getUsers()
    
    this.myForm = this.fb.group({
      positions: this.fb.array([this.fb.group({
        name: '',
        total_time_offered: '',})
      ])
    })
  }
  
  addPosition(){
    const pos = this.fb.group({
      name: '',
      total_time_offered: ''
    })
    this.postitionForm.push(pos)
  }
  deletePostition(i){
    this.postitionForm.removeAt(i)
  }
  
  checkFormForButton(){
    let nextButton = document.querySelector('.next')
    nextButton.classList.add('readyForClick');
  }
}
