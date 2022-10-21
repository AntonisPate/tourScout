import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() changeLangEvent = new EventEmitter<string>();
  @Output() searchEvent = new EventEmitter<string>();
  @Input() currentLang: string;

  constructor(public translate: TranslateService) {
    this.currentLang = this.translate.getDefaultLang();
  }

  ngOnInit(): void {}

  toggleLang(): void {
    this.changeLangEvent.next('changeLang');
  }

  search(event: Event): void {
    this.searchEvent.next((event.target as HTMLInputElement).value);
  }
}
