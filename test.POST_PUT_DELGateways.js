var superagent = require("superagent");
var expect = require("expect.js");
var sleep = require('sleep');
var idGatewayBrain, idGatewayEWay, idGatewayPin, idGatewayPayWay, idGatewayPayPal, idGatewayEzidebit, idGatewayStripe="";

  describe('#gateway()', function(){
this.timeout(800000);

      
   
//------------------------------------------------------   
//------------------------ Post gateway Area
//------------------------------------------------------   
         
      
      
    it('Post Braintree Gateway', function(done){

 superagent.post('https://apista.envoyrecharge.com/v1/gateways')
.set('x-user-token','7656246aa9aed245e0d440a2b870fa0b78f64c89')
.send(
     {
         "name": "TestBrain",
         "merchant": "r7pcwvkbkgjfzk99",
         "username": "n8nktcb42fy8ttgt",
         "password": "c865e194d750148b93284c0c026e5f2a",
         "type": "Brain",
         "mode": "test"
     }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("201");
idGatewayBrain=res.body.resource.data._id;
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
    
    
    it('Post Pin Gateway', function(done){

 superagent.post('https://apista.envoyrecharge.com/v1/gateways')
.set('x-user-token','7656246aa9aed245e0d440a2b870fa0b78f64c89')
.send(
     {
         "name": "TestPin",
         "username": "oQ8mqNXh4lzZ9j3v2pFMJg",
         "type": "Pin",
         "mode": "test"
     }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("201");
idGatewayPin=res.body.resource.data._id;
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
    
    
    it('Post PayPal Gateway', function(done){

 superagent.post('https://apista.envoyrecharge.com/v1/gateways')
.set('x-user-token','7656246aa9aed245e0d440a2b870fa0b78f64c89')
.send(
    {
        "name": "TestPayPal",
        "username": "AQQitDlSO6nPBuS-XoKgmGPGX1lpAhxcbSogvVURlYVmt1XxkWysgmDvq0IYSScx0TppjMKROpfedK4_",
        "password": "EMKGDj6uEg4XJ8PGn1VHRXsiM8kXgERofp2KMt8EZYxs6WdR4szfGTiQiEPYmdFZcbqPrBo0bsgCnrAF",
        "type": "Paypal",
        "mode": "test"
    }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("201");
idGatewayPayPal=res.body.resource.data._id;
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
    
    
  it('Post Stripe Gateway', function(done){

 superagent.post('https://apista.envoyrecharge.com/v1/gateways')
.set('x-user-token','7656246aa9aed245e0d440a2b870fa0b78f64c89')
.send(
    {
        "name": "TestStripe",
        "username": "m5Jlhv0P2ASyFZYd2UEksqabQt5S92ut",
        "type": "Stripe",
        "mode": "test"
    }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("201");
idGatewayStripe=res.body.resource.data._id;
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })   
   
    it('Post EziDebit Gateway', function(done){

 superagent.post('https://apista.envoyrecharge.com/v1/gateways')
.set('x-user-token','7656246aa9aed245e0d440a2b870fa0b78f64c89')
.send(
        {
        "name": "TestEziDebit",
        "username": "77DC59D7-0E1D-4745-BF09-B43B4BCA3AFB",
        "password": "4AACD5C5-B9D9-4FDB-A1E2-4103B7955302",
        "type": "Ezidebit",
        "mode": "test"
        }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("201");
idGatewayEzidebit=res.body.resource.data._id;
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
  
  it('Post PayWay Gateway', function(done){

 superagent.post('https://apista.envoyrecharge.com/v1/gateways')
.set('x-user-token','7656246aa9aed245e0d440a2b870fa0b78f64c89')
.send(
       {
        "name": "TestPayWay",
        "username": "Q19018",
        "password": "A8hq6nkxb",
        "merchant": "TEST",
        "certificate_passphrase": "C45wm74he",
        "certificate_id": "551cf08243daf16f355ab3a7",
        "type": "Payway",
        "mode": "test"
        }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("201");
idGatewayPayWay=res.body.resource.data._id;
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
  
   it('Post Eway Gateway', function(done){

 superagent.post('https://apista.envoyrecharge.com/v1/gateways')
.set('x-user-token','7656246aa9aed245e0d440a2b870fa0b78f64c89')
.send(
       {
        "name": "TestEwayPost",
        "username": "60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
        "password": "Hello1234",
        "type": "Eway",
        "mode": "Test"
        }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("201");
idGatewayEWay=res.body.resource.data._id;
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
  
  
   
//------------------------------------------------------   
//------------------------ PUT gateway Area
//------------------------------------------------------   
   
   
   
   
   
    it('PUT Braintree Gateway', function(done){

 superagent.put('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayBrain)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.send(
     {
         "name": "TestBrainEdited",
         "merchant": "r7pcwvkbkgjfzk99",
         "username": "n8nktcb42fy8ttgt",
         "password": "c865e194d750148b93284c0c026e5f2a",
         "type": "Brain",
         "mode": "test"
     }) 
.end(function(e, res){

//expect(e).to.eql(null);
//expect(res.status).to.eql("200");
expect(res.body.resource.data.name).to.eql("TestBrainEdited");
//console.log(res.body.resource.data.name); 
//console.log(e);
// console.log(res);

done();

    })
  })
    
   
    it('PUT Pin Gateway', function(done){

 superagent.put('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayPin)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.send(
     {
         "name": "TestPinEdited",
         "username": "oQ8mqNXh4lzZ9j3v2pFMJg",
         "type": "Pin",
         "mode": "test"
     }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
expect(res.resource.data.name).to.eql("TestPinEdited");
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
    
    
    it('Put PayPal Gateway', function(done){

 superagent.put('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayPayPal)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.send(
    {
        "name": "TestPayPalEdited",
        "username": "AQQitDlSO6nPBuS-XoKgmGPGX1lpAhxcbSogvVURlYVmt1XxkWysgmDvq0IYSScx0TppjMKROpfedK4_",
        "password": "EMKGDj6uEg4XJ8PGn1VHRXsiM8kXgERofp2KMt8EZYxs6WdR4szfGTiQiEPYmdFZcbqPrBo0bsgCnrAF",
        "type": "Paypal",
        "mode": "test"
    }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
expect(res.resource.data.name).to.eql("TestPayPalEdited");
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
    
    
  it('Put Stripe Gateway', function(done){

 superagent.put('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayStripe)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.send(
    {
        "name": "TestStripeEdited",
        "username": "m5Jlhv0P2ASyFZYd2UEksqabQt5S92ut",
        "type": "Stripe",
        "mode": "test"
    }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
expect(res.resource.data.name).to.eql("TestStripeEdited");
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })   
   
    it('Put EziDebit Gateway', function(done){

 superagent.put('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayEzidebit)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.send(
        {
        "name": "TestEziDebitEdited",
        "username": "77DC59D7-0E1D-4745-BF09-B43B4BCA3AFB",
        "password": "4AACD5C5-B9D9-4FDB-A1E2-4103B7955302",
        "type": "Ezidebit",
        "mode": "test"
        }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
expect(res.resource.data.name).to.eql("TestEziDebitEdited");
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
  
  it('Put PayWay Gateway', function(done){

 superagent.put('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayPayWay)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.send(
       {
        "name": "TestPayWayEdited",
        "username": "Q19018",
        "password": "A8hq6nkxb",
        "merchant": "TEST",
        "certificate_passphrase": "C45wm74he",
        "certificate_id": "551cf08243daf16f355ab3a7",
        "type": "Payway",
        "mode": "test"
        }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
expect(res.resource.data.name).to.eql("TestPayWayEdited");
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
  
   it('Put Eway Gateway', function(done){

 superagent.put('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayEWay)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.send(
       {
        "name": "TestEwayEdited",
        "username": "60CF3CB0x8Issv4FwkQ4yae1LqEvgunT9bskrAin/vb72STGu0dyImytBJLbVrUCGnpzmc",
        "password": "Hello1234",
        "type": "Eway",
        "mode": "Test"
        }) 
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
expect(res.resource.data.name).to.eql("TestEwayEdited");
//console.log(res.body.resource.data._id); 
//console.log(e);
// console.log(res);

done();

    })
  })
  
   
   
   
//------------------------------------------------   
//------------------------ Delete gateway Area   
//------------------------------------------------
   
   
   
   
   
   /*
   
it('Post Brain Gateway DELETE', function(done){

 superagent.del('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayBrain)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
//console.log(res.body.resource.data._id); 
//console.log(e);
//console.log(res);

done();

    })
  })    
   
  
it('Post Pin Gateway DELETE', function(done){

 superagent.del('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayPin)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
//console.log(res.body.resource.data._id); 
//console.log(e);
//console.log(res);

done();

    })
  })    
   
  
it('Post PayPal Gateway DELETE', function(done){

 superagent.del('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayPayPal)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
//console.log(res.body.resource.data._id); 
//console.log(e);
//console.log(res);

done();

    })
  }) 

it('Post Stripe Gateway DELETE', function(done){

 superagent.del('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayStripe)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
//console.log(res.body.resource.data._id); 
//console.log(e);
//console.log(res);

done();

    })
  })

it('Post EziDebit Gateway DELETE', function(done){

 superagent.del('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayEzidebit)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
//console.log(res.body.resource.data._id); 
//console.log(e);
//console.log(res);

done();

    })
  })

it('Post PayWay Gateway DELETE', function(done){

 superagent.del('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayPayWay)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
//console.log(res.body.resource.data._id); 
//console.log(e);
//console.log(res);

done();

    })
  })
  it('Post Eway Gateway DELETE', function(done){

 superagent.del('https://apista.envoyrecharge.com/v1/gateways/'+idGatewayEWay)
.set('x-user-token','940ed98cf44b3b0f1be122b3cceccfc2d14c4e79')
.end(function(e, res){

//expect(e).to.eql(null);
expect(res.status).to.eql("200");
//console.log(res.body.resource.data._id); 
//console.log(e);
//console.log(res);

done();

    })
  })

})