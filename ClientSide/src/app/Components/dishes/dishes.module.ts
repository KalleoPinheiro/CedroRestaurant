import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishesRoutingModule } from './dishes.routing.module';
import { DishFormComponent } from './dish-form/dish-form.component';
import { DishPipe } from './dish.pipe';
import { DishService } from './dish.service';

@NgModule({
  imports: [CommonModule, RouterModule, DishesRoutingModule, FormsModule,
    ReactiveFormsModule],
  declarations: [DishListComponent, DishFormComponent, DishPipe],
  exports: [DishListComponent, DishFormComponent, DishPipe],
  providers: [DishService]
})
export class DishesModule {}
