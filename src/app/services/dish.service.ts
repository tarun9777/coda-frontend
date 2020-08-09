import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { Dish } from "../interface/Dish";
@Injectable({
  providedIn: "root",
})
export class DishService {
  dishes: Dish[] = null;
  currentDishId = null;

  constructor(private http: HttpClient) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>("http://starlord.hackerearth.com/recipe")
      .pipe(map((dishes) => (this.dishes = dishes)));
  }
}
