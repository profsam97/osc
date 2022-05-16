export const  getDate =  new Date().toLocaleString('default', {month: 'short', year: 'numeric', day: '2-digit'})

export default getDate;