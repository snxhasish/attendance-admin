import { TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { useRouter } from "expo-router";
import getRelativeTime from "@/lib/relative-time";
import { Skeleton, SkeletonText } from "../ui/skeleton";

export default function ClassCard({
    id,
    name,
    students = 0,
    created
}: {
    id: string
    name: string,
    students: number,
    created?: string
}) {
    const router = useRouter();

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
                router.push({
                    pathname: "/class/[id]",
                    params: {
                        id
                    }
                });
            }}
        >
            <Card variant="outline" className="h-fit">
                <Box className="flex flex-row justify-center items-center gap-4">
                    <View className="w-[25%] h-full">
                        <Image
                            source={{ uri: `https://placehold.co/400.png?text=${name.substring(0, 3)}` }}
                            alt="Placeholder"
                            className="flex-1 rounded-lg aspect-square"
                            resizeMode="cover"
                        />
                    </View>

                    <View className="w-[75%] flex flex-col justify-between gap-2">
                        <View>
                            <Text className="text-xl font-semibold text-gray-800">{name}</Text>
                            <Text className="text-gray-600 text-base">{students} Students</Text>
                        </View>

                        <View className="flex-row justify-between items-center">
                            {
                                created ?
                                    <View>
                                        <Text className="text-sm text-gray-500">Created {getRelativeTime(created)}</Text>
                                    </View>
                                    : null
                            }
                        </View>
                    </View>
                </Box>
            </Card>
        </TouchableOpacity>
    )
}

export function ClassCardSkeleton() {
    return (
        <Box>
            <Card variant="outline" className="h-fit">
                <Box className="flex flex-row justify-center items-center gap-4">
                    <Skeleton
                        variant="sharp"
                        className="h-20 w-20"
                    />

                    <View className="w-[75%] flex flex-col justify-between gap-4">
                        <View className="flex flex-col gap-2">
                            <SkeletonText _lines={1} className="h-6" />
                            <SkeletonText _lines={1} className="h-3" />
                        </View>

                        <View className="flex-row justify-between items-center">
                            <SkeletonText _lines={1} className="h-2" />
                        </View>
                    </View>
                </Box>
            </Card>
        </Box>
    )
}