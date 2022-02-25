/** Imports */
// require('dotenv').config();
const config = require('./config/config');

const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const moment = require('moment-timezone');
const bodyParser = require('body-parser');

const app = express();
/** Static Files */
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** API Route Paths */
const competitionsSchedule = require('./api/competitions-schedule-db');
const competitionsGames = require('./api/competitions-games');

/** Route Paths */
const index = require('./routes/index');
const schedule = require('./routes/schedule');
const competition = require('./routes/competition');
const usersDashboard = require('./routes/users-dashboard');
const results = require('./routes/results');
const trainings = require('./routes/trainings');

/**  Timezone information with Moment to Morgan */
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format();
});

/**  Standard Apache combined log output to logs folder */
morgan.format(
  'commonUTCplus2',
  ':remote-addr - :remote-user [:date[Europe/Tallinn]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

app.use(
  morgan('commonUTCplus2', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {
      flags: 'a',
    }),
  })
);

/** Response status for development use */
app.use(morgan('dev'));

/** Set Views
 * set default template path to 'views' folder *
 * set default engine to "ejs" */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

/** API routes */
app.use('/api/competitions-schedule', competitionsSchedule);
app.use('/api/competitions-games', competitionsGames);

/** Define routes */
app.use('/', index);
app.use('/ajakava', schedule);
app.use('/voistlus', competition);
app.use('/kasutajad/toolaud', usersDashboard);
app.use('/tulemused', results);
app.use('/treeningud', trainings);

/** Server listening @ PORT */
app.listen(config.app.port, () => {
  console.log(`
  *** ${config.app.name} started listening @ http://localhost:${config.app.port} ***
  `);
});
