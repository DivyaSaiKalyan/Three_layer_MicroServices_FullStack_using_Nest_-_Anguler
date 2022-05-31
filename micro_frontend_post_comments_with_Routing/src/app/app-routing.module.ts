import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'registerPage', component: RegisterPageComponent },
  { path: 'dashboardPage', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginPageComponent,
  RegisterPageComponent,
  DashboardComponent,
];
