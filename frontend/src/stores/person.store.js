import { defineStore } from 'pinia'
import { ref } from 'vue'
import personService from '@/api/services/person.service'

export const usePersonStore = defineStore('person', () => {
  const persons = ref([])
  const total = ref(0)
  const generations = ref([])

  const loading = ref(false)
  const error = ref(null)

  const getAllPersons = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await personService.getAll()
      persons.value = response
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getPersonById = async (id) => {
    loading.value = true
    error.value = null

    try {
      return await personService.getById(id)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const searchPersons = async (page, limit, gender, generation, is_alive, search) => {
    loading.value = true
    error.value = null
    try {
      const response = await personService.search(page, limit, gender, generation, is_alive, search)
      total.value = response.total
      persons.value = response.items
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getGenerations = async () => {
    loading.value = true
    error.value = null

    try {
      generations.value = await personService.generation()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addPerson = async (person) => {
    loading.value = true
    error.value = null

    try {
      const newPerson = await personService.create(person)
      persons.value.push(newPerson)
      // total.value++
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const updatePerson = async (id, person) => {
    loading.value = true
    error.value = null

    try {
      const updatedPerson = await personService.update(id, person)
      const index = persons.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        persons.value[index] = updatedPerson
      }
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deletePerson = async (id) => {
    loading.value = true
    error.value = null

    try {
      const message = await personService.delete(id)
      persons.value = persons.value.filter((p) => p.id !== id)
      return message
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    persons,
    generations,
    total,
    loading,
    error,

    getAllPersons,
    getPersonById,
    searchPersons,
    getGenerations,

    addPerson,
    updatePerson,
    deletePerson,
  }
})
