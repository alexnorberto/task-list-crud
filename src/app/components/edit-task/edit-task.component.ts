import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../task-list/task-service.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  public taskForm:FormGroup;

  urlId:string;
  title:string;
  taskId: string;
  completed: boolean;

  constructor(
    private taskService: TaskServiceService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.urlId = data.linkId;
    this.title = data.task.title;
    this.taskId = data.task._id;
    this.completed = data.task.completed
  }

  ngOnInit(): void {
    this.setTaskForm();
    console.log("EDIT LIST",this.urlId,this.title)
  }

  setTaskForm(){
    this.taskForm = this.formBuilder.group({
      title : [this.title,Validators.required],
      completed: this.completed,
      checkbox: !this.completed
    });
  }

  editTask(title:string){

    if(this.taskForm.value.checkbox) {
      this.taskService.completedFalse(this.urlId,this.taskId).subscribe(()=>{
        console.log("completed");
        this.completed = false;
      });  
    }

    this.taskService.editTask(this.urlId,this.taskId,title).subscribe((res:any)=>{      
      this.router.navigateByUrl(`/lists/${this.urlId}`);   
    });    
    this.dialogRef.close();
    location.reload();

  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

}
