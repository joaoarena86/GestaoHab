import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'gestao_hab_habitos'

export function useHabitos() {
  const [habitos, setHabitos] = useState([])

  useEffect(() => {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (salvo) {
      try {
        setHabitos(JSON.parse(salvo))
      } catch (erro) {
        console.error('Erro ao carregar hábitos:', erro)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habitos))
  }, [habitos])

  const calcularStreak = (concluido) => {
    if (!concluido.length) return 0
    const hoje = new Date()
    const datas = concluido.map(d => new Date(d)).sort((a, b) => b - a)
    let streak = 0
    let dataAtual = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
    for (const data of datas) {
      const dataFormatada = new Date(data.getFullYear(), data.getMonth(), data.getDate())
      const diffDias = Math.floor((dataAtual - dataFormatada) / (1000 * 60 * 60 * 24))
      if (diffDias === streak) {
        streak++
        dataAtual = new Date(dataFormatada)
      } else {
        break
      }
    }
    return streak
  }

  const adicionarHabito = (dados) => {
    const novoHabito = {
      id: uuidv4(),
      ...dados,
      criadoEm: new Date().toISOString().split('T')[0],
      ultimoConcluido: null,
      concluido: [],
      streak: 0
    }
    setHabitos([...habitos, novoHabito])
  }

  const editarHabito = (id, dados) => {
    setHabitos(
      habitos.map(h =>
        h.id === id ? { ...h, ...dados } : h
      )
    )
  }

  const deletarHabito = (id) => {
    setHabitos(habitos.filter(h => h.id !== id))
  }

  const marcarConcluido = (id) => {
    const hoje = new Date().toISOString().split('T')[0]
    setHabitos(
      habitos.map(h => {
        if (h.id === id) {
          const concluido = h.concluido.includes(hoje)
            ? h.concluido.filter(d => d !== hoje)
            : [...h.concluido, hoje]
          return {
            ...h,
            concluido,
            ultimoConcluido: concluido.length > 0 ? hoje : h.ultimoConcluido,
            streak: calcularStreak(concluido)
          }
        }
        return h
      })
    )
  }

  return {
    habitos,
    adicionarHabito,
    editarHabito,
    deletarHabito,
    marcarConcluido
  }
}
