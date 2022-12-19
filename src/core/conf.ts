import { Util } from '../libs/util';
import { Color } from 'three/src/math/Color';

export class Conf {
  private static _instance: Conf;

  // #############################################
  // 本番フラグ
  // #############################################
  public IS_BUILD:boolean = false;

  // テスト用 パラメータ
  public FLG_PARAM: boolean          = this.IS_BUILD ? false : false;
  public FLG_LOW_FPS: boolean        = this.IS_BUILD ? false : false;
  public FLG_DEBUG_TXT: boolean      = this.IS_BUILD ? false : false;
  public FLG_STATS: boolean          = this.IS_BUILD ? false : false;

  // パス
  public PATH_IMG: string = './assets/img/';

  // タッチデバイス
  public USE_TOUCH: boolean = Util.instance.isTouchDevice();

  // ブレイクポイント
  public BREAKPOINT: number = 768;

  // PSDサイズ
  public LG_PSD_WIDTH: number = 1600;
  public XS_PSD_WIDTH: number = 750;

  // 簡易版
  public IS_SIMPLE: boolean = Util.instance.isPc() && Util.instance.isSafari();

  // スマホ
  public IS_PC: boolean = Util.instance.isPc();
  public IS_SP: boolean = Util.instance.isSp();
  public IS_AND: boolean = Util.instance.isAod();
  public IS_TAB: boolean = Util.instance.isIPad();
  public USE_ROLLOVER:boolean = Util.instance.isPc() && !Util.instance.isIPad()

  public BG_COLOR:Color = new Color(0x000000);
  public TXT_COLOR:Color = new Color(0xffffff);

  public COLOR:Array<Color> = [
    new Color(0x4395d3),
    new Color(0xe26448),
    new Color(0xcad3d9),
    new Color(0xed9536),
    new Color(0xdd9e9c),
    new Color(0x275db5),
    new Color(0x275db5),
  ]

  constructor() {}
  public static get instance(): Conf {
    if (!this._instance) {
      this._instance = new Conf();
    }
    return this._instance;
  }
}
