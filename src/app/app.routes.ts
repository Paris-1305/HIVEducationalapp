import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { HomePage } from './home/home.page';
import { PreventionPage } from './pages/prevention/prevention.page';
import { TestingPage } from './pages/testing/testing.page';
import { TreatmentPage } from './pages/treatment/treatment.page';
import { RecommendationPage } from './pages/recommendation/recommendation.page';
import { HivBasicsPage } from './pages/hiv-basics/hiv-basics.page';
// Your standalone components

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'prevention',
    component: PreventionPage,
  },
  {
    path: 'testing',
    component: TestingPage,
  },
  {
    path: 'treatment',
    component: TreatmentPage,
  },
  {
    path: 'recommendation',
   component: RecommendationPage,
  },
  {
    path: 'hiv-basics',
    component: HivBasicsPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
