import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, } from "@/components/ui/modal";
import { Button, ButtonIcon, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon, AddIcon } from "@/components/ui/icon";
import { Box } from "../ui/box";
import { Input, InputField } from "../ui/input";
import { addStudentToClass, createClass } from "@/lib/class";
import { useState } from "react";
import { getUserToken } from "@/lib/user-token";
import { useRouter } from "expo-router";

export default function AddStudentModal({ classCode, showModal = false, setShowModal }: { classCode: string, showModal: boolean, setShowModal: (c: boolean) => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [studentName, setStudentName] = useState<string>("");
    const [studentEmail, setStudentEmail] = useState<string>("");
    const [studentPhone, setStudentPhone] = useState<string>("");
    const [enrollmentID, setEnrollmentID] = useState<string>("");

    async function handleAddStudent() {
        setLoading(true);

        const token = await getUserToken();
        if (!token) {
            setShowModal(false);
            setLoading(false);
            return;
        }
        if (
            !studentName ||
            studentName.trim() === "" ||
            !studentEmail ||
            studentEmail.trim() === "" ||
            !studentPhone ||
            studentPhone.trim() === "" ||
            !enrollmentID ||
            enrollmentID.trim() === ""
        ) return setLoading(false);

        console.log("Class Code: ", classCode);

        const classData = await addStudentToClass(classCode, [
            {
                name: studentName,
                email: studentEmail,
                phone: studentPhone,
                enrollmentNumber: enrollmentID
            }
        ], token);

        setLoading(false);

        // if (!classData || !classData.classCode) {

        //     setLoading(false);
        //     return;
        // }

        // setShowModal(false);
        // setLoading(false);

        // router.push({
        //     pathname: "/class/[id]",
        //     params: {
        //         id: classData.classCode
        //     }
        // });
    }

    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
                setShowModal(false);
            }}
            size="md"
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="lg">Add Student</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Box className="flex flex-col gap-4">
                        <Box className="flex flex-col">
                            <Text className="font-medium text-lg">Student Name</Text>
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField
                                    placeholder="Student Name"
                                    value={studentName}
                                    onChangeText={setStudentName}
                                />
                            </Input>
                        </Box>

                        <Box className="flex flex-col">
                            <Text className="font-medium text-lg">Student Email</Text>
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField
                                    placeholder="student@institute.edu.in"
                                    value={studentEmail}
                                    onChangeText={setStudentEmail}
                                />
                            </Input>
                        </Box>

                        <Box className="flex flex-col">
                            <Text className="font-medium text-lg">Student Mobile Number</Text>
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField
                                    placeholder="+91 XXXXX XXXXX"
                                    value={studentPhone}
                                    onChangeText={setStudentPhone}
                                />
                            </Input>
                        </Box>

                        <Box className="flex flex-col">
                            <Text className="font-medium text-lg">Student Enrollment Number</Text>
                            <Input
                                variant="outline"
                                size="md"
                            >
                                <InputField
                                    placeholder="XXXX"
                                    value={enrollmentID}
                                    onChangeText={setEnrollmentID}
                                />
                            </Input>
                        </Box>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onPress={() => {
                            handleAddStudent();
                        }}
                        isDisabled={loading}
                    >
                        {loading ? <ButtonSpinner /> : <ButtonIcon as={AddIcon} />}
                        <ButtonText>Add Student to Class</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}