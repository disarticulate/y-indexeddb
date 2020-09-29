import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default [{
    input: './src/y-indexeddb.js',
    plugins: [
      nodeResolve({
        mainFields: ['module', 'browser', 'main']
      }),
      commonjs(),
      terser()
    ],
    external: ['yjs'],
    output: {
      name: 'y-indexeddb',
      extend: true,
      file: 'dist/y-indexeddb.min.js',
      format: 'iife'
    }
  },{
  input: './tests/index.js',
  output: {
    file: './dist/test.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'browser', 'main']
    }),
    commonjs()
  ]
}, {
  input: './src/y-indexeddb.js',
  output: {
    name: 'Y',
    file: 'dist/y-indexeddb.cjs',
    format: 'cjs',
    sourcemap: true,
    paths: path => {
      if (/^lib0\//.test(path)) {
        return `lib0/dist/${path.slice(5, -3)}.cjs`
      }
      return path
    }
  },
  external: id => /^(lib0|yjs)\//.test(id)
}]
