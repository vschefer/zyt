import { AppComponent } from './app.component';
import { WorkingTimeComponent } from './components/working-time/working-time.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo/todo-detail/todo-detail.component';
import { UserProfilComponent } from './components/dashboard/user-profil/user-profil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { WorkingWeekComponent } from './components/working-time/working-week/working-week.component';
import { UserEditComponent } from './components/dashboard/user-edit/user-edit.component';
import {ProjectComponent } from './components/project/project.component'
import { ProjectOverviewComponent } from './components/project/project-overview/project-overview.component';
import { UserComponent } from './components/user/user.component'
import { AddResourceComponent } from './components/ressource/add-resource/add-resource.component'
import { AllRessourceComponent } from './components/ressource/all-ressource/all-resource.component'
import { AddProjectComponent } from './components/project/add-project/add-project.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UpdateButtonComponent } from './components/project/project-overview/update-button/update-button.component';
import { UpdateButtonTodoComponent } from './components/todo/todo-list/update-button/update-button.component';
import { AddTodoComponent } from './components/todo/add-todo/add-todo.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { MobileNavComponent } from './components/toggleMobileNav/toggle-nav.component';

import { backendUrls } from './constant/backendurls';
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

import { AuthGuard } from './_guards';

import { ExpensesComponent } from './components/expenses/expenses.component';
import { AddExpensesComponent } from './components/expenses/add-expenses/add-expenses.component';
import { TodayExpensesComponent } from './components/expenses/today-expenses/today-expenses.component';
import { WeeksComponent } from './components/working-time/weeks/weeks.component';
import { WeekExpensesComponent } from './components/expenses/week-expenses/week-expenses.component'

import { ProjectService } from './_services/project.service';
import { RessourceService } from './_services/ressource.service';
import { TodoService } from './_services/todo.service';
import { UserService } from './_services/user.service';
import { AvatarService } from './_services/avatar.service';
import { ExpenseService } from './_services/expenses.service';
import { PositionService } from './_services/position.service';
import { EditRessourceComponent } from './components/ressource/edit-ressource/edit-ressource.component';
import { EditProjectComponent } from './components/project/edit-project/edit-project.component';
import { EditExpenseComponent } from './components/expenses/edit-expenses/edit-expenses.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkingTimeComponent,
    TodoListComponent,
    TodoDetailComponent,
    UserProfilComponent,
    DashboardComponent,
    NavigationComponent,
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
    UpdateButtonComponent,
    TodoDetailComponent,
    UpdateButtonTodoComponent,
    AddTodoComponent,
    UpdateUserComponent,
    MobileNavComponent,
    ExpensesComponent,
    AddExpensesComponent,
    TodayExpensesComponent,
    WeeksComponent,
    WeekExpensesComponent,
    EditRessourceComponent,
    EditProjectComponent,
    EditExpenseComponent

  ],
  entryComponents: [
    UserEditComponent,
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
        path: 'project/edit/:id',
        component: EditProjectComponent,
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
        path: 'ressource/edit/:id',
        component: EditRessourceComponent,
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
        path: 'expenses/add',
        component: AddExpensesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'expenses/overview',
        component: WeekExpensesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'expenses/edit/:id',
        component: EditExpenseComponent,
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
  providers: [AddResourceComponent, 
    ProjectService, UserService, RessourceService,
    AvatarService, TodoService, ExpenseService, PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
