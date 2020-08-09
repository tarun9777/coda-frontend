import { Component, OnInit } from "@angular/core";
import { DishService } from "../services/dish.service";
import { Dish } from "../interface/Dish";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuickViewComponent } from '../quick-view/quick-view.component';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  dishes: Dish[] = null;
  filteredDishes: Dish[] = null;
  search: String = "";
  filterFlag: boolean = false;

  constructor(private dishService: DishService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((data) => {
      this.dishes = data;
      this.makeCopy();
    });
    
  }

  makeCopy(): void {
    this.filteredDishes = Object.assign([], this.dishes);
    console.log(this.dishes);
  }

  filterDishes() {
    if (!this.filteredDishes) {
      this.makeCopy();
    }
    this.filteredDishes = Object.assign([], this.dishes).filter(
      (data) => data.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
    );

    if (this.filteredDishes && this.search != "") this.filterFlag = true;
    else this.filterFlag = false;
  }

  liked(id:number){
    this.dishes.forEach(dish => {
      if (dish.id == id)
      dish.liked = !dish.liked;
    });
  }

  getTime() : number{
    return Math.floor(Math.random() * (100 - 20 + 1) + 20);
    // return Math.floor(time * 100);
  }

  quickView(id: number):void {
    this.dishService.currentDishId = id;
    this.modalService.open(QuickViewComponent,{centered:true});
  }
}
