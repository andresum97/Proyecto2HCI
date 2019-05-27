var firebase = require("firebase/app");
require('firebase/database');
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



  function anioTabla(anio){
    fecharef.on("value",function(snapshot){
      var key = Object.keys(snapshot.val());
      meses = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(i=0;i<key.length;i++){
        // console.log('funciona');
        var id = key[i];
        var conn2 = firebase.database().ref('fecha/'+id);
        conn2.on('value',function(snapshot){
          connfecha = snapshot.val().fecha;
          res = connfecha.substring(6,8);
          if(res == anio){
            console.log(connfecha);
            mes = connfecha.substring(3,5); 
            console.log(mes);
            if(mes == '01'){
              meses[0] += 1
            }
            if(mes == '02'){
              meses[1] += 1
            }
            if(mes == '03'){
              meses[2] += 1
            }
            if(mes == '04'){
              meses[3] += 1
            }
            if(mes == '05'){
              meses[4] += 1
            }
            if(mes == '06'){
              meses[5] += 1
            }
            if(mes == '07'){
              meses[6] += 1
            }
            if(mes == '08'){
              meses[7] += 1
            }
            if(mes == '09'){
              meses[8] += 1
            }
            if(mes == '10'){
              meses[9] += 1
            }
            if(mes == '11'){
              meses[10] += 1
            }
            if(mes == '12'){
              meses[11] += 1
            }
          }
        });
      }
  },function(errorObject){
    console.log("The read failed "+errorObject.code);
  });
}

  function datosanio(anio){
    let grafico = document.getElementById('graficoanio').getContext('2d'); //aqui mando a llamar al canvas desde el archivo html
    fecharef.on("value",function(snapshot){ //Aqui realizo la conexion, si miras arriba la variable fecharef tiene la direccion de firebase
      var key = Object.keys(snapshot.val()); //Jalo las llaves para poder obtener la data y que cantidad hay
      meses = [0,0,0,0,0,0,0,0,0,0,0,0]; //Array donde guarda la info de personas por mes por eso hay 12 espacios
      for(i=0;i<key.length;i++){ //Recorrer todos los objetos
        // console.log('funciona');
        var id = key[i]; //Asi busco en firebase
        var conn2 = firebase.database().ref('fecha/'+id); //Aqui esa conexion la utilizo para poder buscar cada objeto por separado
        conn2.on('value',function(snapshot){
          connfecha = snapshot.val().fecha; //Aqui obtengo la fecha del objeto en firebase. dice fecha porque asi se llama el atributo en firebase
          res = connfecha.substring(6,8); //Aqui obtento el substring del año, osea para ver si es 19 por ejemplo
          if(res == anio){ //Comparo si el año es el que me pidieron, si es 18 o 19
            console.log(connfecha);
            mes = connfecha.substring(3,5);  //Aqui obtengo el mes
            console.log(mes);
            if(mes == '01'){ //Aqui comparo que mes es, y depende del mes aumenta el array la posición o el mes seleccionado
              meses[0] += 1
            }
            if(mes == '02'){
              meses[1] += 1
            }
            if(mes == '03'){
              meses[2] += 1
            }
            if(mes == '04'){
              meses[3] += 1
            }
            if(mes == '05'){
              meses[4] += 1
            }
            if(mes == '06'){
              meses[5] += 1
            }
            if(mes == '07'){
              meses[6] += 1
            }
            if(mes == '08'){
              meses[7] += 1
            }
            if(mes == '09'){
              meses[8] += 1
            }
            if(mes == '10'){
              meses[9] += 1
            }
            if(mes == '11'){
              meses[10] += 1
            }
            if(mes == '12'){
              meses[11] += 1
            }
          }
        });
      }
      console.log(meses);
      let massPopChart = new Chart(grafico,{ //Aqui instancio la grafica
        type: 'bar',//Para que sea de barras
        data:{
          labels:['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],//La info de abajo de la gráfica
          datasets:[{
            label:'Personas',
            data:meses,//Aqui meto el array de info
            backgroundColor:[
              'rgb(217,136,128)',
              'rgb(241,148,138)',
              'rgb(195,155,211)',
              'rgb(187,143,206)',
              'rgb(127,179,213)',
              'rgb(133,193,233)',
              'rgb(195,155,211)',
              'rgb(118,215,196)',
              'rgb(115,198,182)',
              'rgb(125,206,160)',
              'rgb(130,224,170)',
              'rgb(247,220,111)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor: '#000'
          }]
        },//Esto de aqui dejalo igual, salvo por la parte de año, esa oración ahi dice el titulo y por gráfica cambia
        options:{
          title:{
            display:true,
            text: 'Cantidad de personas que ingresaron en 20'+anio,
            fontSize:15
          },
          legend:{
            position:"right",
            labels:{
              fontColor:"#000"
            }
          },
          responsive:true,
          maintainAspectRatio: false,
          scales:{
            xAxes:[{
              gridLines:{
                display:false
              }
            }]
          }
        }
      });
    },function(errorObject){
      console.log("The read failed "+errorObject.code);
    });
  }
  // leerDatostotales();
  // datosFecha('26/05/19');
  //datosanio('19');
  //console.log(leerDatostotales());