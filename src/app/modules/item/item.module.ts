import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { ItemState } from './item.state';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
  }
]

@NgModule({
  declarations: [
    ItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([ItemState]),
  ],
  exports: [
    ItemComponent,
  ]
})
export class ItemModule { }
