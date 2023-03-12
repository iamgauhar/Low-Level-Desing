enum VehicleType {
    CAR = "CAR",
    BIKE = "BIKE",
    TRUCK = "TRUCK"
}

class Vehicle {
    licenceNumber: string;
    type: VehicleType;
    person: Person;
    constructor(licenceNumber: string, type: VehicleType, person: Person) {
        this.licenceNumber = licenceNumber;
        this.type = type;
        this.person = person
    }

    get vehicleType() {
        return this.type
    }
}

enum priceByVehicle {
    CAR = 100,
    TRUCK = 200,
    BIKE = 50,
}

class Slot {
    id: number;
    type: VehicleType;
    price: priceByVehicle;
    occupied: boolean;
    occupideVehicleTkt: Ticket | null

    constructor(id: number, type: VehicleType) {
        this.id = id;
        this.type = type;
        this.occupied = false;
        this.price = type === VehicleType.CAR ? priceByVehicle.CAR
            : type === VehicleType.BIKE ? priceByVehicle.BIKE
                : priceByVehicle.TRUCK;

        this.occupideVehicleTkt = null
    }

    assignVehicleTicket(ticket: Ticket) {
        this.occupied = true;
        this.occupideVehicleTkt = ticket
    }

    removeVehicleTicket() {

    }

    get isoccupide() {
        return this.occupied
    }

}

enum paymentType {
    CARD,
    CASH
}

class Transaction {

}

class Ticket {
    id: number;
    vehicleInfo: Vehicle;
    startTime: string
    endTime: string | null
    paid: boolean
    paymentType: paymentType | null

    constructor(vehicle: Vehicle, id: number) {
        this.id = id;
        this.vehicleInfo = vehicle;
        this.startTime = new Date().toLocaleDateString();
        this.endTime = null;
        this.paid = false;
        this.paymentType = null
    }

    calculateTotalCost() {
        const type = this.vehicleInfo.type
        const costForType = type === VehicleType.CAR ? priceByVehicle.CAR
            : type === VehicleType.BIKE ? priceByVehicle.BIKE
                : priceByVehicle.TRUCK;
        this.endTime = new Date().toLocaleTimeString()
        const totalCost = costForType * this.calculateTime()
        return totalCost
    }

    calculateTime() {
        if (!this.endTime) return 0
        const sT = new Date(this.startTime).valueOf()
        const eT = new Date(this.endTime).valueOf()
        let time = eT - sT

        time = Math.ceil(time / (1000 * 60 * 60))
        return time
    }

    pay(method: paymentType) {
        this.paid = true;
        this.paymentType = method;
    }

    get paid() {
        return this.paid
    }

}
class Person {
    name: string;
    phone: string;
    constructor(name: string, phone: string) {
        this.name = name
        this.phone = phone
    }
}

class ParkingLot {
    slots: Slot[]
    tickets: Ticket[]
    constructor({ car, bike, truck }: { car: number, bike: number, truck: number }) {
        this.slots = this.initialiseSlots(car, bike, truck);
        this.tickets = [];


    }

    initialiseSlots(car: number, bike: number, truck: number) {
        let slots: Slot[] = [];
        for (let i = 0; i < car; i++) {
            slots.push(new Slot(i, VehicleType.CAR))
        }
        for (let i = 0; i < bike; i++) {
            slots.push(new Slot(i + car, VehicleType.BIKE))
        }
        for (let i = 0; i < truck; i++) {
            slots.push(new Slot(i + car + truck, VehicleType.TRUCK))
        }
        return slots;
    }

    get allSlots() {
        return this.slots;
    }

    isSlotAvailable(vehicle: Vehicle) {
        for (let i = 0; i < this.slots.length; i++) {
            if (this.slots[i].isoccupide) {
                continue
            } else {
                return this.slots[i].type === vehicle.type ? this.slots[i] : false
            }
        }
        return false
    }

    assignSlot(vehicle: Vehicle) {
        let slot: false | Slot = this.isSlotAvailable(vehicle)
        if (slot) {
            const ticket = new Ticket(vehicle, Date.now())
            slot.assignVehicleTicket(ticket)
        } else {
            console.log("No slots available");

        }
    }

    removeVehicleSlot() {

    }

    payForTicket() {

    }

    todaysSale() {

    }
}

const parkingLot = new ParkingLot({
    car: 0,
    bike: 20,
    truck: 10
})
console.log(parkingLot);

const person = new Person("Gauhar", "7897898989")

const v1 = new Vehicle("UP58-9090-12", VehicleType.CAR, person)

console.log(parkingLot.isSlotAvailable(v1));
