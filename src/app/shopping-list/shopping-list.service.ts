import {Ingredient} from "../shared/ingredient.model";

import { Subject } from 'rxjs';


export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();

   private ingredients:Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Carrots', 5)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }


  addArrIngredients(ingredients: Ingredient[]){
    // for(let ingr of ingredients)  {
    //   this.ingredients.push(ingr);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
