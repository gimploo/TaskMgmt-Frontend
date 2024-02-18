import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { group } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    AuthService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  groups!: GroupInterface[];
  projects!: ProjectInterface[];

  groupIdInput!: number;
  
  addProjForm!: FormGroup;
  addGroupForm!: FormGroup;
  projectsExist: boolean = false;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private authService: AuthService, 
    private apiService: ApiService){}

  public ngOnInit()
  {
    this.addProjForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDesc: ['', Validators.required],
    });

    this.addGroupForm = this.fb.group({
      groupName: ['', Validators.required]
    })

    this.apiService.get<GroupInterface[]>('/groups').subscribe({
      next: (data) => {
        console.log(data);
        this.groups = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  public onGroupIdInputChange(value: number) : void
  {
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
        this.projectsExist = false;
      }
    })
  }

  public addGroup()
  {
    if (!this.addGroupForm.valid) return;

    const newGroup = {
      "groupName": this.addGroupForm.get('groupName')!.value
    };

    this.apiService.post<void>('/groups/', newGroup).subscribe({
      next: (data: any) => {
        window.alert(`Successfully Added New Group ${newGroup.groupName}`);
      },
      error: (err) => {
        window.alert(`Error while adding group ${newGroup.groupName} := ${err.error}`);
      }
    });

    this.addGroupForm.reset();
  }

  public addProject() : void
  {
    if (!this.addProjForm.valid) return;

    const project : ProjectAddInterface = {
      projectName: this.addProjForm.get('projectName')!.value,
      projectDescription: this.addProjForm.get('projectDesc')!.value,
    }

    this.apiService.post<void>(`/groups/${this.groupIdInput}/projects`, project).subscribe({
      next: () => {
        window.alert(`Successfully Added New Project ${project.projectName}`);
      },
      error: (err) => {
        window.alert(`Error while adding project ${project.projectName} := ${err.error}`);
      }
    })

    this.fetchProjects(this.groupIdInput);

    this.addProjForm.reset();
  }

}

// "projectId": 2,
//   "groupId": 10,
//   "projectName": "string",
//   "projectDescription": "string",
//   "ownerId": 8

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

interface ProjectAddInterface {
  projectName: string,
  projectDescription: string,
}