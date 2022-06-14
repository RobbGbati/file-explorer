import { FileElement } from './../../../model/file-element';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss']
})
export class RenameDialogComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() element: FileElement;
  @Output() onHide = new EventEmitter();
  @Output() afterRenamed = new EventEmitter<FileElement>();

  folderName: string;
  constructor() { }

  ngOnInit(): void {
    this.folderName = this.element.name;
  }

  hideDialog() {
    this.onHide.emit();
  }

  rename() {
    this.display = false;
    this.element.name = this.folderName;
    this.afterRenamed.emit(this.element);
  }
}
