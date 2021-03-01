import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskServiceService } from '../task-list/task-service.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  public listForm: FormGroup;
  newId: string;

  constructor(
    private taskService: TaskServiceService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewListComponent>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setListForm();
    this.route.params.subscribe(
      (params:Params) => {console.log(params)}
    );
  }

  setListForm(){
    this.listForm = this.formBuilder.group({
      _id : [null],
      title : ['',Validators.required]
    });
  }

  createNewList(title:string){
    this.taskService.createList(title).subscribe((res:any)=>{
      this.newId = res._id;
      this.router.navigateByUrl(`/lists/${this.newId}`);   
    });    
    this.dialogRef.close();
    location.reload();
  }

  


}
