import { Router } from "express";

import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser
} from "../controllers/users.controller.js";

//middleware para la  de los usuarios
import { checkJwt } from "../middlewares/admin.middleware.js";
import { checkRole } from "../middlewares/role.middleware.js";

const router = Router();

// Ruta para crear un nuevo administrador
router.post("/create", createUser);


router.get("/users", [checkJwt, checkRole(['admin'])], getAllUsers);

router.put("/users/updateUser/:id", [checkJwt, checkRole(['admin'])], updateUser);

// Ruta para eliminar un administrador por su ID
router.delete("/users/delete/:id", [checkJwt, checkRole(['admin'])], deleteUser);

export default router;
