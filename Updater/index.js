const firebase = require("firebase")

// var firebaseConfig = {
//     apiKey: "AIzaSyBYQRBR70FamWL72C11ek9BjHsytN-JL3M",
//     authDomain: "prueba-d1eb6.firebaseapp.com",
//     databaseURL: "https://prueba-d1eb6.firebaseio.com",
//     projectId: "prueba-d1eb6",
//     storageBucket: "prueba-d1eb6.appspot.com",
//     messagingSenderId: "1452801958363",
//     //appId: "1:1003979180833:web:83a44405a22bb4dd"
//   }
var firebaseConfig = {
    apiKey: "AIzaSyB7Hjdc5RX9gQ_HJYRDS2stQhNs0NzGvxc",
    authDomain: "bibliostats-ad1d3.firebaseapp.com",
    databaseURL: "https://bibliostats-ad1d3.firebaseio.com",
    projectId: "bibliostats-ad1d3",
    storageBucket: "bibliostats-ad1d3.appspot.com",
    messagingSenderId: "1003979180833",
    appId: "1:1003979180833:web:83a44405a22bb4dd"
}

async function funcionPrincipal(callback){
    while(true){
    var file = require('fs');
    var lines = file.readFileSync('prueba.txt').toString().split("\n"); 
    for (var i = 0; i < lines.length - 1; ++i) {
        lines[i] = lines[i].trim();
        var linea = lines[i].toString()
        var separation = linea.split(" ")
        var date = separation[2]
        var hour = separation[1]

        await ref.orderByChild("hora").equalTo(hour).once("value",snapshot => {
            if (snapshot.exists()){
                var contador = 0
                snapshot.forEach(function (childSnapshot) {
                var value = childSnapshot.val()
                    if(value.fecha === date && value.hora === hour){
                        ex = false
                        contador = contador + 1
                    }else{
                        ex = true
                    }
                })
                if (contador === 0){
                    ex = true
                    console.log(date)
                    console.log(hour)
                }else{
                    ex = false
                }
            }else{
                ex = true
            }       
        }) 
        
        await callback(ex,date,hour);
    }}
}

firebase.initializeApp(firebaseConfig)
const variable = firebase.database()

const ref = variable.ref('fecha/')


funcionPrincipal(function(boleano,date,hour){
     if (boleano == true){
         ref.push({
             fecha: date,
             hora: hour
         })
     }else{

     }
})

