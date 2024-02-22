import { Component } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { GroupInterface } from '../../models/GroupInterface';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api/api.service';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {

  groups!: GroupInterface[];

  constructor(
    private apiService: ApiService,
    private toaster: ToasterService,
    private router: Router,
    private dashService: DashboardService) {

    this.apiService.get<GroupInterface[]>('/groups').subscribe({
      next: (data) => {
        this.groups = data;
      },
      error: (err) => {
        this.toaster.error(err);
      }
    })
  }

  public navigateToProject(groupId: number)
  {
    this.router.navigate([`/dashboard/${groupId}/projects`])
  }

  public onInvite(event: Event, groupId: number) : void
  {
    event.stopPropagation();

    this.dashService.toggleInviteGroupModalVisibility(true);
    this.dashService.setGroupId(groupId);
  }

  public onAddGroup() : void
  {
    this.dashService.toggleAddGroupModalVisibility(true);
  }
}
