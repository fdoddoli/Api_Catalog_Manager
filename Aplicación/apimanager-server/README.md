# Instalación y ejecución

## Instalación

Instalar nodemon corriendo `npm install --g nodemon` en consola (en caso de no haberlo instalado previamente).\
Instalar dependencias corriendo `npm ci` en consola.\
Entrar a la carpeta `./database`, crear un nuevo archivo con el nombre `dbconfig.js` y copiar el siguiente código:

```
const config = {
  server: 'SERVER_NAME',
  user: 'USER',
  password: 'PASSWORD',
  database: 'api_management_db',
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

module.exports = config;
```

Actualiza los atributos de `server`, `user` y `password` de acuerdo con tu SQL Server.

## Ejecución

Correr el comando `npm start` en consola.\
El servidor se estará corriendo en el puerto 4300.
