import {Injectable} from "@angular/core";

@Injectable()
export class MenuService {
  menuText: string
  openMenu: boolean

  constructor() {
    this.openMenu = false
    this.menuText = 'Menu'
  }

  toggleMenu() {
    if (this.openMenu) {
      this.openMenu = false
      this.menuText = 'Menu'
    } else {
      this.openMenu = true
      this.menuText = 'Close'
    }
  }
}
