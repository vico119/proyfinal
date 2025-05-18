export default function TaskCard({ task, onEdit, onDelete }) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <button onClick={() => onEdit(task)}>Editar</button>
        <button onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    );
  }