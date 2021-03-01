import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskServiceService } from '../task-list/task-service.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  public taskForm: FormGroup;
  urlId: string;

  constructor(
    private taskService: TaskServiceService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewTaskComponent>,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.urlId = data;
   }

  ngOnInit(): void {    
    this.setListForm(this.urlId);
  }

  setListForm(listId:string){
    this.taskForm = this.formBuilder.group({
      _id : [null],
      title : ['',Validators.required],
      _listId: listId 
    });
  }

  createNewTask(title:string){
    console.log("ENTROU NA TASK");
    console.log(this.urlId,title);
    if (this.urlId) {
      this.taskService.createTask(title,this.urlId).subscribe((res:any)=>{
        console.log("create task res",res);
        console.log(this.urlId,title);
        this.router.navigateByUrl(`/lists/${this.urlId}`);
      });    
      this.cancelDialog();    
    } else {
      console.log('nada');
    }
  }

  cancelDialog(): void {
    this.dialogRef.close();
    window.location.reload();
  }


}
