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
import { MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatSnackBar, MatSnackBarModule, MatRadioButton, MatRadioModule } from '@angular/material';
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
import {ProjectComponent } from './project/project.component'
import { ProjectOverviewComponent } from './project/project-overview/project-overview.component';
import { UserComponent } from './user/user.component'
import { AddResourceComponent } from './add-resource/add-resource.component'
import { AllRessourceComponent } from './all-ressource/all-resource.component'
import { ServerService } from './server.service';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { HttpModule } from '@angular/http';
import { AddUserComponent } from './user/add-user/add-user.component'
import { DateFormatPipe } from './pipes/format-date.pipe';
import { OrderModule } from 'ngx-order-pipe';
//import { IndexKeyPipe } from './pipes/index-key.pipe';

import { AuthGuard } from './_guards';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { UpdateProjectService } from './project/project-overview/project-overview.service';
import { UpdateButtonComponent } from './project/project-overview/update-button/update-button.component';
import { UpdateButtonTodoComponent } from './todo/todo-list/update-button/update-button.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';


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
    UserEditComponent,
    ProjectComponent,
    ProjectOverviewComponent,
    UserComponent,
    AddResourceComponent,
    AllRessourceComponent,
    AddProjectComponent,
    AddUserComponent,
    DateFormatPipe,
    UpdateProjectComponent,
    UpdateButtonComponent,
    TodoDetailComponent,
    UpdateButtonTodoComponent,
    AddTodoComponent,
    UpdateUserComponent

  ],
  entryComponents: [
    TimeFormComponent,
    UserEditComponent,
    UpdateProjectComponent,
    TodoDetailComponent,
    UpdateUserComponent
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
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
    MatSnackBarModule,
    MatRadioModule,
    HttpModule,
    OrderModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project',
        component: ProjectComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'project/add',
        component: AddProjectComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users/add',
        component: AddUserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ressource',
        component: AddResourceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'ressource/all',
        component: AllRessourceComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'todo',
        component: TodoListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'todo/add',
        component: AddTodoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      { path: '**', redirectTo: 'home' }
    ]),
    HttpClientModule,

  ],
  providers: [SideBarService, AddResourceComponent, ServerService, UpdateProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
