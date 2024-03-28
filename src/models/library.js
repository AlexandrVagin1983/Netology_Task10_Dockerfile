const { v4: uuid } = require('uuid')

class Book {
    constructor(title = '', description = '', authors = '', favorite ='',  fileCover = '', fileName = '', fileBook = '', id = uuid()) {
        this.title = title
        this.description = description
        this.authors     = authors
        this.favorite    = favorite
        this.fileCover   = fileCover
        this.fileName    = fileName
        this.fileBook    = fileBook
        this.id          = id
    }
}

const books = {
    book: [
        new Book('Сборник задач по физике.', 'Задачи по физике для учащихся 9 классов.', 'Перышкин А.В', ),
        new Book('Мастер и Маргарита.', 'Классичечкий роман.', 'Булгаков М.А.', ),
        new Book('Метро', ' Постапокалиптический роман, популярная литература.', 'Глуховский Д.А.', ),
    ],
}

module.exports.books = books
module.exports.Book = Book
