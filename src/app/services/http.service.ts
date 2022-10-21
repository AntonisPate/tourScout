import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: '563492ad6f917000010000016adc2bf1d58547ae81a5768909254c9e',
  }),
};

const url: string = 'https://api.pexels.com/v1/';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  async get(searchVal = 'france', page = 1, perPage = 5) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          url + `/search?query=${searchVal}&page=${page}&per_page=${perPage}`,
          httpOptions
        )
        .subscribe(
          (response: any) => {
            resolve(response.photos);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
}
