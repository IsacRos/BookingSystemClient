import { BookingStatus } from "../models/BookingStatus"
export function StatusGetter(status: BookingStatus): string {
    return BookingStatus[status];
}