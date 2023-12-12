// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import {addRssFilter, getRssFilterController, getRssFiltersController, updateRssFilterController, deleteRssFilterController, addRssToUserController, getRssFiltersByUserController, deleteRssToUserController } from "../controllers/rss_filter/rssFilter.controller";
import { verifyAdmin, verifyUser, verifyAdminOrMe } from "../middleware/token.middleware";

router.post('/',verifyAdmin, addRssFilter)
router.post('/:id/:idRss',verifyAdminOrMe, addRssToUserController)
router.get('/:id',verifyAdmin, getRssFilterController)
router.get('/',verifyUser, getRssFiltersController)
router.get('/user/:id',verifyAdminOrMe, getRssFiltersByUserController)
router.patch('/:id',verifyAdmin, updateRssFilterController)
router.delete('/:id',verifyAdmin, deleteRssFilterController)
router.delete('/:id/:idRss',verifyAdminOrMe, deleteRssToUserController)


export default router