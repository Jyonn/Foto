import {Injectable} from "@angular/core";
import {RequestService} from "./utils/request.service";
import {Subscriber} from "../model/utils/subscriber";

@Injectable()
export class ApiService {
  homepageGetter: Subscriber

  constructor(
    private request: RequestService,
  ) {
    this.homepageGetter = new Subscriber()
  }

  getHomePage() {
    this.request.get({url: '/'}).then((resp: any) => {this.homepageGetter.subscribe(resp)})
  }

  getAlbum(album: string) {
    return this.request.get({url: `/album/${album}`})
  }
}
