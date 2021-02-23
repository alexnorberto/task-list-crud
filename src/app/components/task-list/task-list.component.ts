import { Component, OnInit, ViewEncapsulation } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskListComponent implements OnInit {

  listOfLists: string[] = ['water', 'Clogs', 'Loafers','water'];
  listOfTasks: string[] =  ['water', 'Clogs', 'Loafers','water', 'Clogs', 'Loafers','water', ];

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
