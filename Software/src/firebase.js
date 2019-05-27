var firebase = require("firebase/app");
require('firebase/auth');
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

  function horaTabla(dia,ani,mes1,inter){
    var tabla = document.getElementById('tablahora');
    tabla.innerHTML = ``;
    var anio = ani.substring(2,4);
    var mes = '05';
    var intervalo = '1';
    if(mes1=='Enero'){
      mes = '01'
    }
    if(mes1=='Febrero'){
      mes = '02'
    }
    if(mes1=='Marzo'){
      mes = '03'
    }
    if(mes1=='Abril'){
      mes = '04'
    }
    if(mes1=='Mayo'){
      mes = '05'
    }
    if(mes1=='Julio'){
      mes = '07'
    }
    if(mes1=='Agosto'){
      mes = '08'
    }
    if(mes1=='Septiembre'){
      mes = '09'
    }
    if(mes1=='Octubre'){
      mes = '10'
    }
    if(mes1=='Noviembre'){
      mes = '11'
    }
    if(inter=='Cada hora'){
      intervalo = '1'
    }
    if(inter=='Jornada'){
      intervalo = '2'
    }
    if(inter=='Cada 3 horas'){
      intervalo = '3'
    }
    fecharef.on("value",function(snapshot){
      var key = Object.keys(snapshot.val());
      cont = 0;
      var horas1 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var horas2 = [0,0,0];
      var horas3 = [0,0,0,0]
      for(i=0;i<key.length;i++){
        var id = key[i];
        var conn2 = firebase.database().ref('fecha/'+id);
        conn2.on('value',function(snapshot){
          connfecha = snapshot.val().fecha;
          connmes = connfecha.substring(3,5);
          connanio = connfecha.substring(6,8);
          conndia = connfecha.substring(0,2);
          connhora = snapshot.val().hora;
          hora = connhora.substring(0,2);
          if((connmes == mes) && (conndia == dia) && (connanio==anio)){
            if(intervalo == '1'){
              if(hora == '07'){
                horas1[0] += 1;
              }
              if(hora == '08'){
                horas1[1] += 1;
              }
              if(hora == '09'){
                horas1[2] += 1;
              }
              if(hora == '10'){
                horas1[3] += 1;
              }
              if(hora == '11'){
                horas1[4] += 1;
              }
              if(hora == '12'){
                horas1[5] += 1;
              }
              if(hora == '13'){
                horas1[6] += 1;
              }
              if(hora == '14'){
                horas1[7] += 1;
              }
              if(hora == '15'){
                horas1[8] += 1;
              }
              if(hora == '16'){
                horas1[9] += 1;
              }
              if(hora == '17'){
                horas1[10] += 1;
              }
              if(hora == '18'){
                horas1[11] += 1;
              }
            }//Primer if
            if(intervalo=='2'){
              horaint = parseInt(hora);
              if(horaint>= 1 && horaint<13){
                horas2[0] += 1;
              }
              if(horaint>= 13 && horaint<18){
                horas2[1] += 1;
              }
              if(horaint>= 18 && horaint<19){
                horas2[2] += 1;
              }
            }//Segundo if
            if(intervalo=='3'){
              horaint = parseInt(hora);
              if(horaint>=7 && horaint<10){
                horas3[0] += 1;
              }
              if(horaint>=10 && horaint<13){
                horas3[1] += 1;
              }
              if(horaint>=13 && horaint<16){
                horas3[2] += 1;
              }
              if(horaint>=16 && horaint<19){
                horas3[3] += 1;
              }
            }
          }
        });
      }
      if(intervalo=='1'){
        for(j=7;j<19;j++){
          const nuevafila = `
          <tr>
          <td>${j}:00</td>
          <td>${dia}</td>
          <td>${mes}</td>
          <td>${anio}</td>
          <td>${horas1[j-7]}</td>
          </tr>
          `;
          tabla.innerHTML += nuevafila;
        }
      }
      if(intervalo=='2'){
        const nuevafila = `
          <tr>
          <td>7:00-13:00</td>
          <td>${dia}</td>
          <td>${mes}</td>
          <td>${anio}</td>
          <td>${horas2[0]}</td>
          </tr>
          <tr>
          <td>13:00-18:00</td>
          <td>${dia}</td>
          <td>${mes}</td>
          <td>${anio}</td>
          <td>${horas2[1]}</td>
          </tr>
          <tr>
          <td>18:00-19:00</td>
          <td>${dia}</td>
          <td>${mes}</td>
          <td>${anio}</td>
          <td>${horas2[2]}</td>
          </tr>
          `;
          tabla.innerHTML += nuevafila;
      }
      if(intervalo=='3'){
        const nuevafila=`
        <tr>
        <td>7:00-10:00</td>
        <td>${dia}</td>
        <td>${mes}</td>
        <td>${anio}</td>
        <td>${horas3[0]}</td>
        </tr>
        <tr>
          <td>10:00-13:00</td>
          <td>${dia}</td>
          <td>${mes}</td>
          <td>${anio}</td>
          <td>${horas3[1]}</td>
        </tr>
        <tr>
          <td>13:00-16:00</td>
          <td>${dia}</td>
          <td>${mes}</td>
          <td>${anio}</td>
          <td>${horas3[2]}</td>
        </tr>
        <tr>
          <td>16:00-19:00</td>
          <td>${dia}</td>
          <td>${mes}</td>
          <td>${anio}</td>
          <td>${horas3[3]}</td>
          </tr>
        `;
        tabla.innerHTML += nuevafila;
      }
    });
  }

  function mesTabla(mes1,ani){
    var tabla = document.getElementById('tablames');
    var total = document.getElementById('totalpersonas');
    tabla.innerHTML = ``;
    var anio = ani.substring(2,4);
    var mes = '05';
    if(mes1=='Enero'){
      mes = '01'
    }
    if(mes1=='Febrero'){
      mes = '02'
    }
    if(mes1=='Marzo'){
      mes = '03'
    }
    if(mes1=='Abril'){
      mes = '04'
    }
    if(mes1=='Mayo'){
      mes = '05'
    }
    if(mes1=='Julio'){
      mes = '07'
    }
    if(mes1=='Agosto'){
      mes = '08'
    }
    if(mes1=='Septiembre'){
      mes = '09'
    }
    if(mes1=='Octubre'){
      mes = '10'
    }
    if(mes1=='Noviembre'){
      mes = '11'
    }
    console.log("llego");
    console.log(anio);
    console.log(mes);
    fecharef.on("value",function(snapshot){
      var key = Object.keys(snapshot.val());
      var cont = 0;
      for(i=0;i<key.length;i++){
        var id = key[i];
        var conn2 = firebase.database().ref('fecha/'+id);
        conn2.on('value',function(snapshot){
          connfecha = snapshot.val().fecha;
          connmes = connfecha.substring(3,5);
          connanio = connfecha.substring(6,8);
          if((connmes == mes) && (connanio == anio)){
            cont +=1;
            hora = snapshot.val().hora;
            dia = connfecha.substring(0,2);
            const nuevafila = `
            <tr>
            <td>${cont}</td>
            <td>${dia}</td>
            <td>${mes}</td>
            <td>${anio}</td>
            <td>${hora}</td>
            </tr>
          `;
         tabla.innerHTML += nuevafila;
          }
        });
      }
      total.innerHTML = "Total de personas: "+cont;
    });
  }

  function anioTabla(ani){
    var tabla = document.getElementById('tablaanio');
    var total = document.getElementById('totalpersonas');
    tabla.innerHTML = ``;
    anio = ani.substring(2,4)
    fecharef.on("value",function(snapshot){
      var key = Object.keys(snapshot.val());
      meses = [0,0,0,0,0,0,0,0,0,0,0,0];
      var cont = 0
      for(i=0;i<key.length;i++){
        // console.log('funciona');
        var id = key[i];
        var conn2 = firebase.database().ref('fecha/'+id);
        conn2.on('value',function(snapshot){
          connfecha = snapshot.val().fecha;
          res = connfecha.substring(6,8);
          if(res == anio){
            cont +=1;
            console.log(connfecha);
            hora = snapshot.val().hora;
            dia = connfecha.substring(0,2);
            mes = connfecha.substring(3,5);
            an = '20'+anio;
            const nuevafila = `
              <tr>
              <td>${cont}</td>
              <td>${dia}</td>
              <td>${mes}</td>
              <td>${an}</td>
              <td>${hora}</td>
              </tr>
            `;
           tabla.innerHTML += nuevafila; 
          }
        });
      }//For
      total.innerHTML = "Total de personas: "+cont;
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

  function datosSemana(anio, mesr){
    let grafico = document.getElementById('graficoanio').getContext('2d'); 
    fecharef.on("value",function(snapshot){ 
      var key = Object.keys(snapshot.val()); 
      
      semanas = [0,0,0,0]
      for(i=0;i<key.length;i++){ 
        
        var id = key[i];
        var conn2 = firebase.database().ref('fecha/'+id); 
        conn2.on('value',function(snapshot){
          connfecha = snapshot.val().fecha; 
         
          res = connfecha.substring(6,8); 
          
          if(res == anio){
            
            mes = connfecha.substring(3,5);
            console.log(mes)
            console.log(mesr)
            if(mes == mesr){

              dia = connfecha.substring(0,2);
              dia = parseInt(dia, 10);
              console.log(dia)
              if(dia <= 7){ 
                semanas[0] += 1
              }
              if(dia > 7 && dia <= 14){
                semanas[1] += 1
              }
              if(dia > 14 && dia <= 21){
                semanas[2] += 1
              }
              if(dia > 21){
                semanas[3] += 1
              }
            }
          }
        });
      }
      console.log(semanas);
      
      let massPopChart = new Chart(grafico,{ 
        type: 'bar',
        data:{
          labels:['1-7','8-14','15-21','22-35'],
          datasets:[{
            label:'Personas',
            data:semanas,
            backgroundColor:[
              'rgb(217,136,128)',
              'rgb(241,148,138)',
              'rgb(195,155,211)',
              'rgb(187,143,206)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor: '#000'
          }]
        },
        options:{
          title:{
            display:true,
            text: 'Cantidad de personas que ingresaron cada semana en el mes de '+mesr+' en el año 20'+anio,
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

  function datosHora(dia,anio,mes,intervalo){
    
    let grafico = document.getElementById('graficoanio').getContext('2d'); 
    fecharef.on("value",function(snapshot){ 
      var key = Object.keys(snapshot.val()); 
      
      cont = 0;
      var horas1 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var horas2 = [0,0,0];
      var horas3 = [0,0,0,0]

      

      for(i=0;i<key.length;i++){
        var id = key[i];
        var conn2 = firebase.database().ref('fecha/'+id);
        
        conn2.on('value',function(snapshot){
          connfecha = snapshot.val().fecha;
          connmes = connfecha.substring(3,5);
          
          connanio = connfecha.substring(6,8);
          conndia = connfecha.substring(0,2);
          connhora = snapshot.val().hora;
          hora = connhora.substring(0,2);

          
          /*console.log(dia);
          console.log(anio);
          console.log(mes);
          console.log(intervalo);*/
          if((connmes == mes) && (conndia == dia) && (connanio==anio)){

            //console.log('intervalo grafica');
            //console.log(intervalo);
            //console.log(intervalo);
            if(intervalo == '1'){
              //console.log('entro al if de grafica');
              if(hora == '07'){
                horas1[0] += 1;
              }
              if(hora == '08'){
                horas1[1] += 1;
              }
              if(hora == '09'){
                horas1[2] += 1;
              }
              if(hora == '10'){
                horas1[3] += 1;
              }
              if(hora == '11'){
                horas1[4] += 1;
              }
              if(hora == '12'){
                horas1[5] += 1;
              }
              if(hora == '13'){
                horas1[6] += 1;
              }
              if(hora == '14'){
                horas1[7] += 1;
              }
              if(hora == '15'){
                horas1[8] += 1;
              }
              if(hora == '16'){
                horas1[9] += 1;
              }
              if(hora == '17'){
                horas1[10] += 1;
              }
              if(hora == '18'){
                horas1[11] += 1;
              }
            }//Primer if
            if(intervalo=='2'){
              //console.log('entro al if2 de grafica');
              horaint = parseInt(hora);
              if(horaint>= 1 && horaint<13){
                horas2[0] += 1;
              }
              if(horaint>= 13 && horaint<18){
                horas2[1] += 1;
              }
              if(horaint>= 18 && horaint<19){
                horas2[2] += 1;
              }
            }//Segundo if
            if(intervalo=='3'){
              //console.log('entro al if3 de grafica');
              horaint = parseInt(hora);
              if(horaint>=7 && horaint<10){
                horas3[0] += 1;
              }
              if(horaint>=10 && horaint<13){
                horas3[1] += 1;
              }
              if(horaint>=13 && horaint<16){
                horas3[2] += 1;
              }
              if(horaint>=16 && horaint<19){
                horas3[3] += 1;
              }
            }
          }
        });
      }
      console.log(horas3);
      
      let massPopChart = new Chart(grafico,{ 
        type: 'bar',
        data:{
          labels:['7:00-10:00','10:00-13:00','13:00-16:00','16:00-19:00'],
          datasets:[{
            label:'Personas',
            data:horas3,
            backgroundColor:[
              'rgb(217,136,128)',
              'rgb(241,148,138)',
              'rgb(195,155,211)',
              'rgb(187,143,206)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor: '#000'
          }]
        },
        options:{
          title:{
            display:true,
            text: 'Cantidad de personas que ingresaron cada semana en el mes de',
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
  
  function logOut(){
    firebase.auth().signOut().then(function() {
      console.log('laaaaaaaargo');
      document.location.href = './login-confirmpass.html';
    }).catch(function(error) {
      console.log('error al largate');
    });

  }