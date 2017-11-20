# web-crawler-wikipedia
    
## Get started
    $ npm install or yarn
    To install dependencies.
    $ npm start
    To run http-server, to see all links of https://en.wikipedia.org/wiki/Europe and the child links according to the set level.

## How to works?
    1. mainFunction -> invoke the crawler for get links of the Page1.
    2. The Crawler execute readLinkFunction -> to store all the links of the Page1 in a dataBase.
    3. The Crawler execute readLinkNextFunction -> get the links of Page1 and invoke the crawler to next level of the page. Basically, store all links of Page1.1, Page1.2, Page1.3... The readLinkNext will call the links of the links according to the set level in the file Index.js.

    Example: 
        Page1 is www.wikipedia.com;
        Page1 has two links: www.wikipedia.com/Europe and www.wikipedia.com/SouthAmerica.
        Page1.1 is www.wikipedia.com/Europe;
        Page1.1 has one link: www.wikipedia.com/Europe/Germany
        Page1.2 is www.wikipedia.com/SouthAmerica;
        Page1.2 has one link: www.wikipedia.com/SouthAmerica/Brazil;
        
        continue...

        
    

