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
    console.log(this.consumeMenuItemFeed());
  }


  /**
   * Consumes the supplied feed and returns a json object
   *
   * @memberof AppComponent
   */
  consumeMenuItemFeed() {
    this.http.get(this.feed)
      .subscribe(response => {
        const feedData = response.json();
        console.log(feedData.menu);
        this.menu = Array.from(feedData.menu.items, x => {
          return x;
        });
        console.log(this.menu);
  });
}



}
