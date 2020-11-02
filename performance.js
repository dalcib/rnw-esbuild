const { execSync } = require('child_process')
const { performance } = require('perf_hooks')
const { writeFileSync } = require('fs')

const results = []
function perf(name, command) {
  const values = []
  let begin, end, time, stdout, seconds

  const rep = 10
  ;[...Array(rep)].forEach(() => {
    begin = performance.now()
    stdout = execSync(command).toString()
    end = performance.now()
    time = end - begin
    seconds = +(time / 1000).toFixed(2)
    values.push(seconds)
  })
  const average = +(values.reduce((acc, v) => acc + v, 0) / rep).toFixed(2)
  results.push({ command: name, values, average })
  /*   console.log(
    command.slice(0, 12),
    JSON.stringify(values),
    Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  ) */
}

perf(
  'metro --resetCache',
  'npx react-native.cmd bundle --platform web --dev false --entry-file node_modules/expo/AppEntry.js --bundle-output ./web-metro/bundle.js --assets-dest ./web-metro --config metro.config.js --minify true --sourcemap-output web-metro/bundle.js.map --reset-cache'
)
perf(
  'metro',
  'npx react-native.cmd bundle --platform web --dev false --entry-file node_modules/expo/AppEntry.js --bundle-output ./web-metro/bundle.js --assets-dest ./web-metro --config metro.config.js --minify true --sourcemap-output web-metro/bundle.js.map'
)
perf('expo --clear', 'expo.cmd build:web -c --no-pwa')
perf('expo', 'expo.cmd build:web --no-pwa')
perf('esbuild API', 'node build.js')
perf(
  'esbuild',
  'esbuild.cmd --bundle node_modules/expo/AppEntry.js --outfile=./web-esbuild/bundle.js --resolve-extensions=.web.jsx,.web.js,.jsx,.js --loader:.js=jsx  --define:process.env.NODE_ENV="\'production\'" --tsconfig=jsconfig.json --minify --sourcemap'
)

console.table(results)
console.log(results)

writeFileSync('perf-result.json', JSON.stringify(results))

//https://github.com/necolas/react-native-web/issues/1257
