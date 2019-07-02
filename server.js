var express = require('express')
var bodyParser = require('body-parser')
var app = express()
const cron = require("node-cron")
const fs = require("fs")
var port = process.env.PORT || 8089
var logger = require('morgan')
var admin = require('firebase-admin')
nodeMailer = require('nodemailer')
// var server  = app.listen(8089);
// var io      = require('socket.io').listen(server);
const http = require('http').Server(app);
const io = require('socket.io')(http);




let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "poojitha1589@gmail.com",
      pass: "poojitha@123"
    }
  });

var serviceAccount = require('./rentalapp-9000a-firebase-adminsdk-hvb01-a8870c5937.json')
var firebaseAdmin = admin.initializeApp({
    credential :admin.credential.cert(serviceAccount),
    databaseURL : "https://rentalapp-9000a.firebaseio.com"
})
var db = firebaseAdmin.database();
app.get('/homeScreen', function(request, response){
    response.render('homeScreen.ejs')
})
db.ref('Tenant').once('value', function(snapshot) {
    snapshot.forEach(function(child) {
    
     var childData = child.val();
     console.log(childData);
     date = new Date(childData['ArrivalDate']);

     cron.schedule("0 10 1 1-12 0-7", function(){
        console.log("---------------------");
        console.log("Running Cron Job");
        let mailOptions = {
          from: "poojitha1589@gmail.com",
          to: childData['Email'],
          subject: `Rent Payment Date Arrived`,
          text: `Hi there,Today you have to pay Rent`
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            throw error;
          } else {
            console.log("Email successfully sent!");
          }
        });
      });

});
});
app.set('view engine', 'ejs')

app.use(express.static('views'))

app.set('views', __dirname + '/views')
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended : false}))



app.get('/', function(request, response ){
    //response.send("<h1> rental App </h1>")
    response.render('home.ejs')
})

app.get('/AddTenant', (req, res) => {
    res.render('AddTenant');
   });

   app.get('/AddBuilding', (req, res) => {
    res.render('AddBuilding');
   });   

   app.get('/AllTenants', (req, res) => {
    res.render('AllTenants');
   });   

    app.get('/home', (req, res) => {
        res.render('home');
    });
    app.get('/Notify', function(request, response){
        response.render('Notify')
    })

   app.get('/EditTenant', (req, res) => {
    res.render('EditTenant');
   });

   io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

   app.get('/chat', (req, res) => {
    res.render('chat');
   });

   app.get('/Email', (req, res) => {
    res.render('Email');
   });

   const server = http.listen(port, function() {
    console.log('listening on *:8089');
});
    