describe('on links', function() {
    var fixture;
    beforeEach(function() {
        fixture = '<h1>Links of Wikipedia Europe</h1>' + 
          '<ul id="links"></ul>';
    
        document.body.insertAdjacentHTML('afterbegin', fixture);
    });

    it('should add links', () => {
        expect(document.getElementsByTagName('h1')[0].innerHTML).toEqual('Links of Wikipedia Europe');
        expect(document.getElementsByTagName('ul')[0].id).toEqual('links');
    });
});