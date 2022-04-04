import {Recipe} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{

  constructor(private slService: ShoppingListService) {
  }

  private recipes:Recipe[] = [
    new Recipe('schnitzel',
      'A schnitzel is great.',
      'https://www.thespruceeats.com/thmb/cckc3_4QUQ79kSFhcLPM8xg9F3g=/3797x2848/smart/filters:no_upscale()/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Spaghetti Bolognese',
      'Our best ever spaghetti bolognese.',
      'https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204.jpg',
    [
      new Ingredient('Spaghetti', 100),
      new Ingredient('Meat', 1),
      new Ingredient('Tomato Sauce', 1)
    ])
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeById(id): Recipe{
    return this.recipes[id];
  }

  addIngrToListFromRecipe(recipe: Recipe){
    this.slService.addArrIngredients(recipe.ingredients);
  }
}
