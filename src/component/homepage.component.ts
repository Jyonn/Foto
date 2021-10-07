import {Component, ElementRef, OnDestroy, ViewChild} from "@angular/core";
import {Foto} from "../model/foto";
import {ApiService} from "../service/api.service";
import {fromEvent, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  styleUrls: ['homepage.component.less'],
  templateUrl: 'homepage.component.html',
})
export class HomePageComponent implements OnDestroy {
  pinnedFotos: Array<Foto>
  pinnedIndex: number = 0
  @ViewChild('container') container!: ElementRef

  _resizeSubscription: Subscription;
  _lastAppearTime: number;

  constructor(
    private api: ApiService
  ) {
    this.pinnedFotos = []
    this.api.homepageGetter.observedBy(this.init.bind(this))

    this._resizeSubscription = fromEvent(window, 'resize')
      .subscribe(this.fitFotoSize.bind(this));
    this._lastAppearTime = new Date().getTime()
  }

  init(resp: any) {
    for (let foto of resp.fotos) {
      this.pinnedFotos.push(new Foto(foto))
    }

    setInterval(() => {
      this.displayNextFoto()
    }, 100)

    this.fitFotoSize()
  }

  fitFotoSize() {
    let e = this.container.nativeElement as HTMLElement
    let width = e.offsetWidth, height = e.offsetHeight

    this.pinnedFotos.forEach(foto => foto.setFeasibleSize(width, height))
  }

  ngOnDestroy(): void {
    if (this._resizeSubscription) {
      this._resizeSubscription.unsubscribe();
    }
  }

  displayNextFoto(compulsory = false) {
    let currentTime = new Date().getTime()
    if (currentTime - this._lastAppearTime >= 5000 || compulsory) {
      this.pinnedIndex = (this.pinnedIndex + 1) % this.pinnedFotos.length
      this._lastAppearTime = currentTime
    }
  }
}
