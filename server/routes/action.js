import express from "express";
import { createAction, getActions } from "../controllers/action.js";
import { ensureAuth } from "../middlewares/authenticated.js";

const router = express.Router();

router.post('/create-action', /*[ensureAuth],*/ createAction);
router.get('/get-actions', getActions);

export default router;