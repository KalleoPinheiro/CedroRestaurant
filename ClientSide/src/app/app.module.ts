import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RestaurantsModule } from './Components/restaurants/restaurants.module';
import { SharedModule } from './Shared/shared.module';
import { PagesModule } from './Pages/pages.module';
import { DishesModule } from './Components/dishes/dishes.module';
import { PagesRoutingModule } from './Pages/pages.routing.module';

import { DialogService } from './Utils/dialog.service';
import { DishService } from './Components/dishes/dish.service';
import { RestaurantService } from './Components/restaurants/restaurant.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PagesModule,
    RestaurantsModule,
    DishesModule,
    PagesRoutingModule
  ],
  exports: [ReactiveFormsModule],
  providers: [DialogService, DishService, RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule {}
