// composables/useToast.js
import { reactive } from 'vue'

const state = reactive({
  toasts: [],
})

let id = 0

export function useToast() {
  const showToast = ({ title = '', sub = '', type = 'info', duration = 3000 }) => {
    const toast = {
      id: id++,
      title,
      sub,
      type,
      icon: getIcon(type),
    }

    state.toasts.push(toast)

    setTimeout(() => {
      removeToast(toast.id)
    }, duration)
  }

  const removeToast = (toastId) => {
    const index = state.toasts.findIndex((t) => t.id === toastId)
    if (index !== -1) state.toasts.splice(index, 1)
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      default:
        return 'ℹ️'
    }
  }

  return {
    toasts: state.toasts,
    showToast,
  }
}
