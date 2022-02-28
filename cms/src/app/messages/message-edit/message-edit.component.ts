import { Component, EventEmitter,OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  currentSender: string = "Kevin A. Tello";

  @ViewChild('subject', { static: false })
  subjectRef!: ElementRef;
  @ViewChild('message', { static: false })
  messageRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const message = this.messageRef.nativeElement.value;
    const newMsge = new Message(1, subject, message, this.currentSender);
    this.addMessageEvent.emit(newMsge);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.messageRef.nativeElement.value = "";
  }

}