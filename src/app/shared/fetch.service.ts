import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Post} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) {
  }

  getProductsById(query: string): Observable<any> {
    return this.http.get(`api/recommended_products?user_id=${query}&top_k=3`)
      .pipe(
        map((resp: any) => {
          resp.suggestion.recommendations.forEach(el => {
            el.status = 1;
            this.getImages(el.product.code.toLowerCase()).subscribe(src => {
              el.product.src = src;
            });
          });
          return resp.suggestion;
        }),
      );
  }

  getImages(query: string): Observable<any> {
    return this.http.get(`eu/${query}`, {responseType: 'text'})
      .pipe(
        map((resp) => {
          return 'https://www.safetyjogger.com/' + resp.match(/picture.Brands.{2,30}320.{2,30}-WEB01.WEBP/m)[0];
        }),
        catchError(err => of('../assets/nopic.webp'))
      );
  }

  setCookies(): void {
    document.cookie = 'visid_incap_811636=03SNk1DwR6OoXIxZ0wuWRHIy8l8AAAAAQUIPAAAAAABdu6+k5+Dtz0DDJlhRDSpU';
    document.cookie = 'incap_ses_246_811636=2hpEH6BbKkLE5tnj5/dpA1BC818AAAAAiI5VIEz2gr2FtMy+m4vZIg==';
    document.cookie = 'incap_ses_7228_811636=+njBBEBVX0jPULD8uANPZMlc818AAAAAXEwxpxiiAdhWY4688h6cmA==';
    document.cookie = 'incap_ses_471_811636=P2/0PaR9uRHNscCqS1SJBrd5818AAAAA8mkqFxxELbA+0S12qhm0/w==';
  }

  postSuggestion(suggestion: Post): Observable<any> {
    return this.http.post(`api/suggestion_status`, suggestion);
  }

}
