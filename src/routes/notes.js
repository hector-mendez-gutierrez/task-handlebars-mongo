const { Router } = require("express");
const router = Router();
const {
  renderListarTodas,
  renderNueva,
  renderModificar,
  renderEliminar,
  renderForm,
  renderFormEdit,
} = require("../controllers/notesController");

const { isAuthenticated } = require("../helpers/auth");

router.get("/notes", isAuthenticated, renderListarTodas); // Todas
router.get("/notes/nueva", isAuthenticated, renderForm); // Muestra el formulario para las nueva notas
router.post("/notes/nueva", isAuthenticated, renderNueva); // Crear una nueva nota
router.get("/notes/edit/:id", isAuthenticated, renderFormEdit); //Muestra form para actulizar la Nota
router.put("/notes/edit/:id", isAuthenticated, renderModificar); // Peticiopn http para actualizar
router.delete("/notes/delete/:id", isAuthenticated, renderEliminar); // Elimina una nota!

module.exports = router;
