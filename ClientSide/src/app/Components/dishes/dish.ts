export class Dish {
  public id: string;
  public createDate: any;
  public restaurantName: string;

  constructor(
    public name: string,
    public price: any,
    public restaurantId: string
  ) {}
}
