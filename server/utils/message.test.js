var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');// There will be problem when you deal with latest version of expect

    expect(message).toInclude({from, text});
  });
});
describe('generateLocationMessage',()=>{
  it('Should generate correct Location Object.',()=>{
    var from ='Devanshu';
    var latitude=15;
    var longitude=19;
    var url=`https://www.google.com/maps?q=15,19`;
    var message=generateLocationMessage(from,latitude,longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });
});
