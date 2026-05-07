import dayjs from 'dayjs'

export const formatDateTime = (date, format = 'DD-MM-YYYY HH:mm') => {
  if (!date) return ''

  return dayjs(date).format(format)
}

export const formatDate = (date, format = 'DD-MM-YYYY') => {
  if (!date) return ''

  return dayjs(date).format(format)
}

export const formatYearMonth = (date, format = 'MM-YYYY') => {
  if (!date) return ''

  return dayjs(date).format(format)
}

export const formatYear = (date, format = 'YYYY') => {
  if (!date) return ''

  return dayjs(date).format(format)
}
