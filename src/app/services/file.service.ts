import { FileElement } from './../model/file-element';
import { Injectable } from "@angular/core";
import { v4 } from 'uuid/dist';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private map = new Map<string, FileElement>();
  private querySubject: BehaviorSubject<FileElement[]>;

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

  search(name) {
    let array = Array.from(this.map.values());
    array = array.filter((item) => item.name.includes(name));
    this.querySubject = new BehaviorSubject(array);
    return this.querySubject.asObservable();
    }
}
