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

