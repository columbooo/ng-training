import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  TaskRoutingModule,
  TaskListComponent,
  TaskListItemComponent,
  TaskService,
  AgePipe
} from './task.barrel';
import { TaskChartsComponent } from './components/task-charts/task-charts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TaskRoutingModule,
    NgxChartsModule
  ],
  declarations: [
    TaskListComponent,
    TaskListItemComponent,
    AgePipe,
    TaskChartsComponent
  ],
  providers: [
    TaskService
  ]
})
export class TaskModule { }
