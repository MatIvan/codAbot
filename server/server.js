//@ts-check
import cors from 'cors';
import express from 'express';
import { gameFilter, adminFilter, authFilter } from './rest/filter/tokenFilter.mjs';
import { loggerFilter } from './rest/filter/loggerFilter.mjs';

import adminRouter from './rest/routers/adminRouter.mjs';
import gameRouter from './rest/routers/gameRouter.mjs';
import apiRouter from './rest/routers/apiRouter.mjs';

import { getLogger } from './libs/log.mjs';
const log = getLogger('SERVER');

var app = express();
app.use(cors());
app.use(express.json());

app.use(loggerFilter);
app.use('/', express.static(process.cwd() + '/web-pages/main'));

app.use('/api/*', authFilter);
app.use('/api', apiRouter);

app.use('/game/*', gameFilter);
app.use('/game', express.static(process.cwd() + '/web-pages/game'));
app.use('/game/api', gameRouter);

app.use('/admin/*', adminFilter);
app.use('/admin', express.static(process.cwd() + '/web-pages/admin'));
app.use('/admin/api', adminRouter);

const port = 1337;
app.listen(port, function () {
    log.info('Server start on port', port);
});
