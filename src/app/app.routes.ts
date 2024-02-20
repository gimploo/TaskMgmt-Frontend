import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoggedInGuard } from './guards/loggedin.guard';

export const routes: Routes = [
    {
        path: '', 
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login', 
        component: LoginComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'signup', 
        component: SignupComponent,
        canActivate: [LoggedInGuard]
    },
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
];
