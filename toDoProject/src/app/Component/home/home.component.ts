import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  today = Date.now();
  developer = 'Sahar Goldman';
  application = 'Todos app';
  itemsCount$!: Observable<number>;
  uncompletedCount$!: Observable<number>;
  listsCount$!: Observable<number>;

  constructor(
    private state: StateService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.itemsCount$ = this.state.getAllItems().pipe(
      map(items => items.length)
    );
    this.uncompletedCount$ = this.state.getAllItems().pipe(
      map(items => items.filter(i => !i.isCompleted).length)
    );
    this.listsCount$ = this.state.getAllLists().pipe(
      map(items => items.length)
    )

  }

  navigateToNew() {
    this.router.navigate(['lists', -1, 'edit']);
  }

  navigateToLists() {
    this.router.navigate(['lists']);
  }

  navigateToItems() {
    this.router.navigate(['items']);
  }

}
