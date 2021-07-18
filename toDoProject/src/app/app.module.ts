import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Component/home/home.component';
import { ItemsComponent } from './Component/items/items.component';
import { ListsComponent } from './Component/lists/lists.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { ListEditorComponent } from './Component/list-editor/list-editor.component';
import { ListViewerComponent } from './Component/list-viewer/list-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemViewerComponent } from './Component/item-viewer/item-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemsComponent,
    ListsComponent,
    NotFoundComponent,
    ListEditorComponent,
    ListViewerComponent,
    ItemViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
