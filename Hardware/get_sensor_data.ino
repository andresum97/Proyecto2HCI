#include <Servo.h>
#include <Stepper.h>

#define PLC_IN A0
#define PLC_UP A1
#define PLC_DOWN A2
#define PLC_STOP A3

Servo get_data;
Stepper GetData(256, 13, 12, 11, 10);
unsigned int new_data, angulo,step_up,step_down;

void setup() {

  pinMode(PLC_UP, INPUT);
  pinMode(PLC_DOWN, INPUT);
  pinMode(PLC_STOP, INPUT);
  pinMode(2,OUTPUT);
  get_data.attach(8);
  Serial.begin(9600);
  digitalWrite(2,HIGH);
  GetData.setSpeed(20);
}

void loop() {
  new_data = analogRead(PLC_IN);
  angulo = map(new_data, 200, 1023, 0, 30);
  angulo = map(angulo, 0, 30, 0, 180);
  get_data.write(angulo);
  Serial.print("Abierto: ");
  Serial.print(map(angulo,0,180,0,100));
  Serial.println("%");
  delay(25);

    
}
