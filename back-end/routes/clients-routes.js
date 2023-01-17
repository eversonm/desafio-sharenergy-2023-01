const express = require("express");
const { check } = require("express-validator");

const clientsControllers = require("../controllers/clients-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/allClients", clientsControllers.getAllClients);
router.get("/:cid", clientsControllers.getClientById);

router.use(checkAuth);

router.post(
  "/newClient",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("phone").isLength({ min: 12 }),
    check("address").not().isEmpty(),
    check("cpf").isLength({ min: 11 }),
  ],
  clientsControllers.createClient
);

router.put(
  "/:cid",[
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("phone").isLength({ min: 12 }),
    check("address").not().isEmpty(),
    check("cpf").isLength({ min: 11 }),
  ],
  clientsControllers.putClient
);

router.delete("/:cid", clientsControllers.deleteClient);

module.exports = router;
