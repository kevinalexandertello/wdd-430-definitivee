import { Component, EventEmitter,OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from './../message.service';


@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
  providers: []
})
export class MessageEditComponent implements OnInit {

  currentSender: string = "40597622";

  @ViewChild('subject', { static: false })
  subjectRef!: ElementRef;
  @ViewChild('message', { static: false })
  messageRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(private messageService: MessageService) { }
  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const message = this.messageRef.nativeElement.value;
    const newMsge = new Message("1", subject, message, this.currentSender);
    console.log("newMsge:", newMsge);
    this.messageService.addMessage(newMsge);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.messageRef.nativeElement.value = "";
  }

}