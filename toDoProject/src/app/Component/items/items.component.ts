import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/core/models/item.model';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items$!: Observable<Item[]>

  constructor(
    private state: StateService
  ) { }

  ngOnInit(): void {
    this.items$ = this.state.getAllItems().pipe(
      map(items => items.filter(i => !i.isCompleted))
    );
  }

  async complete(itemId: number) {
    await this.state.markAsCompleted(itemId);
  }

}
