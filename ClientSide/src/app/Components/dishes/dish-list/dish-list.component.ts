import { Component, OnInit } from '@angular/core';
import { Dish } from './../dish';
import { DishService } from '../dish.service';
import { DialogService } from '../../../Utils/dialog.service';
import { Restaurant } from '../../restaurants/restaurant';
import { RestaurantService } from '../../restaurants/restaurant.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];
  restaurants: Restaurant[] = [];
  message: {};
  classCss: {};
  restaurantName: string;
  private currentTimeout: any;

  constructor(
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.restaurantService
      .findAll()
      .then((restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        console.log(this.restaurants);
      })
      .catch(error => console.log('Um erro foi encontrado: ', error));

    this.dishService
      .findAll()
      .then((dishes: Dish[]) => {
        this.dishes = dishes;
        console.log(this.dishes);
      })
      .catch(error => console.log('Um erro foi encontrado: ', error));
  }

  onDelete(dish: Dish): void {
    console.log(dish);
    this.dialog
      .confirm('Deseja realmente deletar o prato ' + dish.name + '?')
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.dishService
            .delete(dish)
            .then(() => {
              this.dishes = this.dishes.filter((c: Dish) => c.id !== dish.id);
              this.showMessage({
                type: 'success',
                message: 'Prato deletado com sucesso!'
              });
            })
            .catch(erro => {
              console.log(erro);
              this.showMessage({
                type: 'danger',
                message: 'Erro ao deletar prato!'
              });
            });
        }
      });
  }

  private showMessage(message: { type: string; message: string }): void {
    this.message = message;
    this.mountClass(message.type);
    if (message.type !== 'danger') {
      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout);
      }

      this.currentTimeout = setTimeout(() => {
        this.message = undefined;
      }, 3000);
    }
  }

  private mountClass(type: string): void {
    this.classCss = {
      alert: true
    };
    this.classCss['alert-' + type] = true;
  }
}
