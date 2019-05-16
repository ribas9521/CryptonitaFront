export const formatTime = time => time.toLocaleTimeString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })

export const format2Digits = value => value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const format8Digits = value => value.toLocaleString(undefined, { minimumFractionDigits: 8, maximumFractionDigits: 8 })

export const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object