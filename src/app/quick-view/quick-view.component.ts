import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Dish } from '../interface/Dish';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  dish:Dish = null;
  stars: number[] = [];

  constructor(private dishService:DishService,public modalService : NgbActiveModal) { }

  ngOnInit(): void {
    
    for (let d of this.dishService.dishes){
      if (d.id == this.dishService.currentDishId) this.dish = d;
    }
    for (let x = 0; x < this.dish.id % 5; x++)
    this.stars.push(x);
  }
}
