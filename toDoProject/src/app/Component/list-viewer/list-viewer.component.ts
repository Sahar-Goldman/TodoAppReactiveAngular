import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item.model';
import { List } from 'src/app/core/models/list.model';
import { StateService } from 'src/app/core/services/state.service';
import { CoreValidators } from 'src/app/core/validators/core-validator';

@Component({
  selector: 'app-list-viewer',
  templateUrl: './list-viewer.component.html',
  styleUrls: ['./list-viewer.component.css']
})
export class ListViewerComponent implements OnInit {

  listId$!: Observable<number>;
  list$!: Observable<List | undefined>;
  items$!: Observable<Item[]>;

  isConfirmingDelete: boolean = false;
  newLine = new FormControl('', CoreValidators.counters(10, 3));

  constructor(
    private state: StateService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listId$ = this.route.params.pipe(
      map(prms => Number(prms['id']))
    );

    this.list$ = this.listId$.pipe(
      switchMap(id => this.state.getTodoList(id))
    );

    this.items$ = this.listId$.pipe(
      switchMap(id => this.state.getItemsInList(id))
    )
  }

  confirmDelete() {
    this.isConfirmingDelete = true;
  }

  cancelConfirmDelete() {
    this.isConfirmingDelete = false;
  }

  async deleteList() {
    let id = Number(this.route.snapshot.params['id']);
    await this.state.deleteList(id);
    this.router.navigate(['lists']);
  }

  async editList() {
    let id = Number(this.route.snapshot.params['id']);
    this.router.navigate(['lists', id, 'edit']);
  }

  async createNewList() {
    this.router.navigate(['lists', -1, 'edit']);
  }

  async markAsCompleted(itemId: number) {
    await this.state.markAsCompleted(itemId);
  }

  async addItem() {
    let listId = Number(this.route.snapshot.params['id']);
    await this.state.addItem(listId, this.newLine.value);
    this.newLine.reset();
  }

}
