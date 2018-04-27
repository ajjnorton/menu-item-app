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
        // get response as json oblect
        const feedData = response.json();
        // convert object to array
        this.menu = Array.from(feedData.menu.items, x => {
          return x;
        });
        this.mockData();
      });
  }


  /**
   * Adds some mock data to the feed
   *
   * @memberof AppComponent
   */
  mockData() {
    this.menu.forEach((item) => {
      // creates an array of five random 1's and 0's sorts in reverse ord to hold mock fav scores
      item.favs = Array.from({ length: 6 }, () => Math.floor(Math.random() * 2)).sort().reverse();
      // mock random prices
      item.prices.price.price = (Math.random() * (1.120) + 2.400).toFixed(2);
      // mock number of allergies
      item.allergies = Array.from({ length: 4 }, () => Math.floor(Math.random() * 2));
      // check for an array of all zeros or one
      const sum = item.allergies.reduce((sum, x) => sum + x);
      // if true add default alues
      if (sum === 0 || sum === 1) { item.allergies = [0, 1, 1, 1]; }
    });
  }



}
