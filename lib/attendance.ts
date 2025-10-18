import urls from "@/constants/urls";

type AttendanceStatus = "present" | "absent";

export async function markAttendance(
    enrollmentNumber: string,
    classCode: string,
    status: AttendanceStatus,
    token: string
) {
    if (!["present", "absent"].includes(status))
        throw new Error("Invalid status. Must be 'present' or 'absent'.");

    try {
        const res = await fetch(`${urls.API_URL}/attendance/mark`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                enrollmentNumber,
                classCode,
                status,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to mark attendance");
        }

        return {
            success: true,
            message: data.message,
            attendance: data.attendance,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Something went wrong",
        };
    }
}
