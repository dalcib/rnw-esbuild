require('esbuild')
  .build({
    entryPoints: ['./node_modules/expo/AppEntry.js'],
    bundle: true,
    outfile: './web/bundle.js',
    tsconfig: 'jsconfig.json',
    define: { 'process.env.NODE_ENV': 'production' },
    resolveExtensions: ['.web.jsx', '.web.js', '.jsx', '.js'],
    loader: { '.js': 'jsx' },
    minify: true,
    sourcemap: true,
  })
  .catch(() => process.exit(1))
