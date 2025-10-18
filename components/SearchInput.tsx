import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";

export default function SearchInput({
    placeholder = "Search...",
    onChangeText
}: {
    placeholder?: string;
    onChangeText?: (text: string) => void;
}) {
    return (
        <Input size="sm" className="w-full">
            <InputSlot className="pl-3">
                <InputIcon as={SearchIcon} />
            </InputSlot>
            <InputField
                placeholder={placeholder}
                onChangeText={onChangeText}
            />
        </Input>
    );
}
