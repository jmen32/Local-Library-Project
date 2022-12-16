const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return (result = authors.find((author) => author.id === id));
}

function findBookById(books, id) {
  return (result = books.find((book) => book.id === id));
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBook = books.filter((book) =>
    book.borrows.every((borrow) => borrow.returned)
  );
  const borrowedBook = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );
  return [[...borrowedBook], [...returnedBook]];
}

function getBorrowersForBook(book, accounts) {
  const transactions = book.borrows;
  const result = transactions.map((transaction) => {
    const account = findAccountById(accounts, transaction.id);
    const newTranscation = {
      ...transaction,
      ...account,
    };
    return newTranscation;
  });
  result.splice(10);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
