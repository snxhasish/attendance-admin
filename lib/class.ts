import urls from "@/constants/urls";
import { Class } from "@/types/Class";

export type MyClassesResponse = {
    classes: Class[]
}

export type CreateClassResponse = {

}

export async function getMyClasses(token: string) {
    const res: MyClassesResponse = await fetch(`${urls.API_URL}/class/my`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((r) => r.json())
        .catch((e) => console.error("Error getting my classes: ", e));

    console.log("Classes fetched: ", res);

    const classes = res?.classes || [];
    return classes;
}

export async function createClass(className: string, token: string) {
    const res: { class: Class } = await fetch(`${urls.API_URL}/class/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            className
        })
    })
        .then((r) => r.json())
        .catch((e) => console.error("Error while creating a new class: ", e));

    console.log("Class created: ", res);

    return res.class;
}

export async function addStudentToClass(classCode: string, students: { name: string, email: string, phone: string, enrollmentNumber: string }[], token: string) {
    const addStudentRes = await fetch(`${urls.API_URL}/class/${classCode}/add-students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            students
        })
    })
        .then((r) => r.json())
        .catch((e) => console.error("Error while creating student: ", e));

    console.log("New student created: ", addStudentRes);
}