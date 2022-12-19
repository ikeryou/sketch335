import baseVt from '../glsl/base.vert';
import imgMeshFg from '../glsl/imgMesh.frag';
import { Object3D } from 'three/src/core/Object3D';
import { Mesh } from 'three/src/objects/Mesh';
import { PlaneBufferGeometry } from 'three/src/geometries/PlaneGeometry';
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial';
import { Vector3 } from 'three/src/math/Vector3';
import { DoubleSide } from 'three/src/constants';

export class ImgMesh extends Object3D {

  private _opt:any
  private _mesh:Mesh

  constructor(opt:any = {}) {
    super()

    this._opt = opt

    this._mesh = new Mesh(
      new PlaneBufferGeometry(1, 1),
      new ShaderMaterial({
        vertexShader:baseVt,
        fragmentShader:imgMeshFg,
        transparent:true,
        side:DoubleSide,
        depthTest:false,
        uniforms:{
          tDiffuse:{value:this._opt.tex},
          alpha:{value:1},
          bright:{value:0},
          contrast:{value:0}
        }
      })
    )
    this.add(this._mesh)

    if(opt.renderOrder != undefined) {
        this._mesh.renderOrder = opt.renderOrder
    }
  }


  public getMesh():Mesh {
    return this._mesh
  }


  public getUni():any {
    return (this._mesh.material as ShaderMaterial).uniforms;
  }


  public setSize(size:number):void {
    this._mesh.scale.set(size, size, 1)
  }


  public setAlpha(a:number):void {
    (this._mesh.material as ShaderMaterial).uniforms.alpha.value = a;
  }


  public getSize():Vector3 {
    return this._mesh.scale
  }
}