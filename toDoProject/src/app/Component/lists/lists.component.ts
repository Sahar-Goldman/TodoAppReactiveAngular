import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { List } from 'src/app/core/models/list.model';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists$!: Observable<List[]>;

  constructor(
    private state: StateService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.lists$ = this.state.getAllLists();
  }

  navigateToList(id: number) {
    this.router.navigate(['lists', id]);
  }

  navigateToNew() {
    this.router.navigate(['lists', -1, 'edit']);
  }

}
