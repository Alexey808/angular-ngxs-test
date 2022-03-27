import { Component, OnDestroy } from '@angular/core';
import { IItem } from './item.interface';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddItem } from './item.actions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  item1: IItem = {
    id: String(new Date().valueOf() + Math.ceil(Math.random() * 10000)),
    name: 'item-1',
    bool: false,
  };

  item2: IItem = {
    id: String(new Date().valueOf() + Math.ceil(Math.random() * 10000)),
    name: 'item-2',
    bool: false,
  };

  constructor(
    private store: Store,
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addItem(newItem: IItem): void {
    this.store.dispatch(new AddItem(newItem))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('store.snapshot -> ', this.store.snapshot());
      });
  }
}
