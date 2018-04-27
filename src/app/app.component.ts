import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'menuItemApp';

  feed: string = 'https://dev.menu.ninja/api/menu/156?key=8j5vfe%24*pfb**rzt&pretty=1';
  menu: any[] = [];
  constructor(public http: Http) {

  }

  ngOnInit() {
    this.consumeMenuItemFeed();
  }


  /**
   * Consumes the supplied feed createa array from json object
   *
   * @memberof AppComponent
   */
  consumeMenuItemFeed() {
    this.http.get(this.feed)
      .subscribe(response => {
        const feedData = response.json();
        this.menu = Array.from(feedData.menu.items, x => {
          return x;
        });
        this.mockData();
      });
  }

  mockData() {
    this.menu.forEach((item) => {
      // creates an array of five random 1's and 0's sorts in reverse ord to hold mock fav scores
      item.favs = Array.from({ length: 5 }, () => Math.floor(Math.random() * 2)).sort().reverse();
      item.favs = Array.from({ length: 5 }, () => Math.floor(Math.random() * 2)).sort().reverse();
      // mock random prices
      item.prices.price.price = (Math.random() * (1.120) + 2.400).toFixed(2);
    });

  }



}
