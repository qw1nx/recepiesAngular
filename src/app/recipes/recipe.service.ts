import {Recipe} from "./recipe.model";
import { Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) {
  }


  private recipes: Recipe[] = []

  setRecipes(recipesNew: Recipe[]){
    this.recipes = recipesNew;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(id: number, recipe: Recipe){
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(id: number){
  //this.ingredients.splice(id, 1);
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice())

  }

  getRecipes(){
    console.log('in get recipes')
    console.log(this.recipes);
    return this.recipes.slice();
  }

  getRecipeById(id): Recipe{
    return this.recipes[id];
  }

  addIngrToListFromRecipe(recipe: Recipe){
    this.slService.addArrIngredients(recipe.ingredients);
  }
}
