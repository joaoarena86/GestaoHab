export const formatarData = (data) => {
  if (!data) return ''
  const d = new Date(data + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

export const formatarDataCurta = (data) => {
  if (!data) return ''
  const d = new Date(data + 'T00:00:00')
  return d.toLocaleDateString('pt-BR')
}

export const calcularDiasPassados = (data) => {
  if (!data) return 0
  const hoje = new Date()
  const dataPassada = new Date(data + 'T00:00:00')
  const diffTime = hoje - dataPassada
  const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDias
}

export const obterDataRelativa = (data) => {
  const dias = calcularDiasPassados(data)
  if (dias === 0) return 'Hoje'
  if (dias === 1) return 'Ontem'
  if (dias < 7) return `${dias} dias atrás`
  if (dias < 30) return `${Math.floor(dias / 7)} semanas atrás`
  return `${Math.floor(dias / 30)} meses atrás`
}
