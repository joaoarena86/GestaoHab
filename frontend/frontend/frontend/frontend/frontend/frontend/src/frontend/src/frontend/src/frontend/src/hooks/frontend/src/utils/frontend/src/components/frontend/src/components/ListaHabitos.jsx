import CardHabito from './CardHabito'

function ListaHabitos({ habitos, onMarcarConcluido, onEditar, onDeletar }) {
  if (habitos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhum hábito encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {habitos.map(habito => (
        <CardHabito
          key={habito.id}
          habito={habito}
          onMarcarConcluido={onMarcarConcluido}
          onEditar={onEditar}
          onDeletar={onDeletar}
        />
      ))}
    </div>
  )
}

export default ListaHabitos
