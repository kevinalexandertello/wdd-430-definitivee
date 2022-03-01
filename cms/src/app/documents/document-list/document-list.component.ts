import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [
    new Document( 1,"Kennyyyyy","cooolll","https://i.blogs.es/755972/berserk-manga-2/1366_2000.jpeg","something"),
    new Document( 2,"Kenait","harder","https://m.media-amazon.com/images/I/71VWgHPrECL._AC_SY679_.jpg","null"),
    new Document( 3,"Kenshiro","better","https://e7.pngegg.com/pngimages/112/85/png-clipart-kenshiro-fist-of-the-north-star-youtube-manga-shin-youtube-game-superhero.png","null"),
    new Document( 4,"Jotaro","stronger","https://static.jojowiki.com/images/6/69/latest/20201130220440/Jotaro_SC_Infobox_Manga.png","null"),
    new Document( 5,"Nagato","power","https://i.ytimg.com/vi/3vfFpfONAv8/maxresdefault.jpg","null")
   
  ];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void { }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}