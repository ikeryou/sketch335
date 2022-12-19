import { Func } from '../core/func';
import { Canvas } from '../webgl/canvas';
import { Object3D } from 'three/src/core/Object3D';
import { Update } from '../libs/update';
import { Item } from './item';
import { Scroller } from '../core/scroller';
import { Util } from '../libs/util';


export class Visual extends Canvas {

  private _con:Object3D;
  private _item:Array<Item> = [];

  constructor(opt: any) {
    super(opt);

    this._con = new Object3D();
    this.mainScene.add(this._con);

    for(let i = 0; i < 1; i++) {
      const item = new Item();
      this._con.add(item);
      this._item.push(item);
    }

    this._resize();
  }


  protected _update(): void {
    super._update();

    const sw = Func.instance.sw();

    const allHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    // スクロールの進捗率
    const s = Util.instance.clamp(Scroller.instance.val.y / (allHeight - Func.instance.sh()), 0, 1);

    this._item.forEach((val) => {
      val.setRate(s);
      val.position.x = sw * 0.45;
    })

    if (this.isNowRenderFrame()) {
      this._render()
    }
  }


  private _render(): void {

    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.render(this.mainScene, this.cameraOrth);
  }


  public isNowRenderFrame(): boolean {
    return this.isRender && Update.instance.cnt % 1 == 0
  }


  _resize(): void {
    super._resize();

    const w = Func.instance.sw();
    const h = Func.instance.sh();

    this.renderSize.width = w;
    this.renderSize.height = h;

    this._updateOrthCamera(this.cameraOrth, w, h);
    this._updatePersCamera(this.cameraPers, w, h);

    let pixelRatio: number = window.devicePixelRatio || 1;

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(w, h);
    this.renderer.clear();
  }
}
