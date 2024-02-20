import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../../../services/toaster/toaster.service';

@Component({
  selector: 'app-project-add-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './project-add-modal.component.html',
  styleUrl: './project-add-modal.component.scss'
})
export class ProjectAddModalComponent {

  addProjForm!: FormGroup;
  isHidden: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dashService: DashboardService, 
    private toaster: ToasterService,
    private apiService: ApiService) 
  {
    this.addProjForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDesc: ['', Validators.required],
    });

    dashService.addProjectModalVisibility.subscribe((data: boolean) => {
      this.isHidden = data;
    })
  }

  public closeModal() : void
  {
    this.dashService.toggleAddProjectModalVisibility(false);
  }

  public addProject() : void
  {
    if (!this.addProjForm.valid) return;

    const groupId = this.dashService.getGroupId();

    const project : ProjectAddInterface = {
      projectName: this.addProjForm.get('projectName')!.value,
      projectDescription: this.addProjForm.get('projectDesc')!.value,
    }

    this.apiService.post<void>(`/groups/${groupId}/projects`, project).subscribe({
      next: () => {
        console.log(`Successfully Added New Project ${project.projectName}`);
        this.toaster.success(`Successfully Added New Project ${project.projectName}`);
      },
      error: (err) => {
        console.log(`Error while adding project ${project.projectName} := ${err.error}`);
        this.toaster.error(`Error while adding project ${project.projectName} := ${err.error}`);
      }
    })

    this.addProjForm.reset();
    this.closeModal();
  }

}

interface ProjectAddInterface {
  projectName: string,
  projectDescription: string,
}
