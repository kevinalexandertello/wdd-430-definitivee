import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from 'src/app/contacts/contact.model';
import { CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  originalContact!: Contact;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];
      if(!id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(id);
      if(!this.originalContact) {
        this.editMode = false;
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if(this.contact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      } 
    });
  }

onSubmit(form: NgForm) {
  let value = form.value;
  let newContact = new Contact(value.id, value.name, value.email, value.phone, value.url, this.groupContacts);
  if(this.editMode === true) {
    this.contactService.updateContact(this.originalContact, newContact)
  }
  else {
    this.contactService.addContact(newContact);
  }
  this.router.navigate(['/contacts']);
  }
  
  onRemoveItem(i: number) {
    if (i < 0 || i >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(i, 1);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

}
