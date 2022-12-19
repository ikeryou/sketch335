import { MyObject3D } from "../webgl/myObject3D";
import { Mesh } from 'three/src/objects/Mesh';
import { Util } from "../libs/util";
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial';
import { CircleGeometry } from 'three/src/geometries/CircleGeometry';
import { Func } from "../core/func";
import { CatmullRomCurve3 } from "three/src/extras/curves/CatmullRomCurve3";
import { TubeGeometry } from "three/src/geometries/TubeGeometry";
import { Vector3 } from "three/src/math/Vector3";

export class Item extends MyObject3D {

  private _line:Mesh;
  private _edge:Array<Mesh> = [];

  constructor() {
    super()

    for(let i = 0; i < 2; i++) {
      const edge = new Mesh(
        new CircleGeometry(0.5, 64),
        new MeshBasicMaterial({
          depthTest: false,
          color: 0x000000,
        })
      );
      this.add(edge);
      this._edge.push(edge);
    }

    this._line = new Mesh(
      this._makeLineGeo(),
      new MeshBasicMaterial({
        depthTest: false,
        color: 0x000000,
      })
    );
    this.add(this._line);
  }


  public setRate(r:number):void {
    this._line.geometry.dispose();
    this._line.geometry = this._makeLineGeo(r);


  }


  protected _update():void {


  }


  protected _resize(): void {
    super._resize();
  }


  // ---------------------------------
  //
  // ---------------------------------
  private _makeLineGeo(r:number = 0): TubeGeometry {
    const arr = [];

    const sw = Func.instance.sw();
    const sh = Func.instance.sh();

    const width = Func.instance.val(4, 8);
    const it = sh * 0.005;
    let i = 0;
    const radius = sw * 0.01;
    const fineness = 10;
    const ang = 360;
    const startY = Util.instance.map(r, sh * 0.45, -sh * 0.45 + it * (ang / fineness), 0, 1);
    while (i <= ang) {
      const radian = Util.instance.radian((Util.instance.mix(0, 360 * 6, r)) + i);
      const v:Vector3 = new Vector3(
        Math.sin(radian) * radius,
        startY - arr.length * it,
        0
      );
      arr.push(v);
      i += fineness;
    }

    const edgeSize = width * 1.75;
    this._edge[0].scale.set(edgeSize, edgeSize, 1);
    this._edge[1].scale.set(edgeSize, edgeSize, 1);

    this._edge[0].position.x = arr[0].x;
    this._edge[0].position.y = arr[0].y;

    this._edge[1].position.x = arr[arr.length - 1].x;
    this._edge[1].position.y = arr[arr.length - 1].y;

    const sampleClosedSpline = new CatmullRomCurve3(arr, false);
    const tube = new TubeGeometry(sampleClosedSpline, 32, width, 3, false);

    return tube;
  }
}