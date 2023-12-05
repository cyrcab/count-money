// eslint-disable-next-line @typescript-eslint/no-var-requires
const rssrouter = require('express').Router();

import { rssreader} from '../controllers/rss.controller'

rssrouter.get('/rss', rssreader)

export default rssrouter
