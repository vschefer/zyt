import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server.service'
import { MatSnackBar, MatInputModule, MatSelectModule } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.scss']
})

export class AddExpensesComponent implements OnInit {
  recorded_time: number;
  comment: string;
  projects: string;
  project: any;
  position: string;
  affected_date: Date;
  snackBarMessage: string;
  snackBarButtonText: string;
  today: Date = new Date();
  expense: object;

  constructor(
    private serverService: ServerService,
    public snackBar: MatSnackBar,
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
    this.serverService.getAll('http://localhost:9000/api/projects').subscribe((response) => {
      this.projects = response.json();
    }, (error) => {
      throw new Error(error._body);
    });
  }

  onProjectChange(projectId: String) {
    this.serverService.getAll('http://localhost:9000/api/projects/' + projectId).subscribe((response) => {
      this.project = response.json();
    }, (error) => {
      throw new Error(error._body);
    });
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

    this.serverService.add(this.expense, 'http://localhost:9000/api/expenses').subscribe((response) => {
      this.openSnackBar(`${this.recorded_time}h wurde(n) für das Projekt "${this.project.name}" hinzugefügt.`, 'Ok');
      this.router.navigate(['/']);
    }, (error) => {
      this.openSnackBar(`Fehler: ${error._body}`, 'Ok');
      throw new Error(error._body);
    });
  }

  ngOnInit() {
    this.getProjects();
    //this.getSpecificProject('5c44ce218a346c3c51fd78f1');
  }
}
