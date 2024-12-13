import { createForm } from '@formily/core'
import { markRaw } from 'vue-demi'

const createRawForm = (...args: Parameters<typeof createForm>) => {
  const form = createForm(...args)
  return markRaw(form) as ReturnType<typeof createForm>
}

export { createRawForm as createForm }
