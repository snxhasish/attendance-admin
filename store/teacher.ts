import { create } from "zustand";
import { Teacher } from "@/types/Teacher";

interface TeacherStore {
    teacher: Teacher;
    setTeacher: (teacher: Teacher) => void;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
    teacher: {} as Teacher,
    setTeacher: (teacher) => set({ teacher }),
}));
