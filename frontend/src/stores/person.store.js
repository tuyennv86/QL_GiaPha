import { defineStore } from 'pinia'
import { ref } from 'vue'
import personService from '@/api/services/person.service'
import personTitleService from '@/api/services/person-title.service'


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

  const searchPersons = async (page, limit, gender, generation, is_alive, person_type, familyId, search) => {
    loading.value = true
    error.value = null
    try {
      const response = await personService.search(page, limit, gender, generation, is_alive, person_type, familyId, search)
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

  const createPerson = async (person, imageFile) => {
    loading.value = true
    error.value = null

    try {
      const newPerson = await personService.create(person, imageFile)
      persons.value.push(newPerson)
      total.value++
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const getPersonsByGender = async (gender, generation) => {
    loading.value = true
    error.value = null
    try {
      return await personService.getByGender(gender, generation);
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  const getMarriage = async (id) => {
    loading.value = true
    error.value = null
    try {
      return await personService.getMarriage(id);
    }
    catch (err) {
      error.value = err.message
    }
    finally {
      loading.value = false
    }
  }

  const updatePerson = async (id, person, imageFile) => {
    loading.value = true
    error.value = null

    try {
      const updatedPerson = await personService.update(id, person, imageFile)
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
      const message = await personService.deletePerson(id)
      persons.value = persons.value.filter((p) => p.id !== id)
      total.value--
      return message
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  const deleteMultiplePersons = async (ids) => {
    loading.value = true
    error.value = null

    try {
      const message = await personService.deleteMultiple(ids)
      persons.value = persons.value.filter((p) => !ids.includes(p.id))
      total.value -= ids.length
      return message
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const deleteAvatar = async (id) => {
    loading.value = true
    error.value = null

    try {
      const message = await personService.deleteAvatar(id)
      const index = persons.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        persons.value[index].avatar = null
      }
      return message
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const exportExcel = async (selectedIds) => {
    loading.value = true
    error.value = null

    try {
      const response = await personService.exportExcel(selectedIds)
      // console.log('response', response)
      const url = window.URL.createObjectURL(new Blob([response.data]), {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'thanhvien.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const exportExcelAll = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await personService.exportExcelAll()
      const url = window.URL.createObjectURL(new Blob([response.data]), {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'danhsachthanhvien.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const importFromExcel = async (file) => {
    loading.value = true
    error.value = null

    try {
      const res = await personService.importExcel(file)
      await searchPersons(1, 20, '-1', '0', '-1', '0,','0','') // Tải lại danh sách sau khi nhập thành công
      return res
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // person title service
  const createPersonTitle = async (payload) => {
  loading.value = true;
  error.value = null;

  try {
    const newTitle = await personTitleService.createPersonTitle(payload);

    const person = persons.value.find(p => p.id === newTitle.person_id);

    if (person) {
      person.personTitles.push({
        ...newTitle,
        title_name: newTitle.title?.title_name ?? newTitle.title_name,
      });
    }

    return newTitle;
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    loading.value = false;
  }
};

  const updatePersonTitle = async (id, data) => {
  loading.value = true;
  error.value = null;

  try {
    const updatedTitle = await personTitleService.updatePersonTitle(id, data);
    
    const person = persons.value.find(p => p.id === updatedTitle.person_id);
    if (person) {
      const index = person.personTitles.findIndex(t => t.id === id);
      if (index !== -1) {
        Object.assign(person.personTitles[index], updatedTitle);
      }
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

  const deletePersonTitle = async (id) => {
  loading.value = true;
  error.value = null;

  try {
    const message = await personTitleService.deletePersonTitle(id);

    for (const person of persons.value) {
      const titleIndex = person.personTitles.findIndex(t => t.id === id);

      if (titleIndex !== -1) {
        person.personTitles.splice(titleIndex, 1);
        break;
      }
    }

    return message;
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    loading.value = false;
  }
};

  return {
    persons,
    generations,
    total,
    loading,
    error,

    exportExcel,
    exportExcelAll,
    importFromExcel,

    getAllPersons,
    getPersonById,
    searchPersons,
    getGenerations,
    getPersonsByGender,    
    getMarriage,

    createPerson,
    updatePerson,
    deletePerson,
    deleteMultiplePersons,
    deleteAvatar,

    // person title service
    createPersonTitle,
    updatePersonTitle,
    deletePersonTitle,
  }
})
