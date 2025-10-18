import { Text } from "../Themed";
import { FontAwesome6 } from "@expo/vector-icons";
import { Card } from "../ui/card";
import { TouchableOpacity } from "react-native";
import { IIconComponentType } from "@gluestack-ui/core/lib/esm/icon/creator/createIcon";
import { SvgProps } from "react-native-svg";
import { AddIcon, Icon } from "../ui/icon";

export default function ClassActionCard({
    icon = AddIcon,
    title = "Take Attendance",
    onPress = () => { }
}: {
        icon?: IIconComponentType<SvgProps>,
    title?: string,
    onPress?: () => void
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            className="w-full"
            onPress={onPress}
        >
            <Card variant={"outline"} className="flex flex-col justify-center items-center gap-4 rounded p-6">
                <Icon
                    as={icon}
                    className="h-8 w-8 text-typography-black"
                />
                <Text className="text-lg font-medium line-clamp-1">{title}</Text>
            </Card>
        </TouchableOpacity>
    )
}