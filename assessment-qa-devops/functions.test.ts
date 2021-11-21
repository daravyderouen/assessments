const {shuffleArray} = require('./utils')


//test('should run', () => expect(2).toBe(2))
describe('shuffleArray should', () => {
    // CODE HERE
    test('id should match', () => {
        const obj = {
            id: '8',
            name: 'Self-Aware Garbage Android', 
            imgAddress: 'https://robohash.org/garbage'
    
        };
        expect (obj.id).toEqual('8')
    })


      test ('name', () => {
          expect(typeof{value: 'value'}).toBe('object');
      })


})