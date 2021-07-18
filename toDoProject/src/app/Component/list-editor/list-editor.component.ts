import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { List } from 'src/app/core/models/list.model';
import { StateService } from 'src/app/core/services/state.service';
import { CoreValidators } from 'src/app/core/validators/core-validator';

@Component({
  selector: 'app-list-editor',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.css']
})
export class ListEditorComponent implements OnInit {
  list$!: Observable<List | undefined>;
  form!: FormGroup;
  icons = [
    'shopping_cart', 
    'stars', 
    'today', 
    'work', 
    'call', 
    'flag'
  ]; 
  colors = [
    'red', 
    'blue', 
    'green', 
    'steelblue', 
    'magenta', 
    'brown', 
    'orange'
  ]

  private subs: Subscription[] = [];

  constructor(
    private state: StateService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router
    ) { }

  buildForm() {
    this.form = this.fb.group({
      id: [-1], 
      caption: ['', Validators.required], 
      description: ['', CoreValidators.counters(30, 8)], 
      icon: ['', Validators.required], 
      color: ['', Validators.required]
    });
  }

  async save() {
    const list = <List>this.form.value;
    let id = list.id;
    if (id) {
      await this.state.modifyList(list);
    } else {
      id = await this.state.addList(list.caption, list.description, list.color, list.icon);
    }

    this.router.navigate(['lists', id]);

  }


  ngOnInit(): void {
    this.buildForm();
    this.list$ = this.route.params.pipe(
      map(prm => Number(prm['id'])),
      switchMap(id => this.state.getTodoList(id))
    );

    this.subs.push(
      this.list$.pipe(tap(console.log))
      .subscribe(list => this.form.reset(list))
    );
  }

}
