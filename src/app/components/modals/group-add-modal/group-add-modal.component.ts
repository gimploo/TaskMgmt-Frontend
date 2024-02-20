import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api/api.service';
import { ToasterService } from '../../../services/toaster/toaster.service';

@Component({
  selector: 'app-group-add-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './group-add-modal.component.html',
  styleUrl: './group-add-modal.component.scss'
})
export class GroupAddModalComponent {

  addGroupForm!: FormGroup;
  isHidden: boolean = false;

  constructor(
    private dashService: DashboardService, 
    private fb: FormBuilder, 
    private toaster: ToasterService,
    private apiService: ApiService)
  {
    this.addGroupForm = this.fb.group({
      groupName: ['', Validators.required]
    })

    dashService.addGroupModalVisibility.subscribe((data: boolean) => {
      this.isHidden = data;
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
        console.log(`Successfully Added New Group ${newGroup.groupName}`);
        this.toaster.success(`Successfully Added New Group ${newGroup.groupName}`);
      },
      error: (err) => {
        console.log(`Error while adding group ${newGroup.groupName} := ${err.error}`);
        this.toaster.error(`Error while adding group ${newGroup.groupName} := ${err.error}`);
      }
    });

    this.addGroupForm.reset();
    this.closeModal();
  }

  public closeModal() : void
  {
    this.dashService.toggleAddGroupModalVisibility(false);
  }
}
