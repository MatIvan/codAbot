//@ts-check
import cors from 'cors';
import express from 'express';

import { restErrorHandler } from './rest/RestError.js';

import TokenFilter from './rest/filter/TokenFilter.js';
import UserFilter from './rest/filter/UserFilter.js';
import { loggerFilter } from './rest/filter/loggerFilter.mjs';

import adminRouter from './rest/routers/adminRouter.mjs';
import gameRouter from './rest/routers/gameRouter.mjs';
import userRouter from './rest/routers/UserRouter.js';
import apiRouter from './rest/routers/apiRouter.mjs';

import Logger from './libs/log.js';
const log = Logger.getLogger('SERVER');

var app = express();
app.use(cors());
app.use(express.json());

app.use(loggerFilter, TokenFilter.parseAuthUser);
app.use('/', express.static(process.cwd() + '/web-pages/main'));

app.use('/api', apiRouter);

app.use('/game*', UserFilter.needRoleUserOrAdmin);
app.use('/game/api', gameRouter);

app.use('/admin*', UserFilter.needRoleAdmin);
app.use('/admin/api', adminRouter);

app.use('/users*', UserFilter.needActiveUser);
app.use('/users', userRouter);

app.use(restErrorHandler);

const port = 1337;
app.listen(port, function () {
    log.info('Server start on port', port);
});
