import { Component, OnInit } from '@angular/core';
import { ContactService } from './../contact.service';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers:[]
})
export class ContactListComponent implements OnInit {
  contacts: Array<Contact> = [];

  constructor(private contactService: ContactService) { 

  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChanged.subscribe((contacts: Array<Contact>) => {
      this.contacts = contacts;
    });
  }
}
