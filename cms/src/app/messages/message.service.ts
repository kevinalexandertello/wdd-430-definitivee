import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  highMessageId!: number;

  constructor(private http: HttpClient) { 
    this.messages = this.getMessages();
  }
  getMessages(): Message[] {
    this.http.get<{ messages: Message[] }>('https://kevintelloalexander-222e9-default-rtdb.firebaseio.com/messages.json')
    .subscribe((messages: any) => {
      this.messages = messages;
      this.highMessageId = this.getHighId();

      this.messages.sort((x, y) => (x.id < y.id) ? 1 : (x.id > y.id) ? -1 : 0)
      this.messageChangedEvent.next(this.messages.slice());
    },
      (error: any) => {
        console.log('Error:', error);
      }
    )
  return this.messages.slice();
  }
  getMessage(id: string): Message {
    return this.messages.find(element => element.id == id)!;
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.storeContacts();
  }
  getHighId(): number {
    let maxId: number = 0;
    this.messages.forEach(message => {
      let currentId: number = parseInt(message.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  storeContacts() {
    let messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://kevintelloalexander-222e9-default-rtdb.firebaseio.com/messages.json', messages, { headers: headers })
      .subscribe( () => { 
        this.messageChangedEvent.next(this.messages.slice()); 
      });
}
}
