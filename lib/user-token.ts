import * as SecureStore from "expo-secure-store";

export async function getUserToken() {
    const token = await SecureStore.getItemAsync("userToken");
    return token;
}

export async function setUserToken(token: string) {
    await SecureStore.setItemAsync("userToken", token);
}

export async function deleteUserToken() {
    await SecureStore.deleteItemAsync("userToken");
}