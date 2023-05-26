import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit, OnDestroy {

  currentPage = '';
  private subPage?: Subscription;

  constructor(private headerService: HeaderService) {
  }

  async ngOnInit() {
    this.subPage = this.headerService.pageObservable.subscribe(page => {
      this.currentPage = page;
    });
  }

  ngOnDestroy(): void {
    this.subPage?.unsubscribe();
  }


}
