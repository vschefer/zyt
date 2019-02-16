import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatInputModule, MatSelectModule } from '@angular/material';
import { Router } from '@angular/router';
import { ProjectService } from '../../_services/project.service';
import { ExpenseService } from '../../_services/expenses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-expenses',
  templateUrl: './edit-expenses.component.html',
  styleUrls: ['./edit-expenses.component.scss']
})

export class EditExpenseComponent implements OnInit {
  recorded_time: number;
  comment: string;
  projects: any;
  project: any;
  position: string;
  affected_date: Date;
  snackBarMessage: string;
  snackBarButtonText: string;
  today: Date = new Date();
  expense
    positions
  constructor(
    public snackBar: MatSnackBar,
    private projectService: ProjectService,
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute,
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
  getProject(id) {
    this.projectService.getProject(id).subscribe((response) => {
        this.project = response;
        this.onProjectChange(this.project._id)
      }, (error) => {
        throw new Error(error._body);
      });  
  }

  onProjectChange(projectId: String) {
    this.project = this.projects.filter((project) => {
      return project._id === projectId;
    })[0];
    console.log(this.project._id)
  }

  onRecordedTimeChange(time: number) {
    this.recorded_time = time;
  }
  
  onPositionChange(pos: any) {
    this.position = pos;
    console.log(this.position)
  }
  getExpense(id){
    this.expenseService.getExpense(id).subscribe((response) => {
        this.expense = response;
        console.log(this.expense)
        
        this.getProject(this.expense.project._id)
        this.position = this.expense.position.name
        this.affected_date = this.expense.affected_date
        this.recorded_time = this.expense.recorded_time
        this.comment = this.expense.comment

      }, (error) => {
        throw new Error(error._body);
      });
  }
  saveExpense(id): void {
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

    this.expenseService.updateExpense(this.expense, id).subscribe((response) => {
        console.log(this.expense)
      this.openSnackBar(`${this.recorded_time}h wurde(n) für das Projekt "${this.project.name}" hinzugefügt.`, 'Ok');
      this.router.navigate(['/']);
    }, (error) => {
      this.openSnackBar(`Fehler: ${error._body}`, 'Ok');
      throw new Error(error._body);
    });
  }

  ngOnInit() {
    const expenseID = this.route.snapshot.paramMap.get('id');
    
    this.getProjects();
    this.getExpense(expenseID)
    // const poj = this.expense.project._id
    // this.getProject(poj)
  }
}
