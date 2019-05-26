import serial
import time
ino_port = "COM5"

try:
  serial_port = serial.Serial(port = ino_port, baudrate = 9600,bytesize = 8, timeout = 0.05, stopbits = 1)
  data = open("prueba.txt","a")
  time.sleep(1)
  while(1):
    if(serial_port.in_waiting>0):
      serial_message = serial_port.readline()
      quantity = str(serial_message, "utf-8")
      print('Cantidad de personas: ' + quantity + '\n')
      data.write(quantity + " " + time.strftime("%H:%M:%S") + " " + time.strftime("%d/%m/%y") + '\n')
      data.flush()
except (KeyboardInterrupt, SystemExit):
  data.close()
  quit()
  
