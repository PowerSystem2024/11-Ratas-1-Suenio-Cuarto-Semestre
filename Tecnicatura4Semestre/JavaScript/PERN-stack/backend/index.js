import app from "./app.js";
import {pool} from "./db.js";
import { PORT } from "./config.js"; 

pool.query('SELECT NOW()', (err, res) => {
  app.listen(PORT);
  console.log('server en puerto ', PORT);
});

