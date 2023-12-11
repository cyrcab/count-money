// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {addRssFilter, getRssFilterController, getRssFiltersController, updateRssFilterController, deleteRssFilterController } from "../controllers/rss_filter/rssFilter.controller";
import { verifyAdmin, verifyUser } from "../middleware/token.middleware";

router.post('/',verifyAdmin, addRssFilter)
router.get('/:id',verifyAdmin, getRssFilterController)
router.get('/',verifyUser, getRssFiltersController)
router.patch('/:id',verifyAdmin, updateRssFilterController)
router.delete('/:id',verifyAdmin, deleteRssFilterController)


export default router