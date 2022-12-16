function getTotalBooksCount(books) {
  return books.reduce((total, book) => (total += 1), 0);
}

function getTotalAccountsCount(accounts) {
  return accounts.reduce((total, account) => (total += 1), 0);
}

function getBooksBorrowedCount(books) {
  const borrowedBook = books.filter((book) =>
    book.borrows.some((borrow) => borrow.returned === false)
  );
  return borrowedBook.length;
}

function getMostCommonGenres(books) {
  const bookGenres = books.reduce((acc, book) => {
    const Genre = book.genre;
    const genreInfo = acc.find((element) => element.name === Genre);
    if (!genreInfo) {
      const NewGenreInfo = {
        name: Genre,
        count: 1,
      };
      acc.push(NewGenreInfo);
    } else {
      genreInfo.count++;
    }
    return acc;
  }, []);
  bookGenres.sort((GenreA, GenreB) => GenreB.count - GenreA.count);
  bookGenres.splice(5);
  return bookGenres;
}

function getMostPopularBooks(books) {
  const result = books
    .filter((book) => book.borrows.length)
    .map((book) => {
      const mostPopular = {
        name: book.title,
        count: book.borrows.length,
      };
      return mostPopular;
    });
  result.sort((bookA, bookB) => bookB.count - bookA.count);
  result.splice(5);
  return result;
}

function sortAndSpliceHelper(listOfItems, spliceAt) {
  let sorted = list.sort((a, b) => b.count - a.count);
  sorted.splice(spliceAt);
  return sorted;
}

function getMostPopularAuthors(books, authors) {
  result = authors.map((author) => {
    const fullName = `${author.name.first} ${author.name.last}`;

    const totalBorrow = books.reduce((total, book) => {
      if (author.id === book.authorId) {
        total += book.borrows.length;
      }
      return total;
    }, 0);

    const topFiveAuthors = {
      name: fullName,
      count: totalBorrow,
    };
    return topFiveAuthors;
  });

  return sortAndSpliceHelper(result, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

