// Requires
const uuidv1 = require('uuid/v1');
const Crawler = require('crawler');

// Crawler config
const baseUrl = 'https://en.wikipedia.org';
const mainLink = '/wiki/Europe';
const urlMain = baseUrl + mainLink;
const eachElement = '.mw-parser-output p';
const anchorElement = 'a[href^="/wiki/"]';

// IndexJs config
let linkListStoreMain = [];
let level = 0;
let limitRequestsByLevel = 100;

// Database config
var firebase = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://wikipedia-link.firebaseio.com'
});

/*
    Request for all links of parameter
*/
function doRequestsList(list) {
    if(list.length > 0) {
        list.forEach(function(link) {
            if(link && link.url) {
                crawler.queue(link.url);   
            }
        });
    }
}

/*
    Verify if object has parentId
*/
function hasParentIdToSave() {
    return linkListStoreMain[level-1] 
    && linkListStoreMain[level-1][level-1] 
    && linkListStoreMain[level-1][level-1].parentId;
}

/*
    Store the link list by parentId in Array linkListStoreMain.
*/ 
function readLinkNext(linkListStore) {
    if(linkListStore.length > 0) {
        linkListStoreMain.push(linkListStore);
        
        if(hasParentIdToSave()) doRequestsList(linkListStoreMain[level-1]);
    }
}

/*
    Store data in firebase.
*/
function saveLink(parentIdLink, url, id) {
    firebase.database().ref('links/' + parentIdLink).push({
        url: url,
        id: id
    });
}

/*
    Generate parentId.
    Add another level.
    Get links of the page.
*/ 
function readLink(response, linkListStore) {
    let parentId = uuidv1();
    
    level++;
    
    response.$(eachElement).each(function() {
        let link = response.$(this).find(anchorElement).attr('href');
        
        if(link) {
            const linkToParser = baseUrl + link;
            let id = uuidv1();
            
            linkListStore.push({url: linkToParser, parentId: parentId, id: id});
            saveLink(parentId, linkToParser, id);
        }
    });
    
}


/*
    Do the request for crawl a page.
    Get all links of the page and 
    do new requests to the children of this links. 
*/
let crawler = new Crawler({
    maxConnections : 10,
    callback : function (error, response, done) {
        let linkListStore = new Array();
        
        if(error) { console.log(error); return;}
        
        
        if(level <= limitRequestsByLevel) {
            readLink(response, linkListStore);
        } else {return;}
        
        readLinkNext(linkListStore);       
        
        done();
    }
});

/*
    Execute the crawler with the main page.
*/
function main(urlMain) {   
    crawler.queue(urlMain);
}

main(urlMain);