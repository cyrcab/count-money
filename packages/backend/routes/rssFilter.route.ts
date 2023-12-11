// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {addRssFilter, getRssFilterController, getRssFiltersController } from "../controllers/rss_filter/rssFilter.controller";
import { verifyAdmin, verifyUser } from "../middleware/token.middleware";

router.post('/',verifyAdmin, addRssFilter)
router.get('/:id',verifyAdmin, getRssFilterController)
router.get('/',verifyUser, getRssFiltersController)


export default router