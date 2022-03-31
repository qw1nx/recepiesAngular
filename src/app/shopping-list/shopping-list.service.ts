import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";

export class ShoppingListService{
  ingredientsChanged = new EventEmitter<Ingredient[]>();

   private ingredients:Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Carrots', 5)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }


  addArrIngredients(ingredients: Ingredient[]){
    // for(let ingr of ingredients)  {
    //   this.ingredients.push(ingr);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
