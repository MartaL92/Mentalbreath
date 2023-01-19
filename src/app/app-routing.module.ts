import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ConsumerComponent } from './components/consumer/consumer.component';
import { DetailGroupComponent } from './components/detail-group/detail-group.component';
import { DetailProfessionalComponent } from './components/detail-professional/detail-professional.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { ProfessionalComponent } from './components/professional/professional.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'professional',
    component: ProfessionalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newGroup',
    component: NewGroupComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consumer',
    component: ConsumerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detailP/:id',
    component: DetailProfessionalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detailG/:id',
    component: DetailGroupComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
