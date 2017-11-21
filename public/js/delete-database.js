// Database config
var firebase = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://wikipedia-link.firebaseio.com'
});

let database = firebase.database();

// Delete links on database
database.ref('links/').remove();