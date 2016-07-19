#Agenda con PhoneGap

a continuacion les mostrare como desarrollar una aplicacion con la herramienta de [PhoneGap](http://phonegap.com/),para ello tenemos que tener instaladas las siguientes herramientas:

 - Oracle Java JDK 8
 - Android SDK
 - Apache ANT
 - NodeJS
 - Cordova o Phonegap
 - Ripple Emulator
 - Un editor de código a tu elección

##instalacion de Oracle Java JDK 8

Para instalar las herramientas de desarrollo de Java de Oracle tendremos dos opciones de instalación: instalación a mano o por repositorios.

Si quisiéramos instalar las herramientas de desarrollo a mano, iríamos a la página de Oracle para descargar el archivo de instalación. Una vez descargado, deberíamos descomprimir el fichero y proceder a ejecutar el script de instalación.

La manera más eficiente de instalar el JDK es mediante repositorios, por lo que será el método que utilizaremos en este tutorial para instalarlos. El repositorio que nos permitirá realizar dicha acción es el de WebUpd8, uno de los repositorios más conocido por los usuarios de Ubuntu.

Para realizar las instalación lo primero que haremos será añadir el repositorio de WebUpd8 a nuestra lista de repositorios disponibles:

```
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update $ sudo apt-get install oracle-java8-installer
java -version $ javac -version

```

##Descargar e instalar Android SDK

El siguiente paso será descargar e instalar las herramientas del SDK de Android. Para ello lo descargaremos desde la dirección:

[Download Android SDK](http://developer.android.com/sdk/)

Nota: es importante agregar la ruta del SDK al PATH del usuario, para que pueda ejecutar las herramientas del SDK desde la consola. Tendremos que editar el archivo .bashrc del usuario con nuestro editor de texto favorito:


```
$ gedit .bashrc
     o
$ vi .bashrc
```
Añadiremos las siguientes líneas al final del fichero (ojo, fuera de los bloques IF, y cambiar USER por el nombre del usuario):

```
 export ANDROID_HOME="/home/USER/android-sdk-linux/tools"
 export ANDROID_PLATFORM_TOOLS="/home/USER/android-sdk-linux/platform-tools"
 export PATH="$PATH:$ANDROID_HOME:$ANDROID_PLATFORM_TOOLS"
```
por ultimo ejecutamos el comando 


```
 $ android
```

##Instalar Apache ANT
La siguiente herramienta a instalar es Apache ANT, que permite automatizar el proceso de compilación con Java. Es una herramienta que Phonegap necesita a la hora de compilar las aplicaciones para Android, ya que permite ejecutar scripts para generar los archivos .APK instalables en los dispositivos.

Para instalarlo, vamos a hacer uso del repositorio de Ubuntu:

```
 $ sudo apt-get install ant
```
##Instalar NodeJS

Vamos a instalar NodeJS directamente desde el repositorio, ya que el desfase de versiones con respecto al que tenemos para descargar desde su página web no es demasiado grande. (v10.33 vs 10.35) Además instalaremos NPM, el gestor de paquetes de NodeJS, que nos permitirá instalar aplicaciones para NodeJS desde su repositorio. Procederemos con el comando:


```
$ sudo apt-get install nodejs npm
```

Antes de pasar al siguiente punto, es necesario crear un enlace simbólico al fichero binario de NodeJS, ya que el instalador de Ubuntu lo nombra como nodejs, para evitar ambigüedad con otra aplicación del repositorio que se llama node. El problema es que el resto de aplicaciones esperan encontrar dicha aplicación con el nombre node, por lo que debemos ejecutar el siguiente comando:


```
$ sudo ln -s /usr/bin/nodejs /usr/bin/node
```

Realizando dicha operación, debería funcionar sin ningún problema al invocar mediante la consola a NodeJS mediante node

##Instalar Cordova o Phonegap

En este paso vamos a instalar Phonegap/Cordova, y para ello vamos a hacer uso de NPM, que es el gestor instalación de paquetes desde el repositorio de NodeJS. El comando a ejecutar será:


```
$ sudo npm install -g phonegap
o
$ sudo npm install -g cordova
```

##Instalar Ripple Emulator

Nos faltaría por instalar el emulador que nos va a permitir hacer debug de nuestra aplicación sobre un navegador sin necesidad de compilar la aplicación e instalarla en un emulador o un dispositivo. El emulador Ripple también está disponible como paquete de instalación de NodeJS, por lo que la instalación la haremos de la misma manera que hemos instalado Cordova:


```
$ sudo npm install -g ripple-emulator
```

##Instalar un editor de código a tu elección

En este último paso vamos a instalar cualquier editor de código que nos permita editar ficheros HTML, CSS y Javascript, ya que la compilación de las aplicaciones se van a realizar mediante comando en la terminal (CLI). La recomendación será utilizar Sublime Text o Brackets, pero ésto ya lo veremos en próximos artículos

 [Vim](http://www.vim.org/)
 [Sublime text](https://www.sublimetext.com/)
 [Nano](https://www.nano-editor.org/)
 [CoffeCup Free Editor](http://www.coffeecup.com/free-editor/)
 [Kompozer](http://www.kompozer.net/)

estos son algunos editores de codigo que recomiendo pero pueden utilizar el que sea mas de su agrado :)

##Creación de un proyecto base Phonegap


```
$ cordova create MiProyecto com.pruebas.miproyecto MiProyecto
```
##Material adicional

en lo particular yo realice la compilacion y pruebas de mi aplicacion en adroid con la ayuda de una app del Google Play la cual les muestro en la imagen.

![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img1.png)

Link de descarga: 

[Download PhoneGap Google Play](https://play.google.com/store/apps/details?id=com.adobe.phonegap.app&hl=es)

##Capturas de pantalla

![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img2.png)
![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img3.png)
![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img4.png)
![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img5.png)
![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img6.png)
![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img7.png)
![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img8.png)
![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img9.png)
![alt tag](https://github.com/fercho0/agendaPhoneGap/blob/master/www/img/img10.png)

#espero y les sea de ayuda :)








