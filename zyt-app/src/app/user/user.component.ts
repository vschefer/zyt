import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ServerService } from '../server.service';
import { ProjectOverviewComponent } from '../project/project-overview/project-overview.component'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  data:Object
  down: number = 0

  count:number = 0
  constructor(private serverService: ServerService) { 
  }

  getUsers(){
    this.serverService.getAll('http://localhost:9000/api/users').subscribe(
      (response)=> {
        this.data = response.json();
      },
      (error) => console.log(error)
    )
  }

  pageDown(){
    let nextButton = document.querySelector('.down')
    let prevButton = document.querySelector('.upside')
    let wrapper = document.querySelector('.wrapper')
   let userCount = Object.keys(this.data).length / 4
   userCount = Math.ceil(userCount)
    let windowWidth = window.outerWidth
   let page = document.querySelector('.wrapper').clientHeight
   let windowHeight = window.innerHeight

    this.down += windowHeight;
    this.count += 1;
    console.log(userCount)


    
    // wrapper.style.left = (windowWidth - 300) + 'px';
    if(this.count <= (userCount -1)){
      wrapper.setAttribute("style","transform: translateY(-"+this.down+"px)" );
   
    }
    if(this.count == (userCount -1)){
      nextButton.classList.add('transparent');
    }else if(nextButton.classList.contains('.transparent')){
      nextButton.classList.remove('transparent')
    }

    if(prevButton.classList.contains('transparent')){
      
      prevButton.classList.remove('transparent')
    }
  }
  pageUp(){
let windowHeight = window.innerHeight
    let prevButton = document.querySelector('.upside')
    let nextButton = document.querySelector('.down')
    let page = document.querySelector('.wrapper').clientHeight
    let wrapper = document.querySelector('.wrapper')
    this.down -= windowHeight
    
    this.count -= 1;
    let userCount = Object.keys(this.data).length / 4
    userCount = Math.ceil(userCount)

    if(this.count <= 0){
      prevButton.classList.add('transparent')
    }
    if(this.count <= (userCount -1)){
      wrapper.setAttribute("style", "transform: translateY("+this.down+"px)" );
    }
    if(nextButton.classList.contains('transparent')){
      nextButton.classList.remove('transparent')
    }
    


  }
  ngOnInit() {
    this.getUsers()
  }

}
