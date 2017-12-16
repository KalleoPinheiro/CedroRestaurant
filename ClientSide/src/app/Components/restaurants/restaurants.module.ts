import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { RestaurantPipe } from './restaurant.pipe';
import { RestaurantService } from './restaurant.service';
import { RouterModule } from '@angular/router';
import { RestaurantsRoutingModule } from './restaurants.routing.module';
import { DialogService } from '../../Utils/dialog.service';

@NgModule({
  imports: [CommonModule, RouterModule, RestaurantsRoutingModule, FormsModule,
    ReactiveFormsModule],
  declarations: [
    RestaurantListComponent,
    RestaurantFormComponent,
    RestaurantPipe
  ],
  exports: [RestaurantListComponent, RestaurantFormComponent, RestaurantPipe],
  providers: [RestaurantService, DialogService]
})
export class RestaurantsModule {}
