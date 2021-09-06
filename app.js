const express = require('express');
const { use } = require('express/lib/application');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
//routes
app.get('/', (req, res) =>{
    res.send("<h1>Hello World 2021</h1>" );
});



//Access Token
app.get('/access_token',learning, (req, res) =>{
    res.status(200).send(access_token);
})



app.get('/register', learning, (req, resp)=>{
    let url = 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl'
    let auth = "Bearer "+ access_token

    request(
        {
            url: url,
            method: "POST",
            headers: {
                "Authorization" : auth
            },
            json: {
                "ShortCode": 174379,
                "ResponseType": "Complete",
                "ConfirmationURL": "https://197.232.61.192/confirmation",
                "ValidationURL": "https://197.232.61.192/validation"
            }
        },
        function(error, response, body){
            if(error) {console.log(error)}

            resp.status(200).json(body)
        }
    )
})

//this does not log back to console the request body
app.post('/confirmation', (req, resp)=>{
    console.log('...........................confirmation..................................................')
    console.log(req.body)


})
//this does not log back to console the request body
app.post('/validation', (req, resp)=>{
    console.log('...........................validation...................................................')
    console.log(req.body)
})

app.get('/simulate',learning, (req, res)=>{
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
    let auth3 = "Bearer " +access_token

    request(
        {
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth3
            },
            json: {
                    "ShortCode": "174379",
                    "CommandID": "CustomerPayBillOnline",
                    "Amount": 10,
                    "Msisdn": "254708374149",
                    "BillRefNumber": "TestAPI"
            } 
        },
        function(error, response, body){
                if(error){
                    console.log(error)
                }else{
                    res.status(200).json(body) 
                }
                
        }
    )
})

function learning(req, res, next){
    // app.use(accessToken)
 //})
     //access Token 
    // function accessToken(req, res, next){
         //access token
         let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
         let auth = Buffer.from("R054c0FmY2h6VXBSRlFqSHkzdEw3R0llN0cyNlBnT3c6alozeDBIV3N3NExYRE5PeQ==",'base64').toString('base64');
         //let auth = new Buffer.from("GNxsAfchzUpRFQjHy3tL7GIe7G26PgOw:jZ3x0HWsw4LXDNOy")toString(,'base64');
         request(
             {
                 url: url,
                 headers: {
                             "Authorization": 'Basic '+auth
                             
                 }
                 
             },
             (error, response, body)=>{
                     if(error){
                         console.log(error);
                         }
                         else{
                            access_token = JSON.parse(body).access_token
                             next()
                         }
             }
         )
     }

//Listen
app.listen(8000, (err, live)=>{
    if(err){
        console.error(err);
    }
    console.log('Server running on port 8000')
});


