import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.scss']
})
export class NewFolderDialogComponent implements OnInit {

  @Input() display: boolean = false;
  @Output() afterCreated = new EventEmitter<string>();
  @Output() onHide = new EventEmitter();

  folderName: string;
  constructor() { }

  ngOnInit(): void {
  }

  create() {
    this.display = false
    this.afterCreated.emit(this.folderName);
  }

  hideDialog() {
    this.onHide.emit();
  }

}
