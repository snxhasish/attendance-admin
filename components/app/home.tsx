import { useEffect, useState } from "react";
import ClassCard, { ClassCardSkeleton } from "../class/class-card";
import SearchInput from "../SearchInput";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";
import { Class } from "@/types/Class";
import { getUserToken } from "@/lib/user-token";
import { getMyClasses } from "@/lib/class";
import { Fab, FabIcon, FabLabel } from "../ui/fab";
import { AddIcon } from "../ui/icon";
import { Text } from "../Themed";
import { Spinner } from "../ui/spinner";

export default function Home() {
    const [classesLoading, setClassesLoading] = useState(true);
    const [classes, setClasses] = useState<Class[]>([]);
    const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);

    useEffect(() => {
        (async () => {
            const token = await getUserToken();
            if (!token) return setClassesLoading(false);
            const c = await getMyClasses(token);
            setClasses(c);
            setFilteredClasses(c);
            setClassesLoading(false);
        })();
    }, []);

    const searchClass = (q: string) => {
        if (!q) return setFilteredClasses(classes);
        const query = q.toLowerCase().trim();

        const f = classes.filter((c) =>
            c.className.toLowerCase().includes(query) ||
            c.classCode.toLowerCase().includes(query)
        );

        setFilteredClasses(f);
    };


    return (
        <Box className="h-full w-full flex flex-col gap-4 px-4 py-2">
            <SearchInput
                placeholder="Search Classes"
                onChangeText={searchClass}
            />

            <VStack className="w-full h-full gap-4">
                {
                    classesLoading ?
                        <>
                            {[1, 2, 3].map((value) => (
                                <ClassCardSkeleton
                                    key={value}
                                />
                            ))}
                        </>
                        :
                        <>
                            {
                                filteredClasses.length > 0 ?
                                    <>
                                        {
                                            filteredClasses.map((value: Class) => (
                                                <ClassCard
                                                    key={value.classCode}
                                                    id={value.classCode}
                                                    name={value.className}
                                                    students={value.students.length ?? 0}
                                                    created={value.createdAt}
                                                />
                                            ))
                                        }
                                    </>
                                    :
                                    <Text>No classes found</Text>
                            }
                        </>
                }
            </VStack>

            {/* <Fab
                onPress={() => {

                }}
                size="lg"
            >
                <FabIcon as={AddIcon} />
                <FabLabel>Add Class</FabLabel>
            </Fab> */}
        </Box>
    )
}