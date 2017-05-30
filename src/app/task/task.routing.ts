import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaskListComponent, TaskChartsComponent } from './task.barrel'

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'list', component: TaskListComponent },
    { path: 'charts', component: TaskChartsComponent }
  ])],
  exports: [RouterModule]
})
export class TaskRoutingModule {
  //
}
