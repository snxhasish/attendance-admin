import React, { useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, TouchableOpacity, useColorScheme, Text as DefaultText, ScrollView } from "react-native";
import { Box } from "../ui/box";
import { Card } from "../ui/card";
import { VStack } from "../ui/vstack";
import { Text } from "../Themed";
import { Input, InputField } from "../ui/input";
import { Button, ButtonGroup, ButtonIcon, ButtonSpinner, ButtonText } from "../ui/button";
import { Heading } from "../ui/heading";
import { ImageBackground } from "../ui/image-background";
import { ArrowRightIcon } from "../ui/icon";
import login from "@/lib/login";
import { setUserToken } from "@/lib/user-token";
import { useRouter } from "expo-router";

const { height, width } = Dimensions.get("window");

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const colorScheme = useColorScheme() ?? "light";

    const onLogin = async () => {
        setError(null);

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);

        try {
            const res = await login(email, password);
            if (res.error || !res.token) {
                setError(res.error ?? "Failed to log in.");
            } else {
                setUserToken(res.token);
                router.push("/");
                console.log("Logged in with token:", res.token);
            }
        } catch {
            setError("Login failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const onForgot = () => {
        console.log("forgot password for", email);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
            className="flex flex-col justify-center items-center gap-2 p-5"
        >
            <Heading className="text-3xl">Log In</Heading>

            <Card variant={"ghost"} className="w-full rounded-lg">

                {error && <Text className="text-red-500 text-sm text-center">{error}</Text>}

                <VStack space="md" className="items-center w-full my-4">
                    <Input>
                        <InputField
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="px-3 py-2"
                        />
                    </Input>

                    <Input>
                        <InputField
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            secureTextEntry
                            autoCapitalize="none"
                            className="px-3 py-2"
                        />
                    </Input>

                    <TouchableOpacity onPress={onForgot} className="self-end">
                        <Text className="text-sm mt-1">Forgot password?</Text>
                    </TouchableOpacity>

                    <Button onPress={onLogin} disabled={loading} className="mt-3 rounded-md py-2">
                        {loading ? <ButtonSpinner color={"gray"} /> : null}
                        <ButtonText>Log In</ButtonText>
                        <ButtonIcon as={ArrowRightIcon} />
                    </Button>

                    <Box className="items-center mt-3">
                        <Text className="text-sm">Don&apos;t have an account?</Text>
                        <Text className="font-semibold">Sign up</Text>
                    </Box>
                </VStack>
            </Card>


        </KeyboardAvoidingView>
    );
}
