import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { ApiService } from '../../../../services/api/api.service';
import { ProjectInterface } from '../../models/ProjectInterface';
import { ToasterService } from '../../../../services/toaster/toaster.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: 
  [
    CommonModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit{

  groupId!: number;
  projects!: ProjectInterface[];
  projectsExist!: boolean;

  constructor(
    private apiService: ApiService,
    private dashService: DashboardService,
    private route: ActivatedRoute){}

  public ngOnInit(): void 
  {
     this.route.paramMap.subscribe((params) => {

      this.groupId = Number(params.get('groupId'));
      this.fetchProjects(this.groupId);

    });
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

  
  public onAddProject() : void
  {
    this.dashService.toggleAddProjectModalVisibility(true);
    this.dashService.setGroupId(this.groupId);
  }
}
