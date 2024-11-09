import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  fromEvent,
  map,
  startWith,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  private widthSubject = new BehaviorSubject<number>(window.innerWidth);
  width$ = this.widthSubject.asObservable();

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth),
        distinctUntilChanged()
      )
      .subscribe((width) => {
        this.widthSubject.next(width);
      });
  }
}
