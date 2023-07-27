import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BowlingComponent } from './bowling/bowling.component';

const routes: Routes = [
  { path: '', component: BowlingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
