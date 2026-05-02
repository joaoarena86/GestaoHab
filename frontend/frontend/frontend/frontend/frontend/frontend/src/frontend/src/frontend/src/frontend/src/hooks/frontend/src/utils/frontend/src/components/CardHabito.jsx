import { formatarDataCurta, obterDataRelativa } from '../utils/formatacao'

function CardHabito({ habito, onMarcarConcluido, onEditar, onDeletar }) {
  const hoje = new Date().toISOString().split('T')[0]
  const concluidoHoje = habito.concluido.includes(hoje)

  const cores = {
    'Saúde': 'bg-green-100 border-green-300',
    'Produtividade': 'bg-blue-100 border-blue-300',
    'Educação': 'bg-purple-100 border-purple-300',
    'Financeiro': 'bg-yellow-100 border-yellow-300',
    'Bem-estar': 'bg-pink-100 border-pink-300',
  }

  const corCategoria = cores[habito.categoria] || 'bg-gray-100 border-gray-300'

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 border-indigo-600 hover:shadow-lg transition overflow-hidden`}>
      <div className={`p-4 ${corCategoria} border-b`}>
        <h3 className="text-lg font-bold text-gray-800">{habito.nome}</h3>
        <p className="text-sm text-gray-600 mt-1">{habito.categoria}</p>
      </div>

      <div className="p-4">
        {habito.descricao && (
          <p className="text-gray-700 text-sm mb-3">{habito.descricao}</p>
        )}

        <div className="flex items-center justify-between mb-4 p-3 bg-indigo-50 rounded-lg">
          <span className="text-gray-700 font-medium">Sequência</span>
          <span className="text-2xl font-bold text-indigo-600">🔥 {habito.streak}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="text-gray-600">
            <span className="font-medium">Frequência:</span> {habito.frequencia}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Criado:</span> {formatarDataCurta(habito.criadoEm)}
          </div>
          {habito.ultimoConcluido && (
            <div className="col-span-2 text-gray-600">
              <span className="font-medium">Último:</span> {obterDataRelativa(habito.ultimoConcluido)}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onMarcarConcluido(habito.id)}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${concluidoHoje
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
            {concluidoHoje ? '✅ Concluído' : 'Marcar'}
          </button>
          <button
            onClick={() => onEditar(habito)}
            className="px-3 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            ✏️
          </button>
          <button
            onClick={() => onDeletar(habito.id)}
            className="px-3 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 transition"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardHabito
