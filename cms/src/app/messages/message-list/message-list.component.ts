import { Component, OnInit } from '@angular/core';
import { Message } from './../message.model';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  
  messages: Message[] = [
    new Message(1, 'subject', 'prove1', 'ken'),
    new Message(2, 'subject2', 'proove2', 'kent'),
    new Message(3, 'subject3', 'prooove3', 'kenny'),
  ];
  constructor() {}

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngOnInit(): void {}
}
