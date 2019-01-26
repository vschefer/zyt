import { AppComponent } from './app.component';
import { WorkingTimeComponent } from './working-time/working-time.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { TimeComponent } from './dashboard/time/time.component';
import { UserProfilComponent } from './dashboard/user-profil/user-profil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { TimeFormComponent } from '../app/dashboard/time/time-form/time-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { WorkingWeekComponent } from '../app/working-time/working-week/working-week.component';
import { UserEditComponent } from './dashboard/user-edit/user-edit.component';
import {ProjectComponent } from './project/project.component'
import { ProjectOverviewComponent } from './project/project-overview/project-overview.component';
import { UserComponent } from './user/user.component'
import { AddResourceComponent } from './add-resource/add-resource.component'
import { AllRessourceComponent } from './all-ressource/all-resource.component'
import { AddProjectComponent } from './project/add-project/add-project.component';
import { AddUserComponent } from './user/add-user/add-user.component'
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { UpdateButtonComponent } from './project/project-overview/update-button/update-button.component';
import { UpdateButtonTodoComponent } from './todo/todo-list/update-button/update-button.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { MobileNavComponent } from './toggleMobileNav/toggle-nav.component';

import { DateFormatPipe } from './pipes/format-date.pipe';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpModule } from '@angular/http';

import { OrderModule } from 'ngx-order-pipe';
import {MatButtonModule} from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatNativeDateModule, MatSnackBar, MatSnackBarModule, MatRadioButton, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RouterModule} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { ProjectOverviewService } from './project/project-overview/project-overview.service';
import { ProjectAddService } from './project/add-project/add-project.service';
import { ServerService } from './server.service';
import { TodoDetailService } from './todo/todo-detail/todo-detail.service';
import { TodoAddService } from './todo/add-todo/add-todo.service'

import { AuthGuard } from './_guards';
import { ProjectService } from './project/project.service';
import { ProjectUpdateService } from './project/update-project/update-project.service';
import { UsersService } from './user/user.service';
import { UsersUpdateService } from './user/update-user/update-user.service';
import { UsersAddService } from './user/add-user/add-user.service';

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
    TimeFormComponent,
    LoginComponent,
    HomeComponent,
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
    UpdateUserComponent,
    MobileNavComponent,

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
    HttpClientModule,
    OrderModule,
    MatButtonModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent,
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
  providers: [TodoDetailService, AddResourceComponent, 
    ServerService, ProjectOverviewService, ProjectService, 
    ProjectAddService, ProjectUpdateService, UsersService, 
    UsersUpdateService, UsersAddService, TodoAddService],
  bootstrap: [AppComponent]
})
export class AppModule { }
