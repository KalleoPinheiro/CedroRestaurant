import { Restaurant } from './restaurant';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class RestaurantPipe implements PipeTransform {
  transform(restaurants: Restaurant[], typed: string): any {
    typed = typed.toLowerCase();
    return restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(typed));
  }
}
