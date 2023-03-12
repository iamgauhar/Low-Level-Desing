// class Books {
//   constructor(){
//   	this.name = name, 
//     this.author = author, 
//     this.ISBN = ISBN,
//     this.isAvailable = status
//   }
// }

// class Library {
// 	constructor(){
//   	this.books = []
//   }

//   addNewBooks(){
//   	if(!this.searchForBooks){

//     }
//     //add new books here.
//   }

//   searchForBooks(){
//   	//searchForBooks
//   }

//   borrowBooks(){
//   	if(checkForAvailability) 
//     	// makeThatBookStatus = false
//     	return "LET THEM BORROW"

//   	//borrow Books here
//   }

//   returnBooks(){
//   	if(this.searchForBooks && !this.checkForAvailabilty){

//     }
//   		//return Books here
//   }

//   checkForAvailabilty(){
//   	return true ? bookAvailable : false
//   }

// }

// Books


class Book {

  isbn: string;
  title: string;
  author: string;
  publisher: string;
  copies: number;
  constructor(isbn: string, title: string, author: string, publisher: string, copies: number) {
    this.isbn = isbn,
      this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.copies = copies;
  }

  availability() {
    return this.copies > 0 ? "Available" : "NOT available"
  }

  decreseCopies(numberOfCopiesOut: number) {
    this.copies -= numberOfCopiesOut
  }

  increseCopies(numberOfCopiesIn: number) {
    this.copies += numberOfCopiesIn
  }
}

class Patron {
  name: string;
  email: string;
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

class Library {
  books: Book[]
  patron: Patron[]
  borrowedBooks: {}
  constructor(books: Book[], patron: Patron[]) {

    this.books = books;
    this.patron = patron;
    this.borrowedBooks = {}
  }

  addBook(book: Book) {
    this.books.push(book)
  }

  removeBook(book: Book) {
    const bookIndex = this.books.indexOf(book)
    this.books.splice(bookIndex, 1)
  }

  getBookByTitle(title: string) {
    return this.books.filter((book) => book.title === title)
  }

  getBookByAuthor(author: string) {
    return this.books.filter((book) => book.author === author)
  }

  getBookByIsbn(isbn: string) {
    return this.books.filter((book) => book.isbn === isbn)
  }

  borrowBook(isbn: string, patron: string) {
    const book = this.getBookByIsbn(isbn);
    if (book[0].copies > 0) {
      console.log("Yes available");

    }
    // if (book.copies > 0) {
    //   // book.decreseCopies(1)

    //   // this.borrowedBooks.
    //  // this.borrowedBooks
    // }
    console.log(book);

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
// console.log(library);

const findBook = library.getBookByIsbn("5678")
// console.log(findBook);

library.borrowBook("1234", "Hindi")

// library.removeBook(harryPotter)
// console.log(library);


