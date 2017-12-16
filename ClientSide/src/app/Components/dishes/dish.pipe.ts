import { Dish } from './dish';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class DishPipe implements PipeTransform {
  transform(dishes: Dish[], typed: string): any {
    typed = typed.toLowerCase();
    return dishes.filter(dish => dish.name.toLowerCase().includes(typed));
  }
}
