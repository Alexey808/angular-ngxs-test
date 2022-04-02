import { IItem } from '../item/item.interface';

export class AddItems {
  static readonly type = '[Items] Add items';
  constructor(public payload: IItem[]) {}
}
export class EditItems {
  static readonly type = '[Items] Edit item';
  constructor(public payload: IItem) {}
}
export class GetItems {
  static readonly type = '[Items] Get item';
}
export class DeleteItems {
  static readonly type = '[Items] Delete item';
  constructor(public ids: string[]) {}
}
