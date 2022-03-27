import { IItem } from './item.interface';

export class AddItem {
  static readonly type = '[Item] Add item';
  constructor(public  payload: IItem) {}
}
// export class EditItem {
//   static readonly type = '[Item] Edit item';
//   constructor(public  payload: IItem) {}
// }
// export class GetItem {
//   static readonly type = '[Item] Get item';
// }
// export class DeleteItem {
//   static readonly type = '[Item] Delete item';
//   constructor(public  id: IItem) {}
// }

