import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';
import { WindRefService } from '../../wind-ref.service';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  @Input() 
  document!: Document;
  nativeWindow:any;
  constructor(
    private documentService: DocumentService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private windRefService: WindRefService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.document = this.documentService.getDocument(params['id']); 
    });

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
