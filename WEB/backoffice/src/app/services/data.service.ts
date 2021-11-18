import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private modeSource = new BehaviorSubject('default message');
  private titleSource = new BehaviorSubject('default message');
  private textSource = new BehaviorSubject('default message');

  currentMode = this.modeSource.asObservable();
  currentTitle = this.titleSource.asObservable();
  currentText = this.textSource.asObservable();

  constructor() {}

  changeDialog(mode: string, title: string, text: string) {
    this.modeSource.next(mode);
    this.titleSource.next(title);
    this.textSource.next(text);
  }
}
