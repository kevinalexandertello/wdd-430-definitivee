import { ContactsComponent } from './contacts/contacts.component';
import { DocumentsComponent } from './documents/documents.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path: '', redirectTo: 'documents', pathMatch: 'full'},
  {path: 'documents', component: DocumentsComponent, children: [
    {path: 'new', component: DocumentEditComponent},
    {path: ':id/edit', component: DocumentEditComponent},
    {path: ':id', component: DocumentDetailComponent}
  ]},
  {path: 'messages/message-list', component: MessageListComponent},
  {path: 'contacts', component: ContactsComponent, children: [
    {path: 'new', component: ContactEditComponent},
    {path: ':id/edit', component: ContactEditComponent},
    {path: ':id', component: ContactDetailComponent}
  ]}
];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}