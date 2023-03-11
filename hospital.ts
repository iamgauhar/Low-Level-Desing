// Department 
//  - (Medical, Cardiology) Name
//  - location(Floors) 
//  - description

class Department {
    id : number
    name : string
    description : string
    constructor( id : number, name : string, description : string ){    
        this.id = id                                                    
        this.name = name                                                    
        this.description = description                                      
    }                                                                           
}

// Patient
//  - id
//  - name
// - address
// - phone 
// - email
// - medicalRecord
// - appointment
// - feedback

class Patient { 
    id : number
    name :string
    address : string
    phone : string 
    email : string
    medicalRecord : string
    appointments : Appoinment[] 
    feedbacks : Feedback[] 
    constructor( id :number, name :string,address : string,phone : string , email : string, medicalRecord : string ){
            this.id = id
            this.name = name
            this.address = address 
            this.phone = phone  
            this.email = email 
            this.medicalRecord = medicalRecord 
            this.appointments = []
            this.feedbacks = []
    }


    viewMedicalRecord(){
        return this.medicalRecord
    }

    bookAppointment(doctor : Doctor, date : string, time : string){
        const appointment = new Appoinment(this.appointments.length+1, doctor.id, this.id, date, time)
        this.appointments.push(appointment)
        return appointment
    }

    viewAppointments(){
        return this.appointments;
    }

}

// Doctor 
//  - id
//  - name
//  - departmentId
//  - specialization
//  - appointments
//  - qualification

class Doctor {
    id: number
    name : string
    departmentId : number
    specialization : string
    qualification : string
    appointments : Appoinment[] | null
    constructor(id: number,name : string,departmentId : number,specialization : string,qualification : string){
            this.id = id
            this.name = name 
            this.departmentId = departmentId 
            this.specialization = specialization 
            this.qualification = qualification 
            this.appointments = []
    }

    viewAppointments(){
        return this.appointments;
    }

}

// Appoinment
// - id
// - doctorId
// - patientId
// - date
// - time

class Appoinment { 
    id : number
    doctorId: number
    patientId : number
    date : string
    time : string
    constructor( id : number,doctorId: number,patientId : number,date : string, time : string){
           this.id = id  
           this.doctorId = doctorId
           this.patientId = patientId  
           this.date = date  
           this.time = time  
    }
}

// Payments 
// - id
// - patientId
// - amount
// - date
// - paymentMethod

class Payments {
    id : number
    patientId : number
    amount : number
    date : string
    paymentMethod : string
    constructor(id : number,
        patientId : number,
        amount : number,
        date : string,
        paymentMethod : string){

            this.id=id  
    this.patientId=patientId  
    this.amount=amount  
    this.date=date  
    this.paymentMethod=paymentMethod  

    }
}

// Feedback
// - id
// - patientId
// - message
// - time

class Feedback {
    id : number
    patientId : number
    message : string
    time :string
    constructor(id : number,
        patientId : number,
        message : string,
        time :string){
        this.id=id  
    this.patientId=patientId  
    this.message=message  
    this.time=time 
    }
}

// Hospital
// - Departments
// - doctors
// - patients
// - payments

class Hospital {

    departments : Department[]
    patients : Patient[]
    doctors : Doctor[]
    payments : Payments[]
    constructor(departments : Department[]=[],patients : Patient[]=[],doctors : Doctor[]=[],payments : Payments[]=[])
    {
        this.departments = departments
        this.patients = patients
        this.doctors = doctors
        this.payments = payments
    }

    addDeparments(name : string, description : string){
        const id = this.departments.length + 1
        const department = new Department(id, name, description)
        this.departments.push(department)
        return department
    }

    getDepartmentById(id :number){
        return this.departments.filter(el=>el.id === id)
    }

    addDoctor(name : string,departmentId : number,specialization : string,qualification : string){
        const id = this.doctors.length + 1
        const doctor = new Doctor(id, name ,departmentId ,specialization ,qualification )
        this.doctors.push(doctor)
        return doctor
    }

    getDoctorId(id : number){
        return this.doctors.filter(el=>el.id === id)
    }

    addPatient( name :string,address : string,phone : string , email : string, medicalRecord : string){
        const id = this.patients.length + 1
        const patient = new Patient(id, name,address ,phone  , email , medicalRecord  )
        this.patients.push(patient)
        return patient
    }

    getPatientId(id : number){
        return this.patients.filter(el=>el.id === id)
    }

}


const newHospital = new Hospital()

// console.log(newHospital)

const cardiology = newHospital.addDeparments("Cardiology", "Deals with disorders of the heart")
const neurology = newHospital.addDeparments("Neurology", "Deals with brain-related issues")

// console.log(cardiology, neurology)

const cargiologist = newHospital.addDoctor("X", cardiology.id, "Cardiology", "MBBS")

// console.log(cargiologist)

const doe = newHospital.addPatient("DOE", "STREET 2", "+913413432", "abc.com", "heartdisorder")

// console.log(doe)

doe.bookAppointment(cargiologist, "12-DEC-2023", "11:00AM")

// console.log(doe.viewAppointments())