import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TosComponent }      from './pages/tos/tos.component';

const routes: Routes = [
  { path: 'tos', component: TosComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
