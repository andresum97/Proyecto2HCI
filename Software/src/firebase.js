var firebase = require("firebase");
var Chart = require('chart.js');

src="https://www.gstatic.com/firebasejs/6.0.4/firebase-app.js"

const firebaseConfig = {
    apiKey: "AIzaSyB7Hjdc5RX9gQ_HJYRDS2stQhNs0NzGvxc",
    authDomain: "bibliostats-ad1d3.firebaseapp.com",
    databaseURL: "https://bibliostats-ad1d3.firebaseio.com",
    projectId: "bibliostats-ad1d3",
    storageBucket: "bibliostats-ad1d3.appspot.com",
    messagingSenderId: "1003979180833",
    appId: "1:1003979180833:web:83a44405a22bb4dd"
  };

  firebase.initializeApp(firebaseConfig);

  var db= firebase.database();
  var fecharef = firebase.database().ref().child("fecha");
 
  // console.log(firebase.auth) // Undefined
  // console.log(firebase.default.auth) // Function
  function leerDatostotales(){
    fecharef.on("value",function(snapshot){
      var prueba = snapshot.val();
      totaldatos = 0;
      var key = Object.keys(snapshot.val());
      console.log(snapshot.val());
      console.log(key);
      for(i=0;i<key.length;i++){
        console.log(key[i]);
        totaldatos = i+1;
      }
      console.log('Cantidad de datos totales: '+totaldatos);
    },function(errorObject){
      console.log("The read failed: "+errorObject.code);
    });
    // var fecharef = firebase.database().ref().child("fecha");
    // console.log('primero');
    // fecharef.on('value',function(snapshot){
    //   key = Object.keys(snapshot.val());
    //   console.log(key);
    //   for(i=0;i<key.length;i++){
    //     id = key[i];
    //     prueba += ',',id;
      
    //   }
    // });
  }
  function datosFecha(fecha){
    fecharef.on("value",function(snapshot){
      var key = Object.keys(snapshot.val());
      for(i=0;i<key.length;i++){
        // console.log('funciona');
        var id = key[i];
        var conn2 = firebase.database().ref('fecha/'+id);
        conn2.on('value',function(snapshot){
          connfecha = snapshot.val().fecha;
          if(connfecha == fecha){
           console.log(connfecha+","+snapshot.val().hora);
          }
        });
      }
    },function(errorObject){
      console.log("The read failed "+errorObject.code);
    });
  }
  // leerDatostotales();
  datosFecha('26/05/19');
  //console.log(leerDatostotales());