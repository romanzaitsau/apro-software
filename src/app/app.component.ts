import {Component, OnInit} from '@angular/core';
import {FetchService} from './shared/fetch.service';
import {GetResp, Post} from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private fetchService: FetchService) {
  }

  customerNumber = '';
  products: GetResp = {
    id: 0,
    recommendations: [],
    user_id: 0
  };

  showError = {
    show: false,
    msg: ''
  };

  ngOnInit(): void {
    this.fetchService.setCookies();
  }

  getProductsById(query: string): void {
    this.fetchService.getProductsById(query).subscribe(
      res => {
        this.showError.show = false;
        this.products = res;
      },
      err => {
        this.showError.show = true;
        this.showError.msg = err.error.error.msg;
      }
    );
  }

  clear(): void {
    this.customerNumber = '';
    this.products.recommendations = [];
    this.showError.show = false;
  }

  post(): void {
    const suggestion: Post = {
      id: this.products.id,
      recommended_products: this.products.recommendations.map(el => {
        return {id: el.id, status: el.status ? 1 : 0};
      })
    };
    this.fetchService.postSuggestion(suggestion).subscribe(() => {
        this.customerNumber = '';
        this.products.recommendations = [];
        this.showError.show = false;
      },
      err => {
        this.showError.show = true;
        this.showError.msg = err.error.error.msg;
      });
  }
}
