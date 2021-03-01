import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../task-list/task-service.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {

  taskOrList: string;
  urlId: string;
  taskId: string;

  constructor(
    private taskService: TaskServiceService,
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.taskOrList = data.confirm;
    this.urlId = data.listId;
    this.taskId = data.taskId;
   }

  ngOnInit(): void {
  }

  delete(){
    if (this.taskOrList === "list") {
      this.deleteList();
    } else {
      this.deleteTask();
    } 
  }

  /**
   * DELETELIST 
   * Delete the selected list passing urlId to taskService
   */

  deleteList(){
    console.log("deletou",this.taskId);
    this.taskService.deleteList(this.urlId).subscribe(()=>{});    
    this.router.navigateByUrl(`/`);
    this.cancelDialog(); 
  }

  
  /**
   * DELETETASK
   * Delete the selected task passing urlId and taskId (passed by html) to taskService
   */

  deleteTask(){
    console.log("deletou",this.taskId);
    this.taskService.deleteTask(this.urlId,this.taskId).subscribe(()=>{});  
    window.location.reload();
  }


  cancelDialog(): void {
    this.dialogRef.close();
  }

}
