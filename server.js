const express = require('express');
const app = express();
const path = require('path');

// 1. Crear un servidor con Express en el puerto 3000
app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});

// 2. Definir la carpeta “assets” como carpeta pública del servidor y selección al azar
const n = Math.floor(Math.random() * (5 - 1)) + 1;
app.use(express.static(path.join(__dirname + "/assets")));


// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios
const usuarios = ['Harry', 'Hermione', 'Ron', 'Dumbledore', 'Snape'];

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  const usuario = req.params.usuario;
  usuarios.includes(usuario) ? next() : res.redirect("/who.jpeg");
});

app.get('/abracadabra/juego/:usuario', function (req, res) {
  res.sendFile(path.join(__dirname, + "/index.html"));
});

// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria
app.get("/abracadabra/usuarios", function (req, res) {
  res.send({ usuarios });
});

app.get("/abracadabra/conejo/:n", function (req, res) {
  req.params.n == n
    ? res.redirect("/conejito.jpg")
    : res.redirect("/voldemort.jpg");
});

// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor
app.use((req, res) => {
  res.status(404);
  res.send("Esta página no existe");
});
