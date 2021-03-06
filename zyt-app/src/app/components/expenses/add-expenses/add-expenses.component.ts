import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatInputModule, MatSelectModule } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectService } from '../../../_services/project.service';
import { ExpenseService } from '../../../_services/expenses.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})

export class AddExpensesComponent implements OnInit {
  @ViewChild('picker') picker;
  now = moment().format('YYYY-MM-DD');
  recorded_time: number;
  comment: string;
  projects: any;
  project: any;
  position: string;
  affected_date: Date;
  snackBarMessage: string;
  snackBarButtonText: string;
  today: Date = new Date();
  expense: object;
  data
  activeProj
  constructor(
    public snackBar: MatSnackBar,
    private projectService: ProjectService,
    private expenseService: ExpenseService,
    private router: Router,
  ) { }
  open() {
    this.picker.open();
  }
  
  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key]);
  }
  
  openSnackBar(message, buttonText) {
    this.snackBar.open(message, buttonText, {
      duration: 3000,
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

  onProjectChange(projectId: String) {
    this.project = this.activeProj.filter((project) => {
      project['positions'] = project['positions'].filter(pos => {
        return !pos.archived;
      });
      return project._id === projectId;
    })[0];
  }

  onRecordedTimeChange(time: number) {
    this.recorded_time = time;
  }
  
  onPositionChange(pos: any) {
    this.position = pos;
  }
  
  saveExpense(): void {
    if (typeof this.project === "undefined") {
      return this.openSnackBar(`Bitte wähle ein Projekt`, 'Ok');
    };

    this.expense = {
      recorded_time: this.recorded_time,
    	comment: this.comment,
    	project: this.project["_id"],
    	position: this.position,
    	affected_date: this.affected_date,
    };

    this.expenseService.addExpense(this.expense).subscribe((response) => {
      this.openSnackBar(`${this.recorded_time}h wurde(n) für das Projekt "${this.project.name}" hinzugefügt.`, 'Ok');
      this.router.navigate(['/']);
    }, (error) => {
      this.openSnackBar(`Fehler: ${error._body}`, 'Ok');
      throw new Error(error._body);
    });
  }

  ngOnInit() {
    this.getProjects();
  }
}
