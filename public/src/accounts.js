function findAccountById(accounts, id) {
  let foundAccount = accounts.find((account) => id === account.id);
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  let sortedAcc = accounts.sort((acc1, acc2) =>
    acc1.name.last < acc2.name.last ? -1 : 1
  );
  return sortedAcc;
}

function getTotalNumberOfBorrows(account, books) {
  let result = 0;
  books.forEach((book) =>
    book.borrows.forEach((element) => {
      if (element.id === account.id) {
        result += 1;
      }
    })
  );
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  let accountId = account.id;
  const result = books.filter((book) => {
    return book.borrows.some(
      (borrow) => borrow.id === accountId && !borrow.returned
    );
  });
  const output = result.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    const newBook = { ...book, author };
    return newBook;
  });
  return output;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
