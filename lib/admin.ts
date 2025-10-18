import urls from "@/constants/urls";
import { Teacher } from "@/types/Teacher";

export const getAdminProfile = async (token: string) => {
    const res = await fetch(`${urls.API_URL}/admin/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then((r) => r.json())
        .catch((err) => {
            console.error("Error fetching admin profile:", err);
        });

    console.log("getAdminProfile: ", res);
    const teacher: Teacher = res.teacher

    return teacher;
}