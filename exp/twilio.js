// const accountSid = "AC8b7221d76cf6d17f20e298092a897878";
// const authToken = "3cdd8b6f19b9944aeef6aa55ec1d037b";

// const client = require('twilio')(accountSid, authToken);


// client.messages.create({
//     to: '+919731299294',
//     from: '+12058318748',
//     body: 'success'
// }).then((message) => (console.log(message.sid))).catch((error)=> (console.log(error)));

var TMClient = require('textmagic-rest-client');
  
var c = new TMClient('username', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');
c.Messages.send({text: 'test message', phones:'9731299294'}, function(err, res){
    console.log('Messages.send()', err, res);
})