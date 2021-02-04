import { Router } from "https://deno.land/x/oak/mod.ts";

import UserController from '../controllers/user.ts'

const user = new UserController()

const router = new Router()

router.get('/user/list', user.getList)

router.post('/user/register', user.register)

router.patch('/user/update', user.update)

router.delete('/user/delete', user.delete)

export default router