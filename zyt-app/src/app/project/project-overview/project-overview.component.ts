import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ProjectOverviewService } from './project-overview.service'
import {MatDialog} from '@angular/material';
import { UpdateProjectComponent } from '../update-project/update-project.component';
@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss'],
  inputs: ['parentData'],
})

export class ProjectOverviewComponent implements OnInit {
  data
  name:string
  title:string
  description:string
  capitain:string
  startDate:Date
  endDate:Date
  servers:Object
  left: number = 0
  right:number = 0
  count:number = 0
  id
  
  constructor(public dialog: MatDialog, private projectService: ProjectOverviewService) { }
  
  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }
  
  getProject(){
    this.projectService.getProjects().subscribe(
    (response)=> {
      this.data = response;
      let msgTotal
      this.data.forEach(element => {
        element.positions.forEach(e => {
          msgTotal = e.expenses.reduce(function(prev, cur) {
            return prev + cur.recorded_time;
          }, 0);
          e.total = msgTotal
        });
      });
    },
    (error) => console.log(error) 
  )
  this.checkProgressbar()
}

getNextProject(){
  let nextButton = document.querySelector('.next')
  let prevButton = document.querySelector('.prev')
  let wrapper = document.querySelector('.wrapper')
  let projectCount = Object.keys(this.data).length
  let windowWidth = window.outerWidth
  let project = document.querySelector('.project').clientWidth
  this.left += project;
  this.count += 1;
  
  if(this.count <= (projectCount -1)){
    wrapper.setAttribute("style","transform: translate("+ -(this.left) + "px)" );
    if(this.count == (projectCount -1)){
      nextButton.classList.add('hidden')
    }else if(nextButton.classList.contains('.hidden')){
      nextButton.classList.remove('hidden')
    }
  }
  if(prevButton.classList.contains('hidden')){
    prevButton.classList.remove('hidden')
  }
}

getPreviosPage(){
  
  let prevButton = document.querySelector('.prev')
  let nextButton = document.querySelector('.next')
  let project = document.querySelector('.project').clientWidth
  let wrapper = document.querySelector('.wrapper')
  this.left = this.left - project
  this.count -= 1;
  let projectCount = Object.keys(this.data).length
  
  if(this.count <= 0){
    prevButton.classList.add('hidden')
  }
  if(this.count <= (projectCount -1)){
    wrapper.setAttribute("style", "transform: translate("+ -(this.left) + "px)" );
  }
  if(nextButton.classList.contains('hidden')){
    nextButton.classList.remove('hidden')
  }
}
checkProgressbar(){
  
  setTimeout(function () {
    let progressBars = document.querySelectorAll('.progress-bar__progressing');
    let arr = []
    for(let i = 0; i < progressBars.length; i++){
      arr.push(progressBars[i])
    }
    
    arr.forEach(progressBar => {
      let progress = progressBar.style.width
      let progressNumber = progress.replace('%','');
      if(progressNumber >= 100){
        progressBar.style.backgroundColor = '#e45061';
        progressBar.style.width =  '100%';
      }
    });
  }, 2000);
  
  
}

toggleAccordion (e){
  let toggleButton = e.target
  let thisProjectContent = e.target.nextSibling
  let projectContents = document.querySelectorAll('.project__content');
  
  for(let i = 0; i < projectContents.length; i++){
    if(projectContents[i].classList.contains('open__content')){
      if(!thisProjectContent){
        projectContents[i].classList.remove('open__content');
        projectContents[i].classList.add('close__content');
      }
    }
    if(thisProjectContent == projectContents[i]){
      if(thisProjectContent.classList.contains('open__content')){
        thisProjectContent.classList.remove('open__content');
        thisProjectContent.classList.add('close__content');
        toggleButton.classList.add('closed')
        toggleButton.classList.remove('open')
      }else {
        thisProjectContent.classList.add('open__content');
        thisProjectContent.classList.remove('close__content'); 
        toggleButton.classList.add('open')
        toggleButton.classList.remove('closed')
      }
    }
  } 
}

ngOnInit() {
  this.getProject()  
}

}
