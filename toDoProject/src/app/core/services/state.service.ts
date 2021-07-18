import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { List } from '../models/list.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private runningId: number = 6;
  private lists: List[] = [
    {
      id: 1, 
      caption:'Shopping', 
      description: 'Things to buy on our next stop to the supermarket', 
      icon: 'shopping_cart',
      color: 'blue'
    }, 
    {
      id: 2, 
      caption:' Work', 
      description: 'Work related action items, development, design, and implementation', 
      icon: 'work',
      color: 'green'
    }
  ];

  private items: Item[] = [
    {
      id: 3, 
      caption: 'Tomatos', 
      isCompleted: false, 
      listId: 1
    }, 
    {
      id: 4, 
      caption: 'Sugar', 
      isCompleted: true, 
      listId: 1
    }, 
    {
      id: 5, 
      caption: 'Milk', 
      isCompleted: false, 
      listId: 1
    }, 
  ];
  
  private lists$ = new BehaviorSubject<List[]>(this.lists);
  private items$ = new BehaviorSubject<Item[]>(this.items);

  constructor() { }

  getAllLists(): Observable<List[]> {
    return this.lists$.pipe(
      map(lists => lists.map(list => {return {...list}})));
  }

  getAllItems(): Observable<Item[]> {
    return this.items$.pipe(
      map(items => items.map(item => {return {...item}})));
  }

  getItemsInList(listId: number): Observable<Item[]> {
    return this.items$.pipe(
      map(items => items.filter(i => i.listId === listId))
    );
  }

  getTodoList(listId: number): Observable<List | undefined> {
    return this.lists$.pipe(
      map(lists => lists.find(l => l.id === listId))
    );
  }

  getTodoItem(itemId: number): Observable<Item | undefined> {
    return this.items$.pipe(
      map(items => items.find(l => l.id === itemId))
    );
  }

  private notifyLists() {
    this.lists$.next(this.lists);
  }

  private notifyItems() {
    this.items$.next(this.items);
  }

  async addList(
    caption: string, description: string, 
    color: string, icon: string): Promise<number> {
      let list: List = {
        id: ++this.runningId, 
        caption: caption, 
        description: description, 
        color: color, 
        icon: icon
      };

      this.lists = [...this.lists, list];
      this.notifyLists();
      return list.id;
  }

  async addItem(listId: number, caption: string): Promise<number> {
    let item: Item = {
      id: ++this.runningId, 
      caption: caption, 
      listId: listId, 
      isCompleted: false
    };

    this.items = [...this.items, item];
    this.notifyItems();
    return item.id;
  }

  async modifyList(list: List) {
    this.lists = this.lists.map(l => l.id === list.id ? {...list} : l); 
    this.notifyLists();
  }

  async deleteList(listId: number) {
    this.lists = this.lists.filter(l => l.id !== listId);  
    this.items = this.items.filter(i => i.listId !== listId);  
    this.notifyLists();
    this.notifyItems();
  }

  async markAsCompleted(itemId : number) {
    this.items = this.items
      .map(item => (item.id !== itemId) ? item : {...item, isCompleted: true});

    this.notifyItems();
  }


}
