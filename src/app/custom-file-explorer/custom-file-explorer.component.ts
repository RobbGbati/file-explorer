import { NewFolderDialogComponent } from './../shared/modals/new-folder-dialog/new-folder-dialog.component';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FileElement } from '../model/file-element';
import { ContextMenuService, MenuItem } from 'primeng-lts/api';
import { ContextMenu } from 'primeng-lts/contextmenu';

@Component({
  selector: 'app-custom-file-explorer',
  templateUrl: './custom-file-explorer.component.html',
  styleUrls: ['./custom-file-explorer.component.scss']
})
export class CustomFileExplorerComponent implements OnInit{

  // on fera une abstraction de la logique de gestion de fichier
  // tout sera fait depuis le back-end
  @Input() fileElements: FileElement[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  @Output() folderAdded = new EventEmitter<{name: string}>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() elementRenamed = new EventEmitter<FileElement>();
  @Output() elementMoved = new EventEmitter<{from: FileElement, moveTo: FileElement}>();
  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();
  @Output() fileUploaded = new EventEmitter<any>();
  @Output() download = new EventEmitter<any>();
  @ViewChild('cm', { static: true }) public cm: ContextMenu;

  display1:boolean = false;
  display2: boolean = false;
  selected: FileElement;
  menuItems: MenuItem[];

  constructor() {}

  ngOnInit() {
    if (this.fileElements) {
      this.buildMenuItems();
    }
  }

  buildMenuItems() {
    this.menuItems = [
      {
        disabled: this.buildNestesMenu().length == 0,
        label: 'Déplacer vers',
        icon: 'eva eva-move-outline',
        items: [...this.buildNestesMenu()]
      },
      {
        label: 'Renommer',
        icon: 'eva eva-edit-outline',
        command: () => {
          this.openRenameDialog(this.selected);
        }
      },
      {
        disabled: this.selected?.isFolder,
        label: 'Télécharger',
        icon: 'eva eva-cloud-download-outline',
        command: () => {
          this.downloadFile(this.selected)
        }
      },
      {
        label: 'Supprimer',
        icon: 'eva eva-trash-2-outline',
        command: () => {
          this.deleteElement(this.selected)
        }
      }
    ];
  }

  downloadFile(element: FileElement) {
    this.download.emit(element);
  }

  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(from: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({
      from: from, moveTo: moveTo
    });
  }

  openNewFolderDialog() {
    this.display1 = true;
  }

  closeNewFolderDialog(createdName) {
    this.folderAdded.emit({name: createdName});
  }

  openRenameDialog(element: FileElement) {
    this.display2 = true;
    this.selected = element;
  }

  closeRenameDialog(event) {
    if (event) {
      this.elementRenamed.emit(event);
    }
  }

  selectedItem(element: FileElement) {
    this.selected = element;
    this.buildMenuItems();
  }

  buildNestesMenu() {
    const menus: MenuItem[] = [];
    const filtered = this.fileElements.filter(
      f => f.isFolder && f.id !== this.selected?.id);

    for (const f of filtered) {
      const item = {} as MenuItem;
      item.label = f.name;
      item.icon = 'eva eva-folder-outline',
      item.command = () => {
        this.moveElement(this.selected, f)
      }
      menus.push(item);
    }

    return menus;
  }

  show(cm: ContextMenu, event: MouseEvent, element) {
    event.preventDefault();
    this.selectedItem(element);
    cm.show(event)
  }

  upload(event) {
    this.fileUploaded.emit(event);
  }

}
