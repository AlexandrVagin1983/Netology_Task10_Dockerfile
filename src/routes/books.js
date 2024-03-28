const express = require('express')
const router  =  express.Router()
const library = require('./../models/library')
const fileMulter = require('./../middleware/file')
const PORT_REIDS = process.env.PORT_REIDS || 3002
const http = require('http')
const { error } = require('console')

router.get('/', async (req, res) => {    
    const {book} = library.books
    //Получим просмотры для для каждой книги:
    const url = `http://counter:${PORT_REIDS}/counters`    
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(book)
        })
        let counter = 0
        if (response.ok) {
            const responce  = await response.json()
            //Полученные просмотры находятся в массиве responce.mBooksCounters, перенесем их в массив book:
            for (let bookId of responce.mBooksCounters) {
                let curBook = book.find(item => item.id == bookId.id);
                curBook.counter = `Просмотры: ${ +bookId.counter }`
            }
            
        } else {
            console.log("Ошибка HTTP: " + response.status);
        }
    }
    catch {
        let counter = 0
    }

    res.render('books/index',{
        title: "Books",
        books: book,
    })
})

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Создание книги:",
        book: {},
    })
})

router.post('/create', (req, res) => {
    const {book} = library.books
    const {title, description, authors, favorite, fileCover} = req.body
        
    newBook = new library.Book(title, description, authors, favorite, fileCover)
    book.push(newBook)

    res.redirect('/book')
})

router.get('/:id', async (req, res) => {
    const {book} = library.books
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if( idx !== -1) {

        const url = `http://counter:${PORT_REIDS}/counter/${id}`
        let counter = 0
        try {        
            let response = await fetch(url, {
                method: 'POST'
            })
            if (response.ok) {
                const responce  = await response.json()
                counter = responce.counter
            } else {
                console.log("Ошибка HTTP: " + response.errmsg);
            }
        }
        catch {            
        }
    
        res.render("books/view", {
        title: "Книга:",
        book: book[idx],
        counter: `Количество просмотров: ${++counter}`,
        })
    } else {
        res.status(404).redirect('/404')
    }

})

router.get('/update/:id', (req, res) => {
    const {book} = library.books
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.render("books/update", {
            title: "Изменение книги:",
            book: book[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
})

router.post('/update/:id', (req, res) => {
    const {book} = library.books
    const {title, description, authors, favorite, fileCover} = req.body
    const {id}     = req.params
    const idx = book.findIndex(el => el.id === id)
        
    if (idx !== -1){
        book[idx] = {
            ...book[idx],
            title,
            description,
            authors,
            favorite,
            fileCover
            }
        res.redirect(`/book/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
})

router.post('/delete/:id', (req, res) => {
    const {book} = library.books
    const {id} = req.params
    const idx = book.findIndex(el => el.id === id)
     
    if(idx !== -1) {
        book.splice(idx, 1)
        res.redirect(`/book`)
    } else {
        res.status(404).redirect('/404')
    }
})

module.exports = router