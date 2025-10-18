import ClassActionCard from "@/components/class/class-action-card";
import { Text, View } from "@/components/Themed";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
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
import { Input, InputField } from "@/components/ui/input";
import { Divider } from "@/components/ui/divider";

export default function ManageClassPage() {
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
                    onPress={() => router.push({
                        pathname: "/class/[id]",
                        params: {
                            id: id as string
                        }
                    })}
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
                        <Text className="text-2xl font-bold text-gray-800">Manage Class</Text>
                }
                <Text className="text-gray-600 text-base">{CLASS?.className}</Text>
            </View>

            <View className="flex flex-col gap-4">
                <Box className="flex flex-col gap-2">
                    <Text>Class Code</Text>
                    <Input isReadOnly>
                        <InputField
                            value={CLASS?.classCode}
                            readOnly
                        />
                    </Input>
                </Box>

                <Divider className="my-5" />

                <Box className="flex flex-col gap-2">
                    <Text>Class Name</Text>
                    <Input>
                        <InputField
                            value={CLASS?.className}
                        />
                    </Input>
                </Box>

                <Button>
                    <ButtonText>
                        Update Class Name
                    </ButtonText>
                </Button>
            </View>

        </View>
    )
}