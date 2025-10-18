import ClassActionCard from "@/components/class/class-action-card";
import { Text, View } from "@/components/Themed";
import { Button, ButtonIcon } from "@/components/ui/button";
import { ArrowLeftIcon, CalendarDaysIcon, EyeIcon, Icon, MenuIcon, SettingsIcon } from "@/components/ui/icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Class } from "@/types/Class";
import { getUserToken } from "@/lib/user-token";
import { getMyClasses } from "@/lib/class";
import { SkeletonText } from "@/components/ui/skeleton";

export default function ClassIDPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [CLASS, setClass] = useState<Class>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const token = await getUserToken();
            if (!token) return;

            const classes = await getMyClasses(token);
            const cc = classes.find((c) => c.classCode === id);

            if (!cc) return;
            setClass(cc);
            setLoading(false);
        })();
    }, []);


    return (
        <View className="h-full w-full flex flex-col gap-6 p-4">
            <View className="w-full flex flex-row items-center gap-4">
                <Pressable
                    onPress={() => router.push("/")}
                >
                    <Icon
                        as={ArrowLeftIcon}
                        className="w-8 h-8 m-[-2] p-0 text-typography-black"
                    />
                </Pressable>
            </View>

            <View className="w-full flex flex-col gap-2">
                {
                    loading ? 
                        <SkeletonText _lines={1} className="h-6 w-40" />
                        :
                        <Text className="text-2xl font-bold text-gray-800">{CLASS?.className}</Text>
                }
                <Text className="text-gray-600 text-base">{loading ? "Loading" : (CLASS?.students.length ?? 0)} Students</Text>
            </View>

            <View className="flex-row flex-wrap gap-x-4 gap-y-4">
                <View className="w-[48%]">
                    <ClassActionCard
                        icon={CalendarDaysIcon}
                        title="Take Attendance"
                        onPress={() => {
                            router.push({
                                pathname: "/class/[id]/attendance",
                                params: {
                                    id: id as string
                                }
                            })
                        }}
                    />
                </View>
                <View className="w-[48%]">
                    <ClassActionCard
                        icon={MenuIcon}
                        title="View Students"
                        onPress={() => {
                            router.push({
                                pathname: "/class/[id]/students",
                                params: {
                                    id: id as string
                                }
                            })
                        }}
                    />
                </View>
                <View className="w-[48%]">
                    <ClassActionCard
                        icon={EyeIcon}
                        title="View Attendance"
                        onPress={() => {
                            router.push({
                                pathname: "/class/[id]/view",
                                params: {
                                    id: id as string
                                }
                            })
                        }}
                    />
                </View>
                <View className="w-[48%]">
                    <ClassActionCard
                        icon={SettingsIcon}
                        title="Manage Class"
                        onPress={() => {
                            router.push({
                                pathname: "/class/[id]/manage",
                                params: {
                                    id: id as string
                                }
                            })
                        }}
                    />
                </View>
            </View>

        </View>
    )
}