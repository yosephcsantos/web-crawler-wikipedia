// Initialize Firebase
let config = {
    apiKey: "AIzaSyCFkRD55a7sAu9qamGJCU-AlZgKYLQw9b0",
    authDomain: "wikipedia-link.firebaseapp.com",
    databaseURL: "https://wikipedia-link.firebaseio.com",
    projectId: "wikipedia-link",
    storageBucket: "wikipedia-link.appspot.com",
    messagingSenderId: "344476916768"
};

firebase.initializeApp(config);

let database = firebase.database();
let linkListOrderByAscending = [];
let linkList;

database.ref('links/').orderByChild('url').once('value').then(function(snapshot){
  snapshot.forEach(function(item) {
      linkList = item.val();
      Object.values(linkList).forEach(function(linkObj) {                
        linkListOrderByAscending.push(linkObj.url);
      });
  });
  // Order alphabetically
  linkListOrderByAscending.sort();
  showOnHtml();
});

function showOnHtml() {
  let urlLinkList = linkListOrderByAscending.map(function(linkObj) {
    return "<li>" + linkObj + "</li>";
  })
  .join("");

  document.getElementById('links').insertAdjacentHTML('beforebegin', urlLinkList);
}