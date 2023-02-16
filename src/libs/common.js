import dayjs from 'dayjs'

export const defaultDateTime = (value) => (value ? dayjs(value).format() : null)

export const ddmmyyFormat = (value) => (value ? dayjs(value).format('DD-MM-YYYY') : null)

export const yyyymmddFormat = (value) => (value ? dayjs(value).format('YYYY-MM-DD') : null)

export const hhmmFormat = (value) => (value ? dayjs(value).format('HH:mm') : null)
