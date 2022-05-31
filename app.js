/** Imports */
const config = require('./config/config');

const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const moment = require('moment-timezone');

const app = express();

/** Static Files */
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** API Route Paths */
const apiSchedule = require('./api/schedule-db');
const eltlReiting = require('./api/eltl-reiting-db');
const apiCompetition = require('./api/competition');
const apiRegistration = require('./api/registration');
const apiMatch = require('./api/match');
/** Route Paths */
const index = require('./routes/index');
const schedule = require('./routes/schedule');
const competition = require('./routes/competition');
const login = require('./routes/login');
const umpire = require('./routes/umpire');
const trainings = require('./routes/trainings');
const updateReiting = require('./routes/update-reiting');

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
app.use('/api/v1/schedule', apiSchedule);
app.use('/api/v1/eltl-reiting', eltlReiting);
app.use('/api/v1/competition', apiCompetition);
app.use('/api/v1/registration', apiRegistration);
app.use('/api/v1/match', apiMatch);

/** routes */
app.use('/', index);
app.use('/ajakava', schedule);
app.use('/voistlus', competition);
app.use('/kohtunik/', umpire);
app.use('/treeningud', trainings);
app.use('/logisisse', login);
app.use('/reitingu-uuendamine', updateReiting);

/** Server listening @ PORT */
app.listen(config.app.port, () => {
  console.log(`
  *** ${config.app.name} started listening @ http://localhost:${config.app.port} ***
  `);
});
