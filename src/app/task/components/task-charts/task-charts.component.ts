import { Component, OnInit, Input } from '@angular/core';
import { TaskService, Task } from "../../task.barrel";
import { curveBasis } from "d3-shape";

type DiagramElement = { name: string, value: number };

@Component({
  selector: 'app-task-charts',
  templateUrl: './task-charts.component.html',
  styleUrls: ['./task-charts.component.css']
})
export class TaskChartsComponent implements OnInit {

  @Input() curve: any = curveBasis;

  public tasks: Task[];
  public loading: boolean = true;
  public diagram3OptionShowAllTask = false;
  private _visibleDiagram: number;
  private _diagram1Model: Array<any> = [];
  private _diagram3Model: Array<any> = [];
  private _diagram3ModelFinishedTasks: Array<any> = [];
  private _diagram3ModelAllTask: Array<any> = [];
  private _diagram4Model: Array<any> = [];
  public constructor(private _taskService: TaskService) {

  }

  public ngOnInit() {
    this.loadTasks();
  }

  public loadTasks() {
    this.loading = true;
    this._taskService.list({
      success: response => {
        this.tasks = response
        this._updateCharts();
      },
      finally: () => this.loading = false
    });
  }

  public _updateCharts() {
    let maps = new Map<string, DiagramElement>();
    let maps2 = new Map<string, DiagramElement>();
    let maps3 = new Map<string, DiagramElement>();
    let maps4 = new Map<string, DiagramElement>();

    this.tasks.sort((t1, t2) => Date.parse(t1.created_at) - Date.parse(t2.created_at));

    for (let entry of this.tasks) {
      // Diagram 1, 2
      let element = maps.get(entry.position.toString())
      if (element == undefined) {
        let diagramElement = {
          name: entry.position.toString() + " point",
          value: 1,
          task: "test"
        }
        maps.set(entry.position.toString(), diagramElement);
      } else {
        element.value += 1;
      }

      // Diagram 3

      if (entry.updated_at === entry.created_at) {
        continue;
      }
      let energyInMs = (entry.is_done ? Date.parse(entry.updated_at) : Date.now()) - Date.parse(entry.created_at);
      let energyInHours = energyInMs / 1000 / 60 / 60;
      let energyInPointsPerHours = entry.position / energyInHours;
      let dElement: DiagramElement = {
        name: entry.name,
        value: energyInPointsPerHours
      }
      if (entry.is_done) {
        maps2.set(entry.name, dElement);
      }
      maps3.set(entry.name, dElement);

      // Diagram 4
      let groupName =  entry.color == undefined ? "Without group" : entry.color.toString()
      let group = maps4.get(groupName)
      if (group == undefined) {
        let diagramElement = {
          name: groupName,
          value: entry.position
        }
        maps4.set(groupName, diagramElement);
      } else {
        group.value += entry.position;
      }

    }
    this._diagram1Model = Array.from(maps.values());
    this._diagram3ModelFinishedTasks = Array.from(maps2.values());
    this._diagram3ModelAllTask = Array.from(maps3.values());
    this._diagram3Model = [{ "name": "teszt", "series": this._diagram3ModelFinishedTasks }]
    this._diagram4Model = Array.from(maps4.values());

  }
  view: any[] = [500, 300];

  colorScheme = {
    domain: ['#f44336', '#673AB7', '#03A9F4', '#4CAF50', '#FFEB3B', '#FF5722']
  };

  onSelect(event) {
    console.log(event);
  }

  selectDiagram(index: number) {
    this._visibleDiagram = index;
  }

  isVisible(indexOfDiagram: number): Boolean {
    if (this._visibleDiagram > 0) {
      return this._visibleDiagram == indexOfDiagram;
    } else {
      return false;
    }
  }

  toggleAllTaskVisibilityOnDiagram3(event: any) {
    console.log(event.target.checked);
    this._diagram3Model = event.target.checked ? this._diagram3Model = [{ "name": "Estimation Goodness", "series": this._diagram3ModelAllTask }] : this._diagram3Model = [{ "name": "teszt", "series": this._diagram3ModelFinishedTasks }]
  }
}