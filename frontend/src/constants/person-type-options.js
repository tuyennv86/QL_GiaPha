import { PersonType } from '@/enum/person-type.enum'

export const PERSON_TYPE_OPTIONS = [
  {
    label: 'Con trai',
    value: PersonType.SON,
  },

  {
    label: 'Con gái',
    value: PersonType.DAUGHTER,
  },

  {
    label: 'Con dâu',
    value: PersonType.DAUGHTER_IN_LAW,
  },

  {
    label: 'Con rể',
    value: PersonType.SON_IN_LAW,
  },
]
