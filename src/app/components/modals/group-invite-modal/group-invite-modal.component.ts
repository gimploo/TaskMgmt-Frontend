import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { ToasterService } from '../../../services/toaster/toaster.service';

@Component({
  selector: 'app-group-invite-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './group-invite-modal.component.html',
  styleUrl: './group-invite-modal.component.scss'
})
export class GroupInviteModalComponent {

  form!: FormGroup;
  isHidden: boolean = false;

  constructor(
    private dashboardService: DashboardService, 
    private toaster: ToasterService,
    private fb: FormBuilder,
    private apiService: ApiService) 
  {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.dashboardService.inviteGroupModalVisibility.subscribe((data : boolean) => {
      this.isHidden = data;
    })
  }

  public onSubmit() : void
  {
    if (!this.form.valid) return;

    const groupId = this.dashboardService.getGroupId();
    const email = this.form.get('email')!.value;

    this.apiService.post<void>(`/groups/${groupId}/invitations`, {
      email: email
    }).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toaster.success(`Invitation sent to ${email}!`);
      },
      error: (err) => {
        this.toaster.error(`Error while sending an invite for group ${groupId} := ${err.error}`);
      }
    })

    this.form.reset();
    this.closeModal();
  }

  public closeModal() : void
  {
    this.dashboardService.toggleInviteGroupModalVisibility(false);
  }

}
