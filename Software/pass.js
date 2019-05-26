var firebase = require('firebase/app');
require('firebase/auth');
var firebaseConfig = {
    apiKey: "AIzaSyB7Hjdc5RX9gQ_HJYRDS2stQhNs0NzGvxc",
    authDomain: "bibliostats-ad1d3.firebaseapp.com",
    databaseURL: "https://bibliostats-ad1d3.firebaseio.com",
    projectId: "bibliostats-ad1d3",
    storageBucket: "bibliostats-ad1d3.appspot.com",
    messagingSenderId: "1003979180833",
    appId: "1:1003979180833:web:83a44405a22bb4dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);
console.log(firebase.default.auth());
var signOutBtn = document.getElementById('signOutBtn');

signOutBtn.addEventListener('click', function(){

  firebase.auth().signOut().then(function() {
    console.log('laaaaaaaargo');
    document.location.href = './login-forgotpass-confirmpass.html';
  }).catch(function(error) {
    console.log('error al largate');
  });
});