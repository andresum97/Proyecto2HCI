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
var signInBtn = document.getElementById('signInBtn');


signInBtn.addEventListener('click', function(){

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var alertaL = document.getElementById('alertaL');
    //console.log(email);
    //console.log(password);
    
    
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
      alertaL.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-success" role="alert">
            Bienvenido
            </div>
          `;
        document.location.href = './index.html';
        
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        if(errorCode =="auth/wrong-password"){
            console.log('contrasenia mala xd')
            alertaL.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-danger" role="alert">
            La contraseña no es correcta.
            </div>
          `;
        }
        if(errorCode =="auth/user-not-found"){
          console.log('usuario malo xd');
          alertaL.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-danger" role="alert">
            El correo no está registrado.
            </div>
          `;
        }
        if(errorCode =="auth/invalid-email"){
            console.log('meta un correo valido xd')
            alertaL.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-danger" role="alert">
            El correo no es válido. <br>
            HINT: Debe de contener una @
            </div>
          `;
        }
        
        // ...
      });
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('User is signed in.');
          
        } else {
            console.log('No user is signed in.');
            
        }
      });
      
});
function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //aparece(user);
        //console.log(user);
        console.log("El usuario está logeado");
        var displayName = user.displayName;
        console.log(displayName);
        var email = user.email;
        console.log(email);
        var emailVerified = user.emailVerified;
        console.log(emailVerified);
        var photoURL = user.photoURL;
        console.log(photoURL);
        var isAnonymous = user.isAnonymous;
        console.log(isAnonymous);
        var uid = user.uid;
        console.log(uid);
        var providerData = user.providerData;
        console.log(providerData);
        // ...
      } else {
        // User is signed out.
        // ...
        console.log("El usuario no está logeado");
      }
    });
  }
  observador();
var changeBtn = document.getElementById('changeBtn');

changeBtn.addEventListener('click', function(){

    var auth = firebase.auth();
    var emailC = document.getElementById('emailC').value;
    var alertaPass = document.getElementById('alertaPass');
    console.log(emailC);
    
    auth.sendPasswordResetEmail(emailC).then(function() {
      console.log("se envio un correo")
      alertaPass.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-success" role="alert">
            Correo válido. <br>
            Verifique su email para continuar el cambio.
            </div>
          `;
    }).catch(function(error) {
      console.log("el correo no esta asignado")
      alertaPass.innerHTML = `
            <div class="mt-3"></div>
            <div class="alert alert-danger" role="alert">
            El correo no es válido. <br>
            No se envió mail de cambio.
            </div>
          `;
    });
    
});


