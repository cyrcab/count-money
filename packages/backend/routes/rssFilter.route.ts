// eslint-disable-next-line @typescript-eslint/no-var-requires
const router = require('express').Router()

import { cookieMiddleware } from "../middleware/cookie.middleware";
import {addRssFilter, getRssFilterController, getRssFiltersController, updateRssFilterController, deleteRssFilterController, addRssToUserController, getRssFiltersByUserController, deleteRssToUserController } from "../controllers/rss_filter/rssFilter.controller";
import { roleGuardMiddleware } from "../middleware/roleGuard.middleware";
import { RoleName } from "../entities/Roles";

router.post('/',[cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN])], addRssFilter)
router.post('/:id/:idRss',[cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN, RoleName.USER])], addRssToUserController)
router.get('/:id',[cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN])], getRssFilterController)
router.get('/',[cookieMiddleware], getRssFiltersController)
router.get('/user/:id',[cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN, RoleName.USER])], getRssFiltersByUserController)
router.patch('/:id',[cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN])], updateRssFilterController)
router.delete('/:id',[cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN])], deleteRssFilterController)
router.delete('/:id/:idRss',[cookieMiddleware, roleGuardMiddleware([RoleName.ADMIN, RoleName.USER])], deleteRssToUserController)


export default router