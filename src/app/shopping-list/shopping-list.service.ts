import {Ingredient} from "../shared/ingredient.model";

import { Subject } from 'rxjs';


export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

   private ingredients:Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Carrots', 5)
  ];

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
    // for(let ingr of ingredients)  {
    //   this.ingredients.push(ingr);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
