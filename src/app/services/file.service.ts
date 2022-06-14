import { FileElement } from './../model/file-element';
import { Injectable } from "@angular/core";
import { v4 } from 'uuid/dist';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private map = new Map<string, FileElement>();

  constructor() {}

  add(fileElement: FileElement) {
    fileElement.id = v4();
    this.map.set(fileElement.id, fileElement);

    return fileElement;
  }

  delete(id: string) {
    this.map.delete(id);
  }

  update(id: string, update: Partial<FileElement>) {
    let element = this.map.get(id);
    element = Object.assign(element, update);
    this.map.set(element.id, element);
  }

  get(id: string) {
    return this.map.get(id);
  }

  private querySubject: BehaviorSubject<FileElement[]>
  queryInFolder(folderId: string) {
    const result: FileElement[] = []
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(element);
      }
    })
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result)
    } else {
      this.querySubject.next(result)
    }
    return this.querySubject.asObservable()
  }
}
