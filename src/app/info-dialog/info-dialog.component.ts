import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  @Input() messageInfo: string = "";
  @Input() showMessage: boolean = false;
  @Output() okClick = new EventEmitter<void>();

  handleOkClick() {
    this.okClick.emit();
  }
}
