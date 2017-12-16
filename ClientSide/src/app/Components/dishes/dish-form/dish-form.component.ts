import { Dish } from './../dish';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../dish.service';
import { Restaurant } from '../../restaurants/restaurant';
import { RestaurantService } from '../../restaurants/restaurant.service';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  dish: Dish;
  isNew = true;
  restaurants: Restaurant[] = [];
  constructor(
    private dishService: DishService,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.restaurantService
      .findAll()
      .then((restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
        console.log(this.restaurants);
      })
      .catch(error => console.log('Um erro foi encontrado: ', error));

    this.dish = new Dish('', '', '');
    this.route.params.forEach((params: Params) => {
      const id: string = params['id'];

      if (id) {
        this.isNew = false;

        this.dishService.find(id).then((dish: Dish) => {
          this.dish = new Dish('', '', '');
          this.dish = dish;
        });
      }
    });
  }

  getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
    return {
      'form-group': true,
      'has-danger': !isValid && !isPristine,
      'has-success': isValid && !isPristine
    };
  }

  getFormControlClass(isValid: boolean, isPristine: boolean): {} {
    return {
      'form-control': true,
      'is-invalid': !isValid && !isPristine,
      'is-valid': isValid && !isPristine
    };
  }

  onSubmit(): void {
    let promise: Promise<Dish>;

    if (this.isNew) {
      console.log('cadastrar prato');
      promise = this.dishService.create(this.dish);
    } else {
      console.log('alterar prato');
      promise = this.dishService.update(this.dish);
    }

    promise.then(dish => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
