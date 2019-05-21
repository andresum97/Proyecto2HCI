#include <Servo.h>
#include <Stepper.h>

#define PLC_IN A0
#define PLC_UP A1
#define PLC_DOWN A2
#define PLC_STOP A3

Servo chetos_mula;
Stepper Pennet(256, 13, 12, 11, 10);
unsigned int dennet_mula, angulo,step_up,step_down;

void setup() {

  pinMode(PLC_UP, INPUT);
  pinMode(PLC_DOWN, INPUT);
  pinMode(PLC_STOP, INPUT);
  pinMode(2,OUTPUT);
  chetos_mula.attach(8);
  Serial.begin(9600);
  digitalWrite(2,HIGH);
  Pennet.setSpeed(20);
}

void loop() {
  dennet_mula = analogRead(PLC_IN);
  angulo = map(dennet_mula, 200, 1023, 0, 30);
  angulo = map(angulo, 0, 30, 0, 180);
  chetos_mula.write(angulo);
  Serial.print("Abierto: ");
  Serial.print(map(angulo,0,180,0,100));
  Serial.println("%");
  delay(25);

    
}
