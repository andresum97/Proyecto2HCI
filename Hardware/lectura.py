import time

archivo = open("prueba.txt", "r")

while True:
    time.sleep(5)
    archivo = open("prueba.txt", "r")
    for linea in archivo.readlines():
        print(linea)
