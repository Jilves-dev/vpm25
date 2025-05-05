const path = require('path');

module.exports = {
  mode: 'development', // Vaihda 'production' kun olet valmis tuotantoon
  entry: './src/index.js', // Sovelluksesi sisäänkäyntipiste
  output: {
    path: path.resolve(__dirname, 'dist'), // Kansio, johon paketoidut tiedostot tulevat
    filename: 'bundle.js', // Paketoidun tiedoston nimi
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Käsittele kaikki .js tiedostot
        exclude: /node_modules/, // Pois lukien node_modules
        use: {
          loader: 'babel-loader', // Käytä Babel-loaderia JavaScript-tiedostojen kääntämiseen
        },
      },
      // Lisää sääntöjä tarpeen mukaan
    ],
  },
  // Lisää plugins, resolve, devServer konfiguraatiot tarpeen mukaan
};