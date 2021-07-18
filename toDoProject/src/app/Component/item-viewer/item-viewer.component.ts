import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-viewer',
  templateUrl: './item-viewer.component.html',
  styleUrls: ['./item-viewer.component.css']
})
export class ItemViewerComponent {

  @Input()
  caption: string = '';

  @Input() 
  isCompleted: boolean = false;

  @Output()
  completed = new EventEmitter<void>();

  complete() {
    if (!this.isCompleted)
      this.completed.emit();
  }

}
