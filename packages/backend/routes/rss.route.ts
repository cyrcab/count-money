// eslint-disable-next-line @typescript-eslint/no-var-requires
const rssrouter = require('express').Router();

import { rssreader} from '../controllers/rss/rss.controller'

rssrouter.get('/', rssreader)
rssrouter.get('/:id', rssreader)

export default rssrouter
