import { HttpService } from './services/http.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tourScout';

  currentLang: string = 'en';
  TransLang: string[] = [];

  images: any[] = [];
  busyLoadingData = false;
  searchVal: string = 'france';
  currentPage = 1;
  initialLoading = true;
  isBusy = false;

  constructor(
    public translate: TranslateService,
    private httpService: HttpService,
    private spinner: NgxSpinnerService
  ) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'fr']);

    this.currentLang = localStorage.getItem('currentLang')
      ? localStorage.getItem('currentLang') || 'en'
      : 'en';
    translate.use(this.currentLang);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getTransLanguage();
    this.getData();
  }

  toggleLanguage(): void {
    if (this.currentLang === 'en') {
      this.currentLang = 'fr';
    } else {
      this.currentLang = 'en';
    }
    localStorage.setItem('currentLang', this.currentLang);

    this.translate.use(this.currentLang);
  }

  getTransLanguage(): void {
    this.TransLang = [...this.translate.getLangs()];
  }

  searchLocation(event: string): void {
    this.spinner.show();
    this.images = [];
    this.currentPage = 1;
    this.searchVal = event;
    this.initialLoading = true;
    this.getData();
  }

  async getData() {
    try {
      if (!this.isBusy) {
        this.isBusy = true;
        this.currentPage++;

        this.httpService
          .get(this.searchVal, this.currentPage)
          .then((data: any) => {
            for (let i = 0; i < data.length; i++) {
              this.images.push(data[i]);
            }
            this.isBusy = false;
            this.spinner.hide();
          });
      }
    } catch (error) {
    } finally {
      this.initialLoading = false;
    }
  }

  async onScroll() {
    await this.getData();
  }
}
