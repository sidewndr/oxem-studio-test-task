export const getClassName = (obj) => {
  const array = []

  for (const prop in obj) {
    if (Boolean(obj[prop])) {
      array.push(prop)
    }
  }

  return array.join(' ')
}