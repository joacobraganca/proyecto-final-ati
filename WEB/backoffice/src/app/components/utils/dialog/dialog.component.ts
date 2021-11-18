import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],
})
export class DialogComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  mode: string = '';
  title: string = '';
  text: string = '';

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.subscription = this.data.currentMode.subscribe(
      (mode) => (this.mode = mode)
    );
    this.subscription = this.data.currentTitle.subscribe(
      (title) => (this.title = title)
    );
    this.subscription = this.data.currentText.subscribe(
      (text) => (this.text = text)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
