import { Component, OnInit } from '@angular/core';
import { Restaurant } from './../restaurant';
import { RestaurantService } from '../restaurant.service';
import { DialogService } from '../../../Utils/dialog.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  message: {};
  classCss: {};
  private currentTimeout: any;

  constructor(
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
  }

  onDelete(restaurant: Restaurant): void {
    console.log(restaurant);
    this.dialog
      .confirm('Deseja realmente deletar o restaurante ' + restaurant.name + '?')
      .then((canDelete: boolean) => {
        if (canDelete) {
          this.restaurantService
            .delete(restaurant)
            .then(() => {
              this.restaurants = this.restaurants.filter(
                (c: Restaurant) => c.id !== restaurant.id
              );
              this.showMessage({
                type: 'success',
                message: 'Restaurante deletado com sucesso!'
              });
            })
            .catch(erro => {
              console.log(erro);
              this.showMessage({
                type: 'danger',
                message: 'Erro ao deletar restaurante!'
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
