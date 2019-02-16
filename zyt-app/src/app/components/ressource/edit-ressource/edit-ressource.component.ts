import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatInputModule, MatSelectModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RessourceService } from '../../../_services/ressource.service';
import { ProjectService } from '../../../_services/project.service';
import { Location } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-ressource',
  templateUrl: './edit-ressource.component.html',
  styleUrls: ['./edit-ressource.component.scss']
})
export class EditRessourceComponent implements OnInit {

  ressource: any;
  projects: any;
  project: any;
  users: any;
  assigned_user: string;
  start: Date;
  stop: Date;
  total_time_expected: number;

  constructor(
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private ressourceService: RessourceService,
    private location: Location,
    private projectService: ProjectService,
  ) { }

  getRessource(id: string): void {
    this.ressourceService.getRessource(id).subscribe((response) => {
      response['start'] = moment(response['start']).utc()['_d'];
      response['stop'] = moment(response['stop']).utc()['_d'];
      this.ressource = response;
      const projectID = response['project']['_id'];
      this.onProjectChange(projectID);
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  updateRessource(data: object, id: string): void {
    this.ressourceService.updateRessource(data, id).subscribe((response) => {
      this.openSnackBar(`Ressource wurde angepasst.`, 'Ok');
      this.location.back();
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
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
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  onProjectChange(projectID: string): void {
    this.projectService.getProject(projectID).subscribe((response) => {
      this.project = response;
    }, (error) => {
      this.openSnackBar(`Fehler: ${error.error}`, 'Ok');
      throw new Error(error.error);
    });
  }
  
  onAssignedUserChange(userID: string): void {
    this.assigned_user = userID;
  }
  
  onStartChange(start: Date): void {
    this.start = moment(start).set({hour: 0, minute: 0}).toDate()
  }
  
  onStopChange(stop): void {
    this.stop = moment(stop).set({hour: 23, minute: 59}).toDate();
  }
  
  onExpectedTimeChange(total_time_expected: number): void {
    this.total_time_expected = total_time_expected;
  }
  
  onSave(): void {
    const modifiedRessource = {
      project: this.project._id,
      assigned_user: this.assigned_user || this.ressource.assigned_user._id,
      start: this.start || this.ressource.start,
      stop: this.stop || this.ressource.stop,
      total_time_expected: this.total_time_expected || this.ressource.total_time_expected,
    };
    
    this.updateRessource(modifiedRessource, this.ressource['_id']);
  }

  ngOnInit() {
    const ressourceID = this.route.snapshot.paramMap.get('id');
    this.getRessource(ressourceID);
    this.getProjects();
  }
}
