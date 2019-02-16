import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatInputModule, MatSelectModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../_services/project.service';
import { UserService } from '../../../_services/user.service';
import { PositionService } from '../../../_services/position.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {

  project: Object;
  projectID: string;
  positions: any;
  positionNameNew: String;
  totalTimeOfferedNew: String;

  assigned_users: any;
  assigned_usersList: string[];
  selected_employees: string[];
  employees: any;
  name: string;
  briefingDescription: string;
  startDate: Date;
  deadlineDate: Date;
  total: Number = 0;
  
  showArchivedPositions: Boolean = false;

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location,
    private projectService: ProjectService,
    private userService: UserService,
    private positionService: PositionService,
  ) { }

  getUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.employees = response;
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  getProject(id: string): void {
    this.projectService.getProject(id).subscribe((response) => {
      this.project = response;
      this.positions = this.project['positions'];
      this.assigned_users = new FormControl();
      this.selected_employees = this.employees.filter((employee) => {
        return this.project['assigned_users'].map((user) => user._id).includes(employee['_id']);
      }).map((user) => user._id);
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  onSaveExistingPosition(id): void {
    const positionName = document.getElementById(id).querySelector('.js-position-name')['value'];
    const positionExpectedTime = document.getElementById(id).querySelector('.js-position-total-time')['value'];
    const data = {
      name: positionName,
      total_time_offered: positionExpectedTime,
    }
    this.positionService.updatePosition(data, id).subscribe((response) => {
      this.openSnackBar(`Position ${positionName} wurde angepasst.`, 'Ok');
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  onActivateDeactivePosition(id, archived): void {
    archived = !archived;
    this.positionService.activateDeactivatePosition(id, archived).subscribe((response) => {
      this.positions = this.positions.map(elem => {
      	if (elem._id === id) {
      		elem.archived = archived;
      		return elem;
      	}
        return elem;
      });
      this.openSnackBar(`Position ${response['name']} wurde ${archived ? "deaktiviert" : "aktiviert"}.`, 'Ok');
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  onAddPosition(project): void {
    const name = document.getElementById('nameNew');
    const nameValue = document.getElementById('nameNew')['value'];
    const time = document.getElementById('totalTimeOfferedNew');
    const timeValue = document.getElementById('totalTimeOfferedNew')['value'];

    const position = {
      project: project,
      name: nameValue,
      total_time_offered: timeValue,
    };
    
    this.positionService.addPosition(position).subscribe((response) => {
      const positions = this.positions;
      positions.push(response);
      this.positions = positions;
      name['value'] = '';
      time['value'] = '';
      this.openSnackBar(`Position ${response['name']} wurde hinzugefügt.`, 'Ok');
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  openSnackBar(message: string, buttonText: string): void {
    this.snackBar.open(message, buttonText, {
      duration: 3000,
    });
  }
  
  onNameChange(val: string): void {
    this.name = val;
  }
  
  onDescriptionChange(val: string): void {
    this.briefingDescription = val;
  }
  
  onStartChange(startDate: Date): void {
    this.startDate = startDate;
  }
  
  onDeadlineChange(deadlineDate: Date): void {
    this.deadlineDate = deadlineDate;
  }
  
  onProjectPropertiesSave() {
    const project = {
      name: this.name || this.project['name'],
      briefing: {
        description: this.briefingDescription || this.project['briefing']['description'],
      },
      start: this.startDate || this.project['start'],
      deadline: this.deadlineDate || this.project['deadline'],
      assigned_users: this.selected_employees,
      total_time_offered: this.total,
    }
    this.projectService.updateProject(project, this.projectID).subscribe((response) => {
      this.getProject(this.projectID);
      this.openSnackBar(`Projekteigenschaften von ${project.name} wurden aktualisiert.`, 'Ok');
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  toggleShowArchivedPositions() {
    this.showArchivedPositions = !this.showArchivedPositions;
  }

  ngOnInit() {
    const projectID = this.route.snapshot.paramMap.get('id');
    this.projectID = projectID;
    this.getUsers();
    this.getProject(projectID);
  }

}
