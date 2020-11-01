# esbuild & react-native-web

This is a repository for the article https://dev.to/dalcib/esbuild-react-native-web-i-afn



esbuild --bundle node_modules/expo/AppEntry.js --outfile=./web/bundle.js --resolve-extensions=.web.jsx,.web.js,.jsx,.js --loader:.js=jsx  '--define:process.env.NODE_ENV="production"' --tsconfig=jsconfig.json --minify --sourcemap
