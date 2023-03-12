var Patron = /** @class */ (function () {
    function Patron(name, email) {
        this.name = name;
        this.email = email;
    }
    return Patron;
}());
var Book = /** @class */ (function () {
    function Book(isbn, title, author, publisher, numCopies) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.numCopies = numCopies;
    }
    Object.defineProperty(Book.prototype, "availability", {
        get: function () {
            return this.numCopies > 0 ? "Available" : "Not available";
        },
        enumerable: false,
        configurable: true
    });
    Book.prototype.decreaseCopies = function (numCopiesToDecrement) {
        this.numCopies -= numCopiesToDecrement;
    };
    Book.prototype.increaseCopies = function (numCopiesToIncrement) {
        this.numCopies += numCopiesToIncrement;
    };
    return Book;
}());
var Library = /** @class */ (function () {
    function Library(books, patrons) {
        this.books = books;
        this.patrons = patrons;
        this.checkedOutBooks = {};
    }
    Library.prototype.getBookByTitle = function (title) {
        return this.books.filter(function (book) { return book.title === title; });
    };
    Library.prototype.getBookByAuthor = function (author) {
        return this.books.filter(function (book) { return book.author === author; });
    };
    Library.prototype.getBookByISBN = function (isbn) {
        return this.books.filter(function (book) { return book.isbn === isbn; })[0];
    };
    Library.prototype.addBook = function (book) {
        this.books.push(book);
    };
    Library.prototype.removeBook = function (book) {
        var bookIndex = this.books.indexOf(book);
        this.books.splice(bookIndex, 1);
    };
    Library.prototype.checkoutBook = function (isbn, patron) {
        var book = this.getBookByISBN(isbn);
        if (book.numCopies > 0) {
            book.decreaseCopies(1);
            this.checkedOutBooks[book.isbn] = book;
            console.log("Book ".concat(book.title, " has been checked out"));
            console.log("Patron ".concat(patron.name, " has checked out ").concat(book.title));
        }
        else {
            console.log("Book ".concat(book.title, " is not available"));
        }
    };
    Library.prototype.returnBook = function (isbn) {
        var book = this.checkedOutBooks[isbn];
        if (book) {
            book.increaseCopies(1);
            console.log("Book ".concat(book.title, " has been returned"));
            delete this.checkedOutBooks[isbn];
        }
        else {
            console.log("Book ".concat(book.title, " is not checked out"));
        }
    };
    Library.prototype.chargePatron = function (patron, amount) {
        console.log("Patron ".concat(patron.name, " has been charged $").concat(amount));
    };
    Library.prototype.printInventory = function () {
        this.books.forEach(function (book) {
            console.log("Book ".concat(book.title, " by ").concat(book.author, ", ISBN: ").concat(book.isbn, ", ").concat(book.availability));
        });
    };
    return Library;
}());
var harryPotter = new Book("1234", "Harry Potter and the Philosopher's Stone", "J.K. Rowling", "Bloomsbury", 3);
var lordOfTheRings = new Book("5678", "The Lord of the Rings", "J.R.R. Tolkien", "George Allen & Unwin", 2);
var library = new Library([harryPotter, lordOfTheRings], []);
console.log("Inventory before checkout");
library.printInventory();
console.log("Add patron");
var patron = new Patron("John Doe", "johndoe@example.com");
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
