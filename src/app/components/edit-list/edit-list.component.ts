import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskServiceService } from '../task-list/task-service.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  public listForm: FormGroup;
  urlId:string;
  title:string;

  constructor(
    private taskService: TaskServiceService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditListComponent>,
    private route: ActivatedRoute,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.urlId = data.linkId;
    this.title = data.title;
  }

  ngOnInit(): void {
    this.setListForm();
    console.log("EDIT LIST",this.urlId,this.title)
  }

  setListForm(){
    this.listForm = this.formBuilder.group({
      _id : this.urlId,
      title : [this.title,Validators.required]
    });
  }

  editList(title){
    this.taskService.editList(this.urlId,title).subscribe((res:any)=>{      
      this.router.navigateByUrl(`/lists/${this.urlId}`);   
    });    
    this.dialogRef.close();
    location.reload();
  }

  cancelDialog(){
    this.dialogRef.close();
  }

}
