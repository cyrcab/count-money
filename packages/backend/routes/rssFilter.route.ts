// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {addRssFilter } from "../controllers/rss_filter/rssFilter.controller";
import { verifyAdmin } from "../middleware/token.middleware";

router.post('/',verifyAdmin, addRssFilter)


export default router