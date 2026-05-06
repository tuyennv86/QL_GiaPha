import { useAuthStore } from '@/stores/auth.store'

export default {
  mounted(el, binding) {
    const auth = useAuthStore()
    const perm = binding.value

    if (!auth.permissions.includes(perm)) {
      el.parentNode?.removeChild(el)
    }
  },
}

{
  /* <button v-permission="'ORDER_DELETE'">
  Xoá
</button> */
}
