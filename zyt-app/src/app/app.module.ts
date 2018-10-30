import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WorkingTimeComponent } from './working-time/working-time.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { TimeComponent } from './dashboard/time/time.component';
import { UserProfilComponent } from './dashboard/user-profil/user-profil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { PlanComponent } from './plan/plan.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TimeFormComponent } from '../app/dashboard/time/time-form/time-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatFormFieldModule, MatSelectModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AdminComponent } from './admin/admin.component';
import {RouterModule} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SideBarService } from './todo/todo-detail/todo-detail.service';
import { ChartsModule } from 'ng2-charts';
import { WorkingMonthComponent } from './working-time/working-month/working-month.component';
import { WorkingWeekComponent } from '../app/working-time/working-week/working-week.component';
import { UserEditComponent } from './dashboard/user-edit/user-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    WorkingTimeComponent,
    TodoListComponent,
    TodoDetailComponent,
    UserProfilComponent,
    TimeComponent,
    DashboardComponent,
    NavigationComponent,
    PlanComponent,
    TimeFormComponent,
    AdminComponent,
    LoginComponent,
    HomeComponent,
    WorkingMonthComponent,
    WorkingWeekComponent,
    UserEditComponent
   

  ],
  entryComponents: [
    TimeFormComponent,
    UserEditComponent
  ],
  exports: [
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      }
    ]),
    HttpClientModule,
  
  ],
  providers: [SideBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
