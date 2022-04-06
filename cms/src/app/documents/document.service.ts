import { Injectable , EventEmitter} from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  highDocumentId!: number;
  documentSelectedEvent = new EventEmitter<Document>();
  documentChanged = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  
  constructor(private http: HttpClient) {
    this.documents = this.getDocuments()
    
    this.highDocumentId = this.getHighId();
  }

  getDocuments(): Document[] {

    this.http.get<{ documents: Document[] }>('https://kevintelloalexander-222e9-default-rtdb.firebaseio.com/documents.json')
      .subscribe((documents: any) => {
        this.documents = documents;
        this.highDocumentId = this.getHighId();

        this.documents.sort((x, y) => (x.name < y.name) ? 1 : (x.name > y.name) ? -1 : 0)
        this.documentListChangedEvent.next(this.documents.slice());
      },
        (error: any) => {
          console.log('Error:', error);
        }
      )
    return this.documents.slice();
  } 

  getDocument(id: string): Document {
    return this.documents.find(element => element.id == id)!;
  }

  addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }

    this.highDocumentId++;
    newDocument.id = this.highDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(oldDocument: Document, newDocument: Document) {
    if(!oldDocument || !newDocument) {
      return;
    }

    let position: number = this.documents.indexOf(oldDocument);
    if(position < 0) {
      return
    }

    newDocument.id = oldDocument.id;
    this.documents[position] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    if (!document) {
      return;
    }

    const position = this.documents.indexOf(document);
    if (position < 0) {
      return;
    }

    this.documents.splice(position, 1);
    this.storeDocuments();
  }

  getHighId(): number {
    let maxId: number = 0;
    this.documents.forEach(document => {
      let currentId: number = parseInt(document.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }
  storeDocuments() {
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('https://kevintelloalexander-222e9-default-rtdb.firebaseio.com/documents.json', documents, { headers: headers })
      .subscribe( () => { 
        this.documentListChangedEvent.next(this.documents.slice()); 
      });
  }
}
