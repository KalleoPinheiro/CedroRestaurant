import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';

const restaurantsRoutes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantListComponent
  },
  {
    path: 'restaurants/detail',
    component: RestaurantFormComponent
  },
  {
    path: 'restaurants/detail/:id',
    component: RestaurantFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(restaurantsRoutes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule {}
