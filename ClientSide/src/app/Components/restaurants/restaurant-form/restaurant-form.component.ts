import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { RestaurantService } from '../restaurant.service';
import { Restaurant } from './../restaurant';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  restaurant: Restaurant;
  isNew = true;
  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.restaurant = new Restaurant('');
    this.route.params.forEach((params: Params) => {
      const id: string = params['id'];

      if (id) {
        this.isNew = false;

        this.restaurantService.find(id).then((restaurant: Restaurant) => {
          this.restaurant = new Restaurant('');
          this.restaurant = restaurant;
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
    let promise: Promise<Restaurant>;

    if (this.isNew) {
      console.log('Cadastrar restaurante');
      promise = this.restaurantService.create(this.restaurant);
    } else {
      console.log('Alterar restaurante');
      promise = this.restaurantService.update(this.restaurant);
    }

    promise.then(dish => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
