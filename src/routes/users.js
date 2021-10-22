const { Router } = require("express");
const router = Router();

const {
  renderFormSignUp,
  renderSignUp,
  renderFormSignIn,
  logout,
  userCtrl,
} = require("../controllers/usersController");

router.get("/users/signup", renderFormSignUp); // Renderiza el formulario
router.post("/users/signup", renderSignUp); // Peticion http
router.get("/users/signin", renderFormSignIn); // Renderiza el formulario
router.post("/users/signin", userCtrl.SignIn); // Petecion http
router.get("/users/logout", logout);

module.exports = router;
