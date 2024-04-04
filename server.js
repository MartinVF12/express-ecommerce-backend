const express = require('express');
const routes = require('./routes');
// Importar la conexión sequelize
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sincronizar los modelos de sequelize con la base de datos y luego encender el servidor
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
