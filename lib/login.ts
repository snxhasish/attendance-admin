import urls from "@/constants/urls";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LoginResponse = {
    message: string
    token: string
}

export default async function login(email: string, password: string) {
    if (!email || !password) return { error: "Email and password are required." };
    if (!emailRegex.test(email)) return { error: "Invalid email." };

    const res = await fetch(`${urls.API_URL}/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return { error: "Login failed. Try again." };
    
    const data: LoginResponse = await res.json();
    return data.token ? { token: data.token } : { error: "Login failed. Try again." };
}