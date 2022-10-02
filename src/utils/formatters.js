export const numberFormatter = new Intl.NumberFormat('ru', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
})

export const currencyFormatter = new Intl.NumberFormat('ru', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})