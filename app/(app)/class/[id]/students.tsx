import ClassActionCard from "@/components/class/class-action-card";
import { Text, View } from "@/components/Themed";
import { Button, ButtonIcon } from "@/components/ui/button";
import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Class } from "@/types/Class";
import { getUserToken } from "@/lib/user-token";
import { getMyClasses } from "@/lib/class";
import { SkeletonText } from "@/components/ui/skeleton";
import { Box } from "@/components/ui/box";

export default function ClassStudentsPage() {
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
                    <FontAwesome6
                        name="arrow-left"
                        size={22}
                        className="text-gray-400"
                    />
                </Pressable>
            </View>

            <View className="w-full flex flex-col gap-2">
                <Text className="text-2xl font-bold text-gray-800">Students</Text>
                <Text className="text-gray-600 text-base">{loading ? "Loading" : (CLASS?.className)}</Text>
            </View>

            <Box className="flex flex-col gap-2">

            </Box>

        </View>
    )
}