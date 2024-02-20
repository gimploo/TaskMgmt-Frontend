import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService implements OnDestroy {

  message: BehaviorSubject<ToasterMessage> = new BehaviorSubject<ToasterMessage>({
    type: "unknown",
    content: "unknown"
  });

  constructor() { }

  public success(message: string)
  {
    this.message.next({
      type: "success",
      content: message
    });
  }

  public error(message: string)
  {
    this.message.next({
      type: "error",
      content: message
    });
  }

  public ngOnDestroy(): void {

    this.message.unsubscribe();
  }
}

export interface ToasterMessage {
  type: string;
  content: string;
}

export interface ToasterConfig {
  title: string;
  message: string;
  bgcolor: string;
}