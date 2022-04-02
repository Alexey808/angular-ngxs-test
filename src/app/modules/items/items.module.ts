import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ItemsState } from './items.state';
import { environment } from '../../../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
  }
]

@NgModule({
  declarations: [
    ItemsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([ItemsState]),
    ReactiveFormsModule,
  ],
   exports: [
     ItemsComponent,
   ]
})
export class ItemsModule { }
