
    import { Injectable, Output, EventEmitter } from '@angular/core'
    import {MatDialog} from '@angular/material';
    import { UpdateProjectComponent } from '../update-project/update-project.component';
    @Injectable()
    export class UpdateProjectService {
        id
    constructor(public dialog: MatDialog){
        
    }
 
    openDialog(projectId): void {
       console.log(projectId)
          
        const dialogRef = this.dialog.open(UpdateProjectComponent, {
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
      
          });
     
        }
    

    
    }
