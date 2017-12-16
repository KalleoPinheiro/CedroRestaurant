import { Injectable } from '@angular/core';
import { Dish } from './dish';
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
export class DishService implements Service<Dish> {
  headers: Headers;
  options: RequestOptions;
  private apiUrl = 'http://localhost:53879/api/Dishes/';

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  findAll(): Promise<Dish[]> {
    return this.http
      .get(this.apiUrl, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
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

  find(id: string): Promise<Dish> {
    return this.findAll().then((dishes: Dish[]) =>
      dishes.find(dish => dish.id === id)
    );
  }

  create(dish: Dish): Promise<Dish> {
    return this.http
      .post(this.apiUrl, JSON.stringify(dish), { headers: this.headers })
      .toPromise()
      .then((response: Response) => response.json().data as Dish)
      .catch(this.handleError);
  }

  update(dish: Dish): Promise<Dish> {
    const url = `${this.apiUrl}/${dish.id}`;
    return this.http
      .put(url, JSON.stringify(dish), { headers: this.headers })
      .toPromise()
      .then(() => dish as Dish)
      .catch(this.handleError);
  }

  delete(dish: Dish): Promise<Dish> {
    const url = `${this.apiUrl}/${dish.id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => dish as Dish)
      .catch(this.handleError);
  }
}
