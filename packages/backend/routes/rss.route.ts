// eslint-disable-next-line @typescript-eslint/no-var-requires
const rssrouter = require('express').Router();

import { rssreader} from '../controllers/rss/rss.controller'

rssrouter.get('/', rssreader)

export default rssrouter
