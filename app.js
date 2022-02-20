/** Imports */
// require('dotenv').config();
const config = require('./config/config');

const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const moment = require('moment-timezone');

const app = express();

/** API Route Paths */
const competitionsSchedule = require('./api/competitions-schedule-db');
// const competitionsScheduleDb = require('./api/competitions-schedule-db');
const competitionsGames = require('./api/competitions-games');
// const programmingLanguagesRouter = require('./api/programmingLanguages');

/** Route Paths */
const index = require('./routes/index');
const schedule = require('./routes/schedule');
const competitionInstructions = require('./routes/competition-instructions');
const competitionAdd = require('./routes/competition-add');
const competitionRegister = require('./routes/competition-register');
const competitionInfo = require('./routes/competition-info');
const competitionPlacement = require('./routes/competition-placement');
const competitionTable = require('./routes/competition-table');
const competitionGames = require('./routes/competition-games');
const competitionResults = require('./routes/competition-results');
const competitionAwards = require('./routes/competition-awards');
const results = require('./routes/results');
const trainings = require('./routes/trainings');

/** Static Files */
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.use(express.urlencoded({ extended: false }));

/** Set Views
 * set default template engine to "pug" */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

/** API routes */
app.use('/api/competitions-schedule', competitionsSchedule);
// app.use('/api/competitions-schedule-db', competitionsScheduleDb);
app.use('/api/competitions-games', competitionsGames);
// app.use('/api/programming-languages', programmingLanguagesRouter);

/** Define routes */
app.use('/', index);
app.use('/ajakava', schedule);
app.use('/voistlusjuhend', competitionInstructions);
app.use('/voistlus/lisa', competitionAdd);
app.use('/voistlus/registreeri', competitionRegister);
app.use('/voistlus/info', competitionInfo);
app.use('/voistlus/paigutus', competitionPlacement);
app.use('/voistlus/tabel', competitionTable);
app.use('/voistlus/mangud', competitionGames);
app.use('/voistlus/tulemused', competitionResults);
app.use('/voistlus/auhinnad', competitionAwards);
app.use('/tulemused', results);
app.use('/treeningud', trainings);

// app.get('/', (req, res) => {
//   res.redirect('/ajakava');
// });

/** Server listening @ PORT */
app.listen(config.app.port, () => {
  console.log(`
  *** ${config.app.name} started listening @ http://localhost:${config.app.port} ***
  `);
});
