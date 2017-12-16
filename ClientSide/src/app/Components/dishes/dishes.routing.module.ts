import { DishListComponent } from './dish-list/dish-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishFormComponent } from './dish-form/dish-form.component';

const dishesRoutes: Routes = [
  {
    path: 'dishes',
    component: DishListComponent
  },
  {
    path: 'dishes/detail',
    component: DishFormComponent
  },
  {
    path: 'dishes/detail/:id',
    component: DishFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(dishesRoutes)],
  exports: [RouterModule]
})
export class DishesRoutingModule {}
