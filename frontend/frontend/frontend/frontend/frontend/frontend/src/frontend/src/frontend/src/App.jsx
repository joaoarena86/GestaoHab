import { useState } from 'react'
import { useHabitos } from './hooks/useHabitos'
import ListaHabitos from './components/ListaHabitos'
import FormHabito from './components/FormHabito'
import './App.css'

function App() {
  const { habitos, adicionarHabito, deletarHabito, editarHabito, marcarConcluido } = useHabitos()
  const [mostrarForm, setMostrarForm] = useState(false)
  const [habitoEditando, setHabitoEditando] = useState(null)
  const [filtro, setFiltro] = useState('todos')

  const habitosFiltrados = habitos.filter(h => {
    const hoje = new Date().toISOString().split('T')[0]
    if (filtro === 'hoje') {
      return h.concluido.includes(hoje)
    }
    if (filtro === 'pendentes') {
      return !h.concluido.includes(hoje)
    }
    return true
  })

  const handleSalvar = (dados) => {
    if (habitoEditando) {
      editarHabito(habitoEditando.id, dados)
      setHabitoEditando(null)
    } else {
      adicionarHabito(dados)
    }
    setMostrarForm(false)
  }

  const handleCancelar = () => {
    setMostrarForm(false)
    setHabitoEditando(null)
  }

  const handleEditar = (habito) => {
    setHabitoEditando(habito)
    setMostrarForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-indigo-600">🎯 GestãoHab</h1>
          <p className="text-gray-600 mt-1">Gerenciador de Hábitos</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setFiltro('todos')}
              className={`px-4 py-2 rounded-lg font-medium transition ${filtro === 'todos'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-600'
                }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltro('hoje')}
              className={`px-4 py-2 rounded-lg font-medium transition ${filtro === 'hoje'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-600'
                }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setFiltro('pendentes')}
              className={`px-4 py-2 rounded-lg font-medium transition ${filtro === 'pendentes'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-600'
                }`}
            >
              Pendentes
            </button>
          </div>
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            + Novo Hábito
          </button>
        </div>

        {mostrarForm && (
          <FormHabito
            onSalvar={handleSalvar}
            onCancelar={handleCancelar}
            habitoEditando={habitoEditando}
          />
        )}

        {habitosFiltrados.length > 0 ? (
          <ListaHabitos
            habitos={habitosFiltrados}
            onMarcarConcluido={marcarConcluido}
            onEditar={handleEditar}
            onDeletar={deletarHabito}
          />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">Nenhum hábito encontrado</p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Desenvolvido com ❤️ para melhorar seus hábitos</p>
        </div>
      </footer>
    </div>
  )
}

export default App
