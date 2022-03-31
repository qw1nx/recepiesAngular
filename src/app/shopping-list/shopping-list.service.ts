import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService{
  newEl = new EventEmitter<Ingredient>();

  ingredients:Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Carrots', 5)
  ];

  getIngredients(){
    return this.ingredients.slice()
  }
}
