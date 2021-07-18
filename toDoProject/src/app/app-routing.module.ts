import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { ItemsComponent } from './Component/items/items.component';
import { ListEditorComponent } from './Component/list-editor/list-editor.component';
import { ListViewerComponent } from './Component/list-viewer/list-viewer.component';
import { ListsComponent } from './Component/lists/lists.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { EmptyListsGuard } from './core/guards/empty-lists.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}, 
  {path: 'lists', component: ListsComponent, canActivate: [EmptyListsGuard]}, 
  {path: 'lists/:id', component: ListViewerComponent}, 
  {path: 'lists/:id/edit', component: ListEditorComponent}, 
  {path: 'items', component: ItemsComponent}, 
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
