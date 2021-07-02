import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageSearchService } from 'src/app/services/image-search.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  history$: Observable<string[]>;

  constructor(private readonly imageSearchService: ImageSearchService) {}

  ngOnInit() {
    this.history$ = this.imageSearchService.getHistory();
  }
}
