export type Student = {
    email: string;
    phone: string;
    enrollmentNumber: string;
    bluetoothId?: string;
    name?: string;
    oneTimeCode?: string;
    oneTimeCodeExpiry?: Date;
    isVerified: boolean;
    addedBy?: string;
}