import { ref } from 'vue'

const confirmDialog = ref(null)

export function useConfirm() {
  const showConfirm = ({ title, desc, icon = '⚠️', btn = 'Xác nhận' }) => {
    return new Promise((resolve) => {
      confirmDialog.value = {
        title,
        desc,
        icon,
        btn,
        action: () => resolve(true),
        cancel: () => resolve(false),
      }
    })
  }

  return {
    confirmDialog,
    showConfirm,
  }
}
