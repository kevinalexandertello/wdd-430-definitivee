import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  providers: []
})
export class DocumentListComponent implements OnInit {
  documents: Array<Document> = [];

 
  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChanged.subscribe((documents: Array<Document>) => {
      this.documents = documents;
    });
   }


}