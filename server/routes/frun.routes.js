import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createFrun,
  deleteFrun,
  getFrun,
  getFruns,
  getFrunsBySearch,
  getFrunsByTag,
  getFrunsByUser,
  updateFrun,
} from "../controllers/frun.controller.js";

router.get("/search", getFrunsBySearch);
router.get("/tag/:tag", getFrunsByTag);
router.get("/", getFruns);
router.get("/:id", getFrun);

router.post("/", auth, createFrun);
router.delete("/:id", auth, deleteFrun);
router.patch("/:id", auth, updateFrun);
router.get("/userFruns/:id", auth, getFrunsByUser);

export default router;