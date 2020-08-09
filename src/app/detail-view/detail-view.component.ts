import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap, Params } from "@angular/router";
import { DishService } from "../services/dish.service";
import { Dish } from "../interface/Dish";

@Component({
  selector: "app-detail-view",
  templateUrl: "./detail-view.component.html",
  styleUrls: ["./detail-view.component.css"],
})
export class DetailViewComponent implements OnInit {
  id: number = null;
  dish: Dish = null;
  param: Params = null;
  stars: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.param = this.route.params;
    this.dishService.getDishes().subscribe((data) => {
      data.forEach((dish) => {
        if (dish.id == this.param.value.id) this.dish = dish;
      });
    });
    for (let x = 0; x < this.param.value.id % 5; x++) {
      this.stars.push(x);
    }
  }

  liked() {
    this.dish.liked = !this.dish.liked;
  }
}
