import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  highContactId!: number;
  contacts: Array<Contact>  = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChanged = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  getContacts(): Array<Contact> {
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
    let contactListClone: Contact[] = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
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
    let contactListClone: Contact[] = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
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
    let contactListClone: Contact[] = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
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
}