import { TableBooking } from "./TableBooking"

export type Table = {
    id: string,
    capacity: number,
    bookings: TableBooking[]
}