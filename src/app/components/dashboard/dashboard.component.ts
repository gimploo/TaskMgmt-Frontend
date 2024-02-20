import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { group } from '@angular/animations';
import { concatMapTo } from 'rxjs';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { GroupInviteModalComponent } from '../modals/group-invite-modal/group-invite-modal.component';
import { GroupAddModalComponent } from '../modals/group-add-modal/group-add-modal.component';
import { ProjectAddModalComponent } from '../modals/project-add-modal/project-add-modal.component';
import { ToasterService } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Modals
    GroupInviteModalComponent,
    GroupAddModalComponent,
    ProjectAddModalComponent
  ],
  providers: [
    DashboardService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  groups!: GroupInterface[];
  projects!: ProjectInterface[];

  groupIdInput!: number;
  projectsExist: boolean = false;

  isModalActive: boolean = false;

  constructor(
    private dashService: DashboardService,
    private fb: FormBuilder,
    private toaster: ToasterService,
    private apiService: ApiService){}

  public ngOnInit()
  {
    this.apiService.get<GroupInterface[]>('/groups').subscribe({
      next: (data) => {
        this.groups = data;
      },
      error: (err) => {
        this.toaster.error(err);
      }
    })

    this.dashService.backgroundModalVisibility.subscribe((data: boolean) => {
      this.isModalActive = data;
    })

  }

  public onGroupIdInputChange(value: number) : void
  {
    this.dashService.setGroupId(value);
    this.fetchProjects(value);
  }


  public fetchProjects(groupId: number) : void
  {
    this.apiService.get<ProjectInterface[]>(`/groups/${groupId}/projects`).subscribe({
      next: (data) => {
        console.log(data);
        this.projectsExist = true;
        this.projects = data
      },
      error: (err) => {
        console.log(err);
        this.toaster.error(err.error);
        this.projectsExist = false;
      }
    })
  }

  public onInvite(groupId: number) : void
  {
    this.dashService.toggleInviteGroupModalVisibility(true);
    this.dashService.setGroupId(groupId);
  }

  public onAddGroup() : void
  {
    this.dashService.toggleAddGroupModalVisibility(true);
  }
  
  public onAddProject() : void
  {
    this.dashService.toggleAddProjectModalVisibility(true);
  }

}

interface GroupInterface {
  groupId: number,
  groupName: string,
  createdAt: Date
}

interface ProjectInterface {
  projectId: number;
  projectName: string;
  projectDescription: string;
  ownerId: number;
}
