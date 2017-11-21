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

// linkHandleJS config
let linkListOrderByAscending = [];
let linkList;
let linkListElement = document.getElementById('links');
let loadElement = document.getElementById('load');

// Show load
loadElement.classList.remove('hide');

// Get links of database
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

// Show the links in HTML
function showOnHtml() {
  let urlLinkList = linkListOrderByAscending.map(function(linkObj) {
    return '<li class="col-12 justify-content-center list-group-item"><a class="wk-u-ellipsis" href='+ linkObj +'>' + linkObj + '</a></li>';
  })
  .join('');

  linkListElement.insertAdjacentHTML('beforebegin', urlLinkList);
  
  loadElement.classList.add('hide');
}