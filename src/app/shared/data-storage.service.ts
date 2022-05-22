import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";


import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {UserModel} from "../auth/user.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  // constructor(
  //   private http: HttpClient,
  //   private recipeService: RecipeService,
  //   private authService: AuthService){}

  // storeRecipes(){
  //   const recipes = this.recipeService.getRecipes();
  //   this.http.put('https://ng-recipe-book-d54ef-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(response => {
  //     console.log(response);
  //   });
  // }

  // fetchRecipes() {
  //   return this.authService.user.pipe(take(1), exhaustMap((user:UserModel) => {
  //     console.log('THIS IS INSIDE FETCH RECIPES',user.token)
  //     return this.http.get<Recipe[]>('https://ng-recipe-book-d54ef-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=' + user.token), map((recipes: Recipe[]) => {
  //       return recipes.map(recipe => {
  //         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
  //       });
  //     }),
  //     tap((recipes: Recipe[]) => {
  //       this.recipeService.setRecipes(recipes);
  //     })
  //
  // }))

//   fetchRecipes() {
//     return this.authService.user.pipe(
//       take(1),
//       exhaustMap((user: UserModel) => {
//         return this.http.get<Recipe[]>(
//           'https://ng-recipe-book-d54ef-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
//           {
//             params: new HttpParams().set('auth', user.token)
//           }
//         );
//       }),
//       map((recipes:Recipe[]) => {
//         return recipes.map(recipe => {
//           return {
//             ...recipe,
//             ingredients: recipe.ingredients ? recipe.ingredients : []
//           };
//         });
//       }),
//       tap((recipes: Recipe[]) => {
//         this.recipeService.setRecipes(recipes);
//       })
//     );
//   }
// }


  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-book-d54ef-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-d54ef-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
