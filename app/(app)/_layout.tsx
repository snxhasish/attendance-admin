import AddClassModal from "@/components/app/add-class-modal";
import Appbar from "@/components/app/appbar";
import AddStudentModal from "@/components/class/add-student-modal";
import { View } from "@/components/Themed";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";
import { Slot, useLocalSearchParams, usePathname, useSegments } from "expo-router";
import { useState } from "react";

export default function AppLayout() {
    const path = usePathname();
    const parts = path.split("/").filter(Boolean);
    const id = parts.length > 1 ? parts[1] : null;
    const [showAddClassModal, setShowAddClassModal] = useState(false);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);

    const isRoot = path === "/";
    const isClassPage = /^\/class\/[^/]+$/.test(path);

    console.log("ID", id)

    return (
        <View className="h-full w-full flex flex-col justify-between items-center">
            <Appbar />
            <Slot />

            {/* Modals */}
            <AddClassModal
                showModal={showAddClassModal}
                setShowModal={setShowAddClassModal}
            />
            <AddStudentModal
                classCode={id ?? ""}
                showModal={showAddStudentModal}
                setShowModal={setShowAddStudentModal}
            />

            {isRoot && (
                <Fab onPress={() => setShowAddClassModal(true)} size="lg">
                    <FabIcon as={AddIcon} />
                    <FabLabel>Add Class</FabLabel>
                </Fab>
            )}

            {isClassPage && (
                <Fab onPress={() => setShowAddStudentModal(true)} size="lg">
                    <FabIcon as={AddIcon} />
                    <FabLabel>Add Student</FabLabel>
                </Fab>
            )}
        </View>
    )
}