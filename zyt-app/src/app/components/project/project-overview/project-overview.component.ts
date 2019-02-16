import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ProjectService } from '../../../_services/project.service';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';
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
  now = moment().format('YYYY-MM-DD');
  active: Array<String>;
  unactive: Array<String>;
  showOldElement: Boolean = false
  
  constructor(public dialog: MatDialog, private projectService: ProjectService) { }
  
  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }
  
  getProject(){
    this.projectService.getProjects().subscribe(
    (response)=> {
      this.data = response;
      let msgTotal
      let active = []
      let unactive = []
      this.data.forEach(element => {
        element.isInFuture =  moment(element.deadline).isAfter(this.now);
        if( moment(element.deadline).isAfter(this.now)){
          active.push(element)
        }else {
          unactive.push(element)
        }
        element.positions.forEach(e => {
          msgTotal = e.expenses.reduce(function(prev, cur) {
            return prev + cur.recorded_time;
          }, 0);
          e.total = msgTotal
        });
      });
      this.active = active
      this.unactive = unactive
    },
    (error) => console.log(error) 
  )
  this.checkProgressbar()
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
  let showElement = toggleButton.parentElement.children[1]
  let thisProjectContent = e.target.nextSibling
  
  let projectContents = document.querySelectorAll('.' + thisProjectContent.className);
  let thisSection = e.target.parentElement
  for(let i = 0; i < projectContents.length; i++){
    let sections = projectContents[i].parentElement
    
    if(sections.classList.contains('open__content')){
      if(!thisSection){
        sections.classList.remove('open__content');
        sections.classList.add('close__content');
      }
    }
    if(thisSection ==sections){
      if(thisSection.classList.contains('open__content')){
        thisSection.classList.remove('open__content');
        thisSection.classList.add('close__content');
        showElement.classList.add('closed')
        showElement.classList.remove('open')
      }else {
        thisSection.classList.add('open__content');
        thisSection.classList.remove('close__content'); 
        showElement.classList.add('open')
        showElement.classList.remove('closed')
      }
    }
  } 
}

showOldElements(e){
  let element = e.target
  this.showOldElement = !this.showOldElement
  if(this.showOldElement == true) {
    element.innerText = "Verberge vergangene Projekte";
  }else {
    element.innerText = "Zeige vergangene Projekte";
  }
}

ngOnInit() {
  this.getProject()  
}

}
