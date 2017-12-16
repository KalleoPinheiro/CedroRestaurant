import { Restaurant } from './restaurant';
import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Service } from '../../utils/service';

@Injectable()
export class RestaurantService implements Service<Restaurant> {
  headers: Headers;
  options: RequestOptions;
  private apiUrl = 'http://localhost:53879/api/Restaurants/';
  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  findAll(): Promise<Restaurant[]> {
    return (
      this.http
        .get(this.apiUrl, this.options)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError)
    );
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('Um erro foi encontrado', error);
    alert(error);
    return Promise.reject(error.message || error);
  }

  find(id: string): Promise<Restaurant> {
    return this.findAll().then((restaurants: Restaurant[]) =>
      restaurants.find(restaurant => restaurant.id === id)
    );
  }

  create(restaurant: Restaurant): Promise<Restaurant> {
    return this.http
      .post(this.apiUrl, JSON.stringify(restaurant), { headers: this.headers })
      .toPromise()
      .then((response: Response) => response.json().data as Restaurant)
      .catch(this.handleError);
  }

  update(restaurant: Restaurant): Promise<Restaurant> {
    const url = `${this.apiUrl}/${restaurant.id}`;
    return this.http
      .put(url, JSON.stringify(restaurant), { headers: this.headers })
      .toPromise()
      .then(() => restaurant as Restaurant)
      .catch(this.handleError);
  }

  delete(restaurant: Restaurant): Promise<Restaurant> {
    const url = `${this.apiUrl}/${restaurant.id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => restaurant as Restaurant)
      .catch(this.handleError);
  }
}
