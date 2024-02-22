import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public backgroundModalVisibility: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public inviteGroupModalVisibility : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public addGroupModalVisibility : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public addProjectModalVisibility : BehaviorSubject<boolean> = new BehaviorSubject(false);


  private currentState!: DashboardSharedMemory;

  constructor() 
  {
    //Default state
    this.currentState = {
      isReady: false,
      groupId: -1,
      projectId: -1 
    };
  }

  public setGroupId(groupId: number)
  {
    this.currentState.isReady = true,
    this.currentState.groupId = groupId;
  }

  public getGroupId() : number | null
  {
    if (!this.currentState.isReady) {
      console.error("Accessing groupId when states not ready");
      return null;
    }
    this.currentState.isReady = false;
    return this.currentState.groupId;
  }

  public setProjectId(projectId: number)
  {
    this.currentState.isReady = true,
    this.currentState.projectId = projectId;
  }

  public toggleInviteGroupModalVisibility(flag : boolean)
  {
    this.inviteGroupModalVisibility.next(flag);
    this.backgroundModalVisibility.next(flag);
  }

  public toggleAddGroupModalVisibility(flag : boolean)
  {
    this.addGroupModalVisibility.next(flag);
    this.backgroundModalVisibility.next(flag);
  }

  public toggleAddProjectModalVisibility(flag: boolean)
  {
    this.addProjectModalVisibility.next(flag);
    this.backgroundModalVisibility.next(flag);
  }

}

interface DashboardSharedMemory {
  isReady: boolean;
  groupId: number;
  projectId: number;
}