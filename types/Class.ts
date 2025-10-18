import { Student } from "./Student"

export type Class = {
    teacherId: string
    classCode: string
    className: string
    students: Student[]
    createdAt?: string
}