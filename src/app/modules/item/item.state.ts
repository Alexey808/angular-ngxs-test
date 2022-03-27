import { Action, State, StateContext } from '@ngxs/store';
import { IItem } from './item.interface';
import { AddItem } from './item.actions';

const defaultItem: IItem = {
  id: null,
  name: 'defaultItem',
  bool: false,
}

@State({
  name: 'Item',
  defaults: defaultItem,
})
export class ItemState {
  @Action(AddItem) addItem(ctx: StateContext<IItem>, { payload }: AddItem) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ...payload,
    })
  }
}
