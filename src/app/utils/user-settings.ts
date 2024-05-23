export class UserSettings {
    openingTime = new Date();
    closingTime = new Date();
    intervalMinutes = 30;
    bookedMinutes = 120;
    maxAmountOfPeople = 14;
    startTimeMargin = 4;

    constructor() {
        this.openingTime.setHours(8, 0, 0);
        this.closingTime.setHours(20, 0, 0);
    }

    getMaxPeople(): number[] {
        const array: number[] = [];
        for (let i = 1; i <= this.maxAmountOfPeople; i++){
            array.push(i);
        }
        return array;
    }

}