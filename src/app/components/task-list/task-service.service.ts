import { Injectable } from '@angular/core';
import { WebRequestService } from 'src/app/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title:string){
    return this.webRequestService.post('lists',{title});
  }

  getLists(){
    return this.webRequestService.get('lists');
  }

  getOneList(listId:string){
    return this.webRequestService.get(`lists/${listId}`);
  }

  deleteList(listId:string){
    return this.webRequestService.delete(`lists/${listId}`);
  }

  editList(listId:string,title:string){
    return this.webRequestService.patch(`lists/${listId}`,{title});
  }

  /* TASKS */

  getTasks(listId:string){
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  createTask(title:string,_listId:string){
    return this.webRequestService.post(`lists/${_listId}/tasks`,{title})
  }

  deleteTask(_listId:string,_id:string){
    return this.webRequestService.delete(`lists/${_listId}/tasks/${_id}`)
  }

  editTask(_listId:string,_id:string,title:string){
    return this.webRequestService.patch(`lists/${_listId}/tasks/${_id}`,{title});
  }

  completed(_listId:string,_id:string){
    return this.webRequestService.patch(`lists/${_listId}/tasks/${_id}`,{completed: true});
  }

  completedFalse(_listId:string,_id:string){
    return this.webRequestService.patch(`lists/${_listId}/tasks/${_id}`,{completed: false});
  }


}
