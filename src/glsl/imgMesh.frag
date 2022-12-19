uniform sampler2D tDiffuse;
uniform float bright;
uniform float alpha;
uniform float contrast;

varying vec2 vUv;


void main(void) {

  vec4 dest = texture2D(tDiffuse, vUv);
  dest.rgb = (dest.rgb - 0.5) / (1.0 - contrast) + 0.5;
  dest.rgb += bright;
  dest.rgb = min(vec3(1.0), dest.rgb);
  dest.a *= alpha;

  gl_FragColor = dest;

}
