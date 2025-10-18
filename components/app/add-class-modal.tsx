import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, } from "@/components/ui/modal";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Icon, CloseIcon, AddIcon } from "@/components/ui/icon";
import { Box } from "../ui/box";
import { Input, InputField } from "../ui/input";
import { createClass } from "@/lib/class";
import { useState } from "react";
import { getUserToken } from "@/lib/user-token";
import { useRouter } from "expo-router";

export default function AddClassModal({ showModal = false, setShowModal }: { showModal: boolean, setShowModal: (c: boolean) => void }) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [className, setClassName] = useState<string>("");

    async function handleClassCreate() {
        setLoading(true);

        const token = await getUserToken();
        if (!token) {
            setShowModal(false);
            setLoading(false);
            return;
        }
        if (!className || className.trim() === "") return setLoading(false);

        const classData = await createClass(className, token);
        if (!classData || !classData.classCode) {
            
            setLoading(false);
            return;
        }

        setShowModal(false);
        setLoading(false);

        router.push({
            pathname: "/class/[id]",
            params: {
                id: classData.classCode
            }
        });
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
                    <Heading size="lg">Add Classroom</Heading>
                    <ModalCloseButton>
                        <Icon as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <Box className="flex flex-col gap-2">
                        <Text className="font-medium text-lg">Class Name</Text>
                        <Input
                            variant="outline"
                            size="md"
                        >
                            <InputField
                                placeholder="B.Tech CSE (IoT, CS & BT) ..."
                                value={className}
                                onChangeText={setClassName}
                            />
                        </Input>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onPress={() => {
                            handleClassCreate();
                        }}
                    >
                        <ButtonIcon as={AddIcon} />
                        <ButtonText>Create Class</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}