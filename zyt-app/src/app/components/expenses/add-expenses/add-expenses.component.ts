import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatInputModule, MatSelectModule } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectService } from '../../../_services/project.service';
import { ExpenseService } from '../../../_services/expenses.service';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})

export class AddExpensesComponent implements OnInit {
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

  constructor(
    public snackBar: MatSnackBar,
    private projectService: ProjectService,
    private expenseService: ExpenseService,
    private router: Router,
  ) { }
  
  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key]);
  }
  
  openSnackBar(message, buttonText) {
    this.snackBar.open(message, buttonText, {
      duration: 3000,
    });
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((response) => {
      this.projects = response;
    }, (error) => {
      throw new Error(error._body);
    });
  }

  onProjectChange(projectId: String) {
    this.project = this.projects.filter((project) => {
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
