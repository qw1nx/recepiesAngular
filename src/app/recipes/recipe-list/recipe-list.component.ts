import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = [
    new Recipe('Soup', 'Very tasty', 'https://www.inspiredtaste.net/wp-content/uploads/2018/09/Easy-Chicken-Noodle-Soup-Recipe-1200.jpg'),
    new Recipe('Sth Else for test', 'Very tasty', 'https://www.inspiredtaste.net/wp-content/uploads/2018/09/Easy-Chicken-Noodle-Soup-Recipe-1200.jpg')
  ];

  @Output() selectedForDetails = new EventEmitter<Recipe>();

  onRecipeSelected(currRecipe: Recipe){
    this.selectedForDetails.emit(currRecipe);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
