import {Ingredient} from "../shared/ingredient.model";

import { Subject } from 'rxjs';


export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

   private ingredients:Ingredient[] = [];

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(id: number){
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(id: number, ingr: Ingredient){
    this.ingredients[id] = ingr;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addArrIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
