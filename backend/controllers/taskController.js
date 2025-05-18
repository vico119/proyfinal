const { Task, Sequelize } = require('../models');
const { Op } = Sequelize;

const getTasks = async (req, res) => {
  const { status, fromDate, toDate, search } = req.query;

  // Base del filtro: tareas del usuario autenticado
  const where = {
    userId: req.user.id
  };

  // Filtro por estado
  if (status) {
    where.status = status.toLowerCase(); // Asegúrate que los valores coincidan con los de la BD
  }

  // Filtro por rango de fechas (dueDate)
  if (fromDate || toDate) {
    where.dueDate = {};
    if (fromDate) where.dueDate[Op.gte] = new Date(fromDate);
    if (toDate) where.dueDate[Op.lte] = new Date(toDate);
  }

  // Filtro por búsqueda en título o descripción
  const searchFilter = search
    ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      }
    : null;

  try {
    const tasks = await Task.findAll({
      where: searchFilter ? { ...where, ...searchFilter } : where
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error en getTasks:', error);
    res.status(500).json({ message: 'Error al obtener tareas', error });
  }
};

const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'El título es obligatorio.' });
  }

  try {

    console.log('Datos para crear tarea:', { title, description, dueDate, userId: req.user.id });
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      status: 'pendiente',
      //status: status.toLowerCase(),
      userId: req.user.id
    });
    

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error });
  }
 
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, dueDate } = req.body;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    // No permitir editar una tarea completada
    if (task.status === 'completada') {
      return res.status(400).json({ message: 'No se puede modificar una tarea completada.' });
    }

    // Validar cambios de estado
    if (status) {
      if (status === 'en progreso' && task.status !== 'pendiente') {
        return res.status(400).json({ message: 'Solo puedes marcar como "en progreso" si está "pendiente".' });
      }
      if (status === 'pendiente') {
        return res.status(400).json({ message: 'No se puede volver a "pendiente".' });
      }
      if (status === 'completada' && task.status !== 'en progreso') {
        return res.status(400).json({ message: 'Solo puedes completar una tarea si está "en progreso".' });
      }
    }

    // Aplicar cambios válidos
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.dueDate = dueDate ?? task.dueDate;
    task.status = status ?? task.status;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea', error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });

    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    if (task.status !== 'completada') {
      return res.status(400).json({ message: 'Solo puedes eliminar tareas completadas.' });
    }

    await task.destroy();
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea', error });
  }
};
const getTaskById = async (req, res) => {
  
  const { id } = req.params;

  try {
    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.id, // Para que el usuario solo vea sus tareas
      },
    });

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error });
  }
};



module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
};