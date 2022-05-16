export  type CreatePostDefaultValue = {
        matric: string,
        course: string,
        course_code: string,
        lecturer: string,
        session_month: string,
        session_year: string,
        missed_mark: number,
        details: string,
    }  
export type viewPostDefaultValue = {
        _id: string,
        username: string,
        matric: string,
        course: string,
        course_code: string,
        lecturer: string,
        session_month: string,
        session_year: string,
        missed_mark: number,
        details: string,
        date: string
}
export type createUserDefaultValue  = {
    username: string,
    email : string,
    password: string,
    role: string
}
export type createUserDefaultValueMongodb  = {
    username: string,
    email : string,
    date: string,
    role: string
}
export type loginUserDefaultValue = {
    email : string,
    password: string,
}
export type viewUsersDefaultValue = {
         _id: string,
         username: string,
         role: string,
         email: string,
         date: string
}
export type createPostDefaultValue = {
        matric: string,
        course: string,
        course_code: string,
        lecturer: string,
        session_month: string,
        session_year: string,
        missed_mark: number,
        details: string,
        username: string,
        date: string
}