import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IItem } from '../item/item.interface';
import { AddItems, DeleteItems, EditItems } from './items.actions';

export interface IItemStateModel {
  items: IItem[];
}

@State<IItemStateModel[]>({
  name: 'items',
  defaults: [],
})
export class ItemsState {
  @Selector() static items(state: IItem[]) {
    return state;
  }

  @Selector() static itemById(state: IItem[]) {
    return (index: number) => state[index];
  }

  @Action(AddItems) addItems(ctx: StateContext<IItem[]>, { payload }: AddItems) {
    const state = ctx.getState();
    ctx.setState([...state, ...payload]);
  }

  @Action(DeleteItems) deleteItems(
    ctx: StateContext<IItem[]>,
    { ids }: DeleteItems,
  ) {
    ctx.setState([
      ...ctx.getState().filter((n: IItem) => n?.id ? !ids.includes(n.id) : false)
    ]);
  }

  @Action(EditItems) editItems(
    ctx: StateContext<IItem[]>,
    { payload }: EditItems,
  ) {
    ctx.setState([
      ...ctx.getState().map((n: IItem) => n.id === payload.id ? payload : n)
    ])
  }
}
