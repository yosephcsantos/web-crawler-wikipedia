// Requires
const uuidv1 = require('uuid/v1');
const Crawler = require('crawler');

// Crawler config
const crawler = new Crawler();
const baseUrl = 'https://en.wikipedia.org';
const mainLink = '/wiki/Europe';
const urlMain = baseUrl + mainLink;

// IndexJs config
let linkListStoreOfficial = [];
let level = 0;
let limitRequestsByLevel = 100;

// Database config
var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://wikipedia-link.firebaseio.com"
});

function doRequestsList(list) {
    if(list.length > 0) {
        list.forEach(function(link) {
            if(link && link.url) {
                crawling.queue(link.url);   
            }
        });
    }
}

function hasParentIdToSave() {
    return linkListStoreOfficial[level-1] 
    && linkListStoreOfficial[level-1][level-1] 
    && linkListStoreOfficial[level-1][level-1].parentId;
}

function readLinkNext(linkListStore) {
    if(linkListStore.length > 0) {
        linkListStoreOfficial.push(linkListStore);
        
        if(hasParentIdToSave()) doRequestsList(linkListStoreOfficial[level-1]);
    }
}

function saveLink(parentIdLink, url, id) {
    firebase.database().ref('links/' + parentIdLink).push({
        url: url,
        id: id
    });
}

function readLink(response, linkListStore) {
    let parentId = uuidv1();
    
    level++;
    
    response.$('.mw-parser-output p').each(function() {
        let link = response.$(this).find("a[href^='/wiki/']").attr('href');
        
        if(link) {
            const linkToParser = baseUrl + link;
            let id = uuidv1();
            
            linkListStore.push({url: linkToParser, parentId: parentId, id: id});
            saveLink(parentId, linkToParser, id);
        }
    });
    
}

let crawling = new Crawler({
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

function main(urlMain) {   
    crawling.queue(urlMain);
}

main(urlMain);