// Controlador para la gestion de usuarios
const passport = require("passport");

const User = require("../models/User");

//Renderisa el formulario de Registro
function renderFormSignUp(req, res) {
  res.render("users/signup");
}

const userCtrl = {};

//Registra un nuevo usuario en la BD
async function renderSignUp(req, res) {
  const errors = [];
  const success = [];
  const { name, email, password, confirm_password } = req.body;
  // validaciones
  if (password != confirm_password) {
    errors.push({ text: "Contraseñas no coinciden" });
  }
  if (password.length < 6) {
    errors.push({ text: "La contraseña debe tener al menos 6 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const user = await User.findOne({ email });
    if (user) {
      errors.push({ text: "El Correo ya esta en uso" });
      res.render("users/signup");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Registro exitoso :)");
      res.render("users/signin");
    }
  }
}

//Renderisa el formulario de Login
function renderFormSignIn(req, res) {
  res.render("users/signin");
}

//Realiza query a la BD
userCtrl.SignIn = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/notes",
  failureFlash: true,
});

function logout(req, res) {
  req.logout();
  req.flash("success_msg", "Sesión cerrada correctamente");
  res.redirect("/users/signin");
}

module.exports = {
  renderFormSignUp,
  renderSignUp,
  renderFormSignIn,
  logout,
  userCtrl,
};
