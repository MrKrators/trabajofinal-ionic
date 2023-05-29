import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasPage } from './categoria.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  },
  {
    path: 'add-categoria',
    loadChildren: () => import('./add-categoria/add-categoria.module').then( m => m.AddCategoriaPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaPageRoutingModule {}
