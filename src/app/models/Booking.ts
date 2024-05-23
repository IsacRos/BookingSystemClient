import { BookingStatus } from "./BookingStatus"

export type Booking = {
    id: string,
    customerFirstName: string,
    customerLastName: string,
    customerPhone: string,
    customerEmail: string,
    restaurantId: string,
    restaurantName: string,
    tableId: string,
    amountOfPeople: string,
    status: BookingStatus,
    bookingDate: Date
}