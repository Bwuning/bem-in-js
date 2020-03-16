// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.ts',
    plugins: [
        commonjs(),
        postcss({
            extensions: ['.css', '.sss', '.pcss', 'scss', 'sass']
        }),
        typescript({
            tsconfig: "./tsconfig.json",
        })
    ],
    output: [
        {
            file: 'dist/bundle.cjs.js',
            format: 'cjs',
            sourcemap: true
        }
    ]
};