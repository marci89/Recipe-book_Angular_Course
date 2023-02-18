import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) ShoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private ShoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.ShoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.ShoppingListService.getIngredient(index);
        this.ShoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      this.ShoppingListService.updateIngredient(this.editedItemIndex, new Ingredient(value.name, value.amount));
    } else {
      this.ShoppingListService.addIngredient(new Ingredient(value.name, value.amount));
    }

    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.ShoppingListForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.ShoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
