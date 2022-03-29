import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;
  @Output() newEl = new EventEmitter<Ingredient>();

  constructor() { }

  emitNew(){
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.newEl.emit(newIngredient);
  }

  ngOnInit(): void {
  }
}
