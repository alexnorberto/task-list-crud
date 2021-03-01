import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskServiceService } from './task-service.service';

import {MatDialog} from '@angular/material/dialog';
import { NewListComponent } from '../new-list/new-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NewTaskComponent } from '../new-task/new-task.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { EditListComponent } from '../edit-list/edit-list.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

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

  listOfLists = [];
  listOfTasks = [];
  urlId: string;
  activeListTitle;
    
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private taskService: TaskServiceService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params) => {
        this.urlId = params.listId;

        this.taskService.getOneList(this.urlId).subscribe(
          (list:any) => {
            this.activeListTitle = list.title;        
            console.log("activeListTitle: ", this.activeListTitle);
          }
        );  

        console.log("url id 1",this.urlId);
      }
    );   

    this.getLists();
    this.getTasks();
    
  }

  /** CLOSEDIALOG dialogRef
   * Purpose: close any opened dialog passing DialogRef got in openDialog functions
   */

  closeDialog(dialogRef){
    dialogRef.afterClosed().subscribe(() => {
      console.log('The form was closed');
    });
  }

  /**
   * OPENNEWLIST
   * Purpose: open new list dialog 
   */

  openNewList(){
    const dialogRef = this.dialog.open(NewListComponent,{
      width: '500px'
    });

    this.closeDialog(dialogRef);
  }

    /**
   * OPENNEWTASK
   * Purpose: open new task dialog 
   */


  openNewTask(){
    const dialogRef = this.dialog.open(NewTaskComponent,{
      width: '500px',
      data: this.urlId
    });

    this.closeDialog(dialogRef);
  }

    /**
   * OPENCONFIRMDELETETASK
   * 
   */

  openConfirmDelete(confirm:string,selectedTask:string){
    const dialogRef = this.dialog.open(DeleteConfirmComponent,{
       width: '500px',
       data: {
         confirm: confirm,
         listId: this.urlId,
         taskId: selectedTask
       }
     }); 
     this.closeDialog(dialogRef);
 }

   /**
   * OPENEDITLIST
   * Purpose: open edit list dialog 
   */

  openEditList(){
    const dialogRef = this.dialog.open(EditListComponent,{
      width: '500px',
      data: {
        linkId: this.urlId,
        title: this.activeListTitle
      }
    });

    this.closeDialog(dialogRef);
  }

     /**
   * OPENEDITTASK
   * Purpose: open edit task dialog 
   */

  openEditTask(selectedTask){
    const dialogRef = this.dialog.open(EditTaskComponent,{
      width: '500px',
      data: {
        listId: this.urlId,
        task: selectedTask,
      }
    });

    this.closeDialog(dialogRef);
  }


  /** 
   * GETLISTS
   * 
   */

  getLists(){
    this.taskService.getLists().subscribe(
      (lists:any[]) => {
        this.listOfLists = lists;        
        console.log("lists: ", this.listOfLists);
      }
    );  
    
  }

  /** 
   * GETLTASKS
   * 
   */

  getTasks(){
    this.route.params.subscribe(
      (params:Params) => {
        this.taskService.getTasks(params.listId).subscribe(
          (tasks:any[]) => {
            console.log("Tasks: ",tasks);
            this.listOfTasks = tasks;            
            console.log("Tasks: ",this.listOfTasks);
          }
        );
      }
    );   
  }

  /**
   * 
   */

  onClickTask(task){
    this.taskService.completed(this.urlId,task._id).subscribe(()=>{
      console.log("completed");
      task.completed = true;
    });    
  }

  editList(title:string){
    this.taskService.editList(this.urlId,title).subscribe(()=>{});
    window.location.reload();
  }

  editTask(taskId:string,title){
    this.taskService.editTask(this.urlId,taskId,title).subscribe(()=>{});
    window.location.reload();
  }



}
