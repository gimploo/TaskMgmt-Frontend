import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
import { GroupComponent } from './components/group/group.component';
import { ProjectComponent } from './components/project/project.component';
import { GroupInterface } from './models/GroupInterface';
import { ProjectInterface } from './models/ProjectInterface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    //Children components
    GroupComponent,
    ProjectComponent,

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

  projects!: ProjectInterface[];
  groups!: GroupInterface[];

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
    this.dashService.backgroundModalVisibility.subscribe((data: boolean) => {
      this.isModalActive = data;
    })

  }


}


