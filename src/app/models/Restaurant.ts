export interface Restaurant {
    id: string;
    name: string;
    address: {
        line1: string;
        line2: string;
        line3: string;
        postalCode: string;
        city: string;
        country: string;
    };
    phoneNumber: string;
    amountOfTables: number;
    totalCapacity: number;
}