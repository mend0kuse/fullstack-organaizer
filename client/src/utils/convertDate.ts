export const convertDate = (date: Date) => {
    const minutes = date.getMinutes().toString().length == 1 ? `0` + date.getMinutes() : date.getMinutes()
    return `${date.getDate()}.${date.getMonth()}  ${date.getHours()}:${minutes}`
}