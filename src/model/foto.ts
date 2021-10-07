export class Foto {
  source: {
    source: string
    color: string
    origin: string
  }

  width: number
  height: number
  foto_id: string
  orientation: Array<any>
  album: string

  widthPx: string
  heightPx: string

  loaded: boolean = false

  constructor({source, width, height, foto_id, orientation, album}: Foto) {
    this.source = source
    this.width = width
    this.height = height
    this.foto_id = foto_id
    this.orientation = orientation
    this.album = album

    this.widthPx = '0px'
    this.heightPx = '0px'

    this.preLoad()
  }

  get backgroundUrl() {
    if (this.loaded) {
      return `url('${this.source.source}')`
    }
    let color = this.source.color.replace('0x', '#')
    return `linear-gradient(to right bottom, ${color}, ${color})`
  }

  setFeasibleSize(maxWidth: number, maxHeight: number) {
    let wRatio = maxWidth / this.width
    let hRatio = maxHeight / this.height
    let width, height

    if (wRatio > hRatio) {
      width = hRatio * this.width
      height = maxHeight
    } else {
      height = wRatio * this.height
      width = maxWidth
    }

    this.widthPx = width + 'px'
    this.heightPx = height + 'px'
  }

  preLoad() {
    const image = new Image();

    image.src = this.source.source;
    image.onload = () => {
      this.loaded = true
    };
  }
}
