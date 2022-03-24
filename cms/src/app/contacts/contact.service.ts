import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Array<Contact>  = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChanged = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  getContacts(): Array<Contact> {
    return this.contacts.slice();
  } 

  getContact(id: string): Contact {
    return this.contacts.find(element => element.id == id)!;  
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
    this.contactChanged.emit(this.contacts.slice());
  }
}