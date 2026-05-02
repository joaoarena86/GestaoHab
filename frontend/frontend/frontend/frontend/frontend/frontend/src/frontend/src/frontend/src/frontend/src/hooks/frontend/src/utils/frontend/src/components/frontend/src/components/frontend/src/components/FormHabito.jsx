import { useState, useEffect } from 'react'

function FormHabito({ onSalvar, onCancelar, habitoEditando }) {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: 'Saúde',
    frequencia: 'diária'
  })

  const categorias = ['Saúde', 'Produtividade', 'Educação', 'Financeiro', 'Bem-estar', 'Outro']
  const frequencias = ['diária', 'semanal', 'mensal']

  useEffect(() => {
    if (habitoEditando) {
      setFormData({
        nome: habitoEditando.nome,
        descricao: habitoEditando.descricao,
        categoria: habitoEditando.categoria,
        frequencia: habitoEditando.frequencia
      })
    }
  }, [habitoEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nome.trim()) {
      alert('Por favor, preencha o nome do hábito')
      return
    }
    onSalvar(formData)
    setFormData({ nome: '', descricao: '', categoria: 'Saúde', frequencia: 'diária' })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {habitoEditando ? 'Editar Hábito' : 'Novo Hábito'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Hábito *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Exercício, Meditação..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva seu hábito..."
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frequência
            </label>
            <select
              name="frequencia"
              value={formData.frequencia}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {frequencias.map(freq => (
                <option key={freq} value={freq}>
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              {habitoEditando ? 'Atualizar' : 'Criar'}
            </button>
            <button
              type="button"
              onClick={onCancelar}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormHabito
