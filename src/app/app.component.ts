import {Component} from '@angular/core';
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  albums: Array<{ name: string }>

  constructor(
    private api: ApiService,
  ) {
    this.albums = []

    this.api.homepageGetter.observedBy(this.init.bind(this))
    this.api.getHomePage()
  }

  init(resp: any) {
    this.albums = resp.albums;
  }
}
