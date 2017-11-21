# web-crawler-wikipedia
    
## Get started
    $ npm install
    To install dependencies.
    
    $ npm start
    To run http-server, to see all links of https://en.wikipedia.org/wiki/Europe 
    and the child links according to the set level.
    
    After access http://localhost:8080/

## How to works?
    1. mainFunction -> invoke the crawler for get links of the Page1.
    2. The Crawler execute readLinkFunction -> to store all the links of the Page1 in a dataBase.
    3. The Crawler execute readLinkNextFunction -> get the links of Page1 
    and invoke the crawler again for these links. 
    
    Basically, store all links of Page1.1, Page1.2, Page1.3... 
    The readLinkNext will call the links of the links according to the set level in the file Index.js.

    Example: 
        Page1 is www.wikipedia.com;
        Page1 has two links: www.wikipedia.com/Europe and www.wikipedia.com/SouthAmerica.
        
        Page1.1 is www.wikipedia.com/Europe;
        Page1.1 has one link: www.wikipedia.com/Europe/Germany
        
        Page1.2 is www.wikipedia.com/SouthAmerica;
        Page1.2 has one link: www.wikipedia.com/SouthAmerica/Brazil;
        
        continue...
        
## Firebase data
Do you have access to delete all data and populate again.

#### How?
1. Delete all data on database with this command: ```$ npm run delete-db```
2. Run the command ```$npm run build``` to populate the data on database.
3. Run the command ```$npm start``` and acess http://localhost:8080/

## Unit test
Just run command ```$npm test```

