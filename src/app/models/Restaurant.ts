export interface Restaurant {
    id: string;
    name: string;
    address: {
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
        postalCode: string;
        city: string;
        country: string;
    };
    phoneNumber: string;
    amountOfTables: number;
    totalCapacity: number;
}