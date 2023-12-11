// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {addRssFilter, getRssFilterController } from "../controllers/rss_filter/rssFilter.controller";
import { verifyAdmin } from "../middleware/token.middleware";

router.post('/',verifyAdmin, addRssFilter)
router.get('/:id',verifyAdmin, getRssFilterController)


export default router