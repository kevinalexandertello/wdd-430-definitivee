import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  highContactId!: number;
  contacts: Contact[]  = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChanged = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  
  constructor(private http: HttpClient) { 
    this.contacts = this.getContacts();
   }

   getContacts(): Contact[] {
    this.http.get<{ contacts: Contact[] }>('https://kevintelloalexander-222e9-default-rtdb.firebaseio.com/contacts.json')
      .subscribe((contacts: any) => {
        this.contacts = contacts;
        this.highContactId = this.getHighId();

        this.contacts.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 : 0)
        this.contactListChangedEvent.next(this.contacts.slice());
      },
        (error: any) => {
          console.log('Error:', error);
        }
      );
    return this.contacts.slice();
  } 

  getContact(id: string): Contact {
    return this.contacts.find(element => element.id == id)!;  
  }

  addContact(newContact: Contact) {
    if(!newContact) {
      return;
    }

    this.highContactId++;
    newContact.id = this.highContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return;
    }

    let position: number = this.contacts.indexOf(originalContact);
    if(position < 0) {
      return
    }

    newContact.id = originalContact.id;
    this.contacts[position] = newContact;
    this.storeContacts();
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
    }

    const position = this.contacts.indexOf(contact);
    if (position < 0) {
      return;
    }

    this.contacts.splice(position, 1);
    this.storeContacts();
  }

  getHighId(): number {
    let maxId: number = 0;
    this.contacts.forEach(contact => {
      let currentId: number = parseInt(contact.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }
  storeContacts() {
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://kevintelloalexander-222e9-default-rtdb.firebaseio.com/contacts.json', contacts, { headers: headers })
      .subscribe( () => { 
        this.contactListChangedEvent.next(this.contacts.slice()); 
      });
  }
}