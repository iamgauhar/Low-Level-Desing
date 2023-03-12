class Patron {
    constructor(public name: string, public email: string) { }
}

class Book {
    constructor(
        public isbn: string,
        public title: string,
        public author: string,
        public publisher: string,
        public numCopies: number
    ) { }

    get availability(): string {
        return this.numCopies > 0 ? "Available" : "Not available";
    }

    public decreaseCopies(numCopiesToDecrement: number): void {
        this.numCopies -= numCopiesToDecrement;
    }

    public increaseCopies(numCopiesToIncrement: number): void {
        this.numCopies += numCopiesToIncrement;
    }
}

class Library {
    private books: Book[];
    private patrons: Patron[];
    private checkedOutBooks: { [key: string]: Book };

    constructor(books: Book[], patrons: Patron[]) {
        this.books = books;
        this.patrons = patrons;
        this.checkedOutBooks = {};
    }

    public getBookByTitle(title: string): Book[] {
        return this.books.filter((book) => book.title === title);
    }

    public getBookByAuthor(author: string): Book[] {
        return this.books.filter((book) => book.author === author);
    }

    public getBookByISBN(isbn: string): Book {
        return this.books.filter((book) => book.isbn === isbn)[0];
    }

    public addBook(book: Book): void {
        this.books.push(book);
    }

    public removeBook(book: Book): void {
        const bookIndex = this.books.indexOf(book);
        this.books.splice(bookIndex, 1);
    }

    public checkoutBook(isbn: string, patron: Patron): void {
        const book = this.getBookByISBN(isbn);
        if (book.numCopies > 0) {
            book.decreaseCopies(1);
            this.checkedOutBooks[book.isbn] = book;
            console.log(`Book ${book.title} has been checked out`);
            console.log(`Patron ${patron.name} has checked out ${book.title}`);
        } else {
            console.log(`Book ${book.title} is not available`);
        }
    }

    public returnBook(isbn: string): void {
        const book = this.checkedOutBooks[isbn];
        if (book) {
            book.increaseCopies(1);
            console.log(`Book ${book.title} has been returned`);
            delete this.checkedOutBooks[isbn];
        } else {
            console.log(`Book ${book.title} is not checked out`);
        }
    }

    public chargePatron(patron: Patron, amount: number): void {
        console.log(`Patron ${patron.name} has been charged $${amount}`);
    }

    public printInventory(): void {
        this.books.forEach((book) => {
            console.log(
                `Book ${book.title} by ${book.author}, ISBN: ${book.isbn}, ${book.availability}`
            );
        });
    }
}


const harryPotter = new Book(
    "1234",
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling",
    "Bloomsbury",
    3
);
const lordOfTheRings = new Book(
    "5678",
    "The Lord of the Rings",
    "J.R.R. Tolkien",
    "George Allen & Unwin",
    2
);
const library = new Library([harryPotter, lordOfTheRings], []);

console.log("Inventory before checkout");
library.printInventory();

console.log("Add patron");
const patron = new Patron("John Doe", "johndoe@example.com");
// library.addPatron(patron);

console.log("Checkout book with ISBN 1234");
library.checkoutBook("1234", patron);

console.log("Inventory after checkout");
library.printInventory();

console.log("Return book with ISBN 1234");
library.returnBook("1234");

console.log("Inventory after return");
library.printInventory();

console.log("Charge patron");
library.chargePatron(patron, 10);