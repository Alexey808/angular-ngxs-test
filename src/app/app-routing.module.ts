import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./modules/list/list.module').then(m => m.ListModule),
  },
  {
    path: 'test-single-element',
    loadChildren: () => import('./modules/item/item.module').then(m => m.ItemModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
