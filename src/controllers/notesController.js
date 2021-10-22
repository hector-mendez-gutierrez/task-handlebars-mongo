// Controlador para renderizar las Notas

const Notes = require("../models/Notes");

// Funcion carga el formulario
function renderForm(req, res) {
  //console.log(req.user);
  res.render("notes/nueva");
}

// Funcion que guarda los datos en la base de datos
async function renderNueva(req, res) {
  const { title, description } = req.body;

  const note = new Notes({ title, description });
  note.user = req.user.id;
  await note.save();
  req.flash("success_msg", "Nota Agregada exitosamente");
  res.redirect("/notes");
}
// Listar todas las notas
async function renderListarTodas(req, res) {
  const notes = await Notes.find({ user: req.user.id }).lean(); // Lista las tareas por usuario
  res.render("notes/all", { notes });
}

// Carga el formulario para actualizar
async function renderFormEdit(req, res) {
  const note = await Notes.findById(req.params.id).lean();
  res.render("notes/edit", { note });
}

// Actualiza las notas
async function renderModificar(req, res) {
  const { title, description } = req.body;
  await Notes.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Nota Actulizada exitosamente");
  res.redirect("/notes");
}
async function renderEliminar(req, res) {
  await Notes.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Nota Elimiada exitosamente");
  res.redirect("/notes");
}

module.exports = {
  renderListarTodas,
  renderNueva,
  renderModificar,
  renderEliminar,
  renderForm,
  renderFormEdit,
};
