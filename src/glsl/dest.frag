uniform sampler2D tCross;
uniform sampler2D tNormal;
uniform vec3 mouse;
uniform float time;
uniform float test;

varying vec2 vUv;


void main(void) {
  vec4 crossTest = texture2D(tCross, vUv);
  vec4 destA = texture2D(tNormal, vUv);

  if(crossTest.a > test) {
    destA.a *= 0.0;
  }

  gl_FragColor = destA;
  // gl_FragColor = crossTest;
}
