import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from './../contact.service';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers:[]
})
export class ContactListComponent implements OnInit, OnDestroy {
  public contacts: Array<Contact> = [];
  subscription!:Subscription;
  term!: string;


  constructor(private contactService: ContactService) { 

  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChanged.subscribe((contacts: Array<Contact>) => {
      this.contacts = contacts;
    });
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => {
      this.contacts = contactsList;
    });
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  search(value: string) {
    this.term = value;
  }
}
