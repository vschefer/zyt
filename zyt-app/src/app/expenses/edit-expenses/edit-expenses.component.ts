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
  project
  proj: any;
  position: string;
  affected_date: Date;
  snackBarMessage: string;
  snackBarButtonText: string;
  today: Date = new Date();
  assignedProj
  saveExp
  expense
  projId
  expenseID
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

  onProjectChange(projectId: String) {
    this.proj = this.projects.filter((project) => {
      return project._id === projectId;
    })[0];
  }

  onRecordedTimeChange(time: number) {
    this.recorded_time = time;
  }
  
  onPositionChange(pos: any) {
    this.position = pos;
  }
  getExpense(id){
    this.expenseService.getExpense(id).subscribe((response) => {
        this.expense = response;
        
        
        this.projId = this.expense.project._id
        this.project = this.expense.project
        this.position = this.expense.position._id
        this.affected_date = this.expense.affected_date
        this.recorded_time = this.expense.recorded_time
        this.comment = this.expense.comment
      }, (error) => {
        throw new Error(error._body);
      });
  }
  saveExpense(): void {


    this.saveExp = {
      recorded_time: this.recorded_time,
    	comment: this.comment,
    	project: this.project._id,
    	position: this.position,
    	affected_date: this.affected_date,
    };
    this.expenseService.updateExpense(this.saveExp, this.expenseID).subscribe((response) => {
      this.openSnackBar(`Arbeitsbericht für das Projekt "${this.project.name}" wurde bearbeitet.`, 'Ok');
      this.router.navigate(['/expenses/overview']);
    }, (error) => {
      this.openSnackBar(`Fehler: ${error._body}`, 'Ok');
      throw new Error(error._body);
    });
  }

  ngOnInit() {
    const expenseID = this.route.snapshot.paramMap.get('id');
    this.expenseID = expenseID;
    // const poj = this.expense.project._id
    // 
    // this.getProjects();
    this.getExpense(expenseID)

    
  }
}
