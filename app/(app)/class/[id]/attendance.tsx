import { ArrowLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { getMyClasses } from "@/lib/class";
import { getUserToken } from "@/lib/user-token";
import { Class } from "@/types/Class";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, PermissionsAndroid, ScrollView } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

const bleManager = new BleManager();

export default function ScanStudents() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [CLASS, setClass] = useState<Class>();
    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState<Device[]>([]);
    const [scanning, setScanning] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

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

    const log = (msg: string) => {
        console.log(msg);
        setLogs((prev) => [msg, ...prev]);
    };

    const requestPermissions = async () => {
        try {
            log("Requesting Bluetooth & Location permissions...");
            const result = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            ]);
            log("Permission results: " + JSON.stringify(result, null, 2));
        } catch (err: any) {
            log("Permission error: " + err.message);
        }
    };

    const addDevice = (device: Device) => {
        if (!device.name && !device.localName) return;
        setDevices((prev) => {
            if (prev.find((d) => d.id === device.id)) return prev;
            return [...prev, device];
        });
        log(`Found device: ${device.name || device.localName} (${device.id})`);
    };

    const scanStudents = async () => {
        log("Starting scan...");
        setDevices([]);
        setScanning(true);
        await requestPermissions();

        try {
            // Check Bluetooth state first
            const state = await bleManager.state();
            log("Bluetooth state: " + state);
            if (state !== "PoweredOn") {
                log("Bluetooth is not powered on — please enable it.");
                setScanning(false);
                return;
            }

            bleManager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    log("Scan error: " + error.message);
                    setScanning(false);
                    return;
                }

                if (device) {
                    log(`Discovered: name=${device.name}, id=${device.id}, localName=${device.localName}`);
                    // match enrollment-style names
                    if (device.name?.startsWith("ENR") || device.localName?.startsWith("ENR")) {
                        addDevice(device);
                    }
                }
            });

            // stop after 10s
            setTimeout(() => {
                bleManager.stopDeviceScan();
                log("Stopped scanning.");
                setScanning(false);
            }, 10000);
        } catch (e: any) {
            log("Unexpected scan error: " + e.message);
            setScanning(false);
        }
    };

    useEffect(() => {
        log("Component mounted — BLE Manager ready.");
        return () => {
            bleManager.stopDeviceScan();
            bleManager.destroy();
            log("Component unmounted — scan stopped and manager destroyed.");
        };
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
                >0
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

        // <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
        //     <TouchableOpacity
        //         onPress={scanStudents}
        //         disabled={scanning}
        //         style={{
        //             backgroundColor: scanning ? "#aaa" : "#007bff",
        //             padding: 12,
        //             borderRadius: 8,
        //             marginBottom: 12,
        //         }}
        //     >
        //         <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>
        //             {scanning ? "Scanning..." : "Scan for Students"}
        //         </Text>
        //     </TouchableOpacity>

        //     <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
        //         Devices Found ({devices.length})
        //     </Text>

        //     <FlatList
        //         data={devices}
        //         keyExtractor={(item) => item.id}
        //         renderItem={({ item }) => (
        //             <View
        //                 style={{
        //                     backgroundColor: "#f4f4f4",
        //                     padding: 12,
        //                     borderRadius: 8,
        //                     marginBottom: 8,
        //                 }}
        //             >
        //                 <Text style={{ fontWeight: "bold" }}>{item.name || item.localName || "Unnamed"}</Text>
        //                 <Text style={{ color: "#666", fontSize: 12 }}>{item.id}</Text>
        //             </View>
        //         )}
        //         ListEmptyComponent={
        //             !scanning ? (
        //                 <Text style={{ textAlign: "center", color: "#666" }}>
        //                     No students found
        //                 </Text>
        //             ) : null
        //         }
        //     />

        //     <Text style={{ fontWeight: "bold", marginTop: 12 }}>Logs:</Text>
        //     <ScrollView
        //         style={{
        //             flex: 1,
        //             marginTop: 4,
        //             borderWidth: 1,
        //             borderColor: "#ddd",
        //             padding: 8,
        //             borderRadius: 8,
        //         }}
        //     >
        //         {logs.map((line, i) => (
        //             <Text key={i} style={{ fontSize: 12, color: "#333", marginBottom: 4 }}>
        //                 {line}
        //             </Text>
        //         ))}
        //     </ScrollView>
        // </View>
    );
}
