import { useEffect, useState } from "react";
import { Teacher } from "@/types/Teacher";
import { Text, View } from "../Themed";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { BellIcon } from "../ui/icon";
import { useRouter } from "expo-router";
import { Drawer, DrawerBackdrop, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, } from "@/components/ui/drawer";
import { TouchableOpacity } from "react-native";
import { Box } from "../ui/box";
import { Divider } from "../ui/divider";
import { getAdminProfile } from "@/lib/admin";
import { deleteUserToken, getUserToken } from "@/lib/user-token";
import { useTeacherStore } from "@/store/teacher";


export default function Appbar({ user }: { user?: Teacher }) {
    const router = useRouter();
    const { teacher, setTeacher } = useTeacherStore();
    const [showProfile, setShowProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await getUserToken();
            if (!token) return;
            const t = await getAdminProfile(token);
            setTeacher(t)
        })();
    }, []);

    return (
        <View className="w-full flex flex-row justify-between items-center gap-4 px-4 py-2">
            <TouchableOpacity
                className="flex flex-row items-center"
                activeOpacity={0.5}
                onPress={() => setShowProfile(true)}
            >
                <Avatar
                    size={"sm"}
                >
                    <AvatarImage
                        source={{
                            uri: teacher ? (teacher.avatar ?? "https://placehold.co/400") : "https://placehold.co/400",
                        }}
                    />
                    <AvatarFallbackText>{teacher ? teacher.name : "A"}</AvatarFallbackText>
                </Avatar>
            </TouchableOpacity>

            <Text className="text-2xl font-semibold">Attendance</Text>

            <Button size={"lg"} variant={"link"}
                onPress={() => {
                    // deleteUserToken().then(() => {
                    //     console.log("User token deleted");
                    //     router.push("/login");
                    // }).catch((err) => {
                    //     console.error("Error deleting user token:", err);
                    // });
                    setShowNotifications(true);
                }}
            >
                <ButtonIcon as={BellIcon} />
            </Button>

            <Drawer
                isOpen={showNotifications}
                size="lg"
                anchor="right"
                onClose={() => {
                    setShowNotifications(false);
                }}
            >
                <DrawerBackdrop />
                <DrawerContent>
                    <DrawerHeader className="py-5 flex flex-col gap-4 justify-start items-start">
                        <Text className="text-xl font-semibold">
                            Notifications
                        </Text>
                    </DrawerHeader>
                    <DrawerBody>
                        <Text>No new notifications to display.</Text>
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <Drawer
                isOpen={showProfile}
                size="lg"
                anchor="left"
                onClose={() => {
                    setShowProfile(false);
                }}
            >
                <DrawerBackdrop />
                <DrawerContent>
                    <DrawerHeader className="py-5 flex flex-col gap-4 justify-start items-start">
                        <Avatar
                            size={"md"}
                        >
                            <AvatarImage
                                source={{
                                    uri: teacher ? (teacher.avatar ?? "https://placehold.co/400") : "https://placehold.co/400",
                                }}
                            />
                            <AvatarFallbackText>{teacher ? teacher.name : "A"}</AvatarFallbackText>
                        </Avatar>

                        <Box>
                            <Text className="text-xl font-semibold">
                                {teacher ? teacher.name : "Admin"}
                            </Text>
                            <Text className="text-base">
                                {teacher ? teacher.email : "You need to login to view this page."}
                            </Text>
                        </Box>

                    </DrawerHeader>
                    <Divider className="my-2" />
                    <DrawerBody>
                        <Button>
                            <ButtonText>
                                Edit Teacher Profile
                            </ButtonText>
                        </Button>
                    </DrawerBody>
                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </View>
    )
}