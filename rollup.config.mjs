import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        entryFileNames: '[name].cjs.js',
        sourcemap: true,
      },
      {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].esm.mjs',
        sourcemap: true,
      },
    ],
    plugins: [
      postcss({
        extract: 'styles/index.css', // Extract CSS to dist/styles/index.css
        modules: false,
        minimize: true,
        // inject: true, // Remove inject when extracting
        sourceMap: true,
        autoModules: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist',
        },
        exclude: ['**/stories/**'],
      }),
      terser(),
    ],
    external: ['react', 'react-dom', 'barcode-detector', 'webrtc-adapter'],
  },
];
