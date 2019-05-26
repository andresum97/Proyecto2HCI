#include <stdint.h>

#define READ_PIN A1
#define EXIT A5
#define CONTROL 7

bool gate_control;
uint16_t people_in;
String quantity;

void setup() {
  Serial.begin(9600);
  pinMode(READ_PIN, INPUT);
  people_in = 0;
  gate_control = false;
  pinMode(EXIT, INPUT_PULLUP);
  pinMode(CONTROL, OUTPUT);
  digitalWrite(CONTROL, HIGH);
}

void loop() {
  if (digitalRead(READ_PIN) == LOW)
  {
    people_in ++;
    while (digitalRead(READ_PIN) == LOW) {
      delay(10);
    }
    quantity = String(people_in);
    Serial.print(people_in);
  }
  delay(100);
}
