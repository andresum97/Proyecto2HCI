#include <stdint.h>
#define PIN A0
bool gate_control;
uint16_t people_in;
String message, quantity;

void setup() {
  Serial.begin(9600);
  pinMode(PIN, INPUT);
  people_in = 0;
  gate_control = false;
  message = "Initialized";
  Serial.println(message);
}

void loop() {
  if (digitalRead(PIN) == LOW)
  {
    people_in ++;
    while (digitalRead(PIN) == LOW) {
      Serial.println("Entrando");
    }
  }
  quantity = String(people_in);
  message = "Personas adentro: " + quantity;
  Serial.println(message);
  delay(250);
}
