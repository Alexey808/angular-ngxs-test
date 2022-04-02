import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, filter, map, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { IItem } from '../item/item.interface';
import { IItemStateModel, ItemsState } from './items.state';
import { AddItems, DeleteItems, EditItems, GetItems } from './items.actions';
import { ItemFields, ItemsForm } from './items.form';
import { genId } from '../../helpers/gen-id';

const defaultItem: IItem = {
  id: null,
  name: 'defaultItem',
  bool: false,
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent extends ItemsForm implements OnInit, OnDestroy {
  itemFields: typeof ItemFields = ItemFields;
  selectedItemId: string | null = null;

  @Select(ItemsState) items$: Observable<IItem[]> | undefined;

  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store,
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.select((state: IItemStateModel) => state.items).pipe(
      takeUntil(this.destroy$),
    ).subscribe((x: IItem[]) => {
      console.log('select 1 -> ', x);
    });

    this.store.selectOnce((state: IItemStateModel) => state.items).subscribe((x) => {
      console.log('selectOnce 2 -> ', x);
    });

    this.items$?.pipe(
      takeUntil(this.destroy$),
    ).subscribe((x) => console.log('select 3 -> ', x));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeItem(): void {
    if(!this.selectedItemId) {
      this.addItem()
    } else {
      this.saveItem();
    }
  }

  addItem(): void {
    const newItem: IItem = {
      id: genId(),
      ...this.form.getRawValue()
    };

    this.store.dispatch(new AddItems([newItem])).pipe(
      take(1),
    ).subscribe(() => {
      this.resetForm();
    });
  }

  saveItem(): void {
    this.items$?.pipe(
      take(1),
    ).subscribe((items) => {
      const selectedItem: IItem | null = items.find(
        (n) => n.id === this.selectedItemId
      ) || null;

      const editedItem = this.form.getRawValue();

      const updateItem: IItem = {
        id: selectedItem?.id,
        ...editedItem,
      }

      if(selectedItem) {
        this.store.dispatch(new EditItems(updateItem));
        this.resetForm();
      }
    });
  }

  deleteItem(id: string | null): void {
    if(id) {
      this.store.dispatch(new DeleteItems([id]))
    }
  }

  editItem(id: string | null): void {
      this.items$?.pipe(
        filter(() => !!id),
        take(1),
      ).subscribe((items: IItem[]) => {
        const selectedItem: IItem | null = items.find((n) => n.id === id) || null;
        if (selectedItem) {
          this.form.patchValue(selectedItem);
          this.selectedItemId = id;
        }
      });
  }

  resetForm(): void {
    this.form.reset();
    this.selectedItemId = null;
  }

  checkZeroItem(): void {
    this.store.select(ItemsState.itemById).pipe(
      map((data) => data(0)),
      take(1),
    ).subscribe((x) => console.log('getItemByIndex -> ', x));
  }
}
