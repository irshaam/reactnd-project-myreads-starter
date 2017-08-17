import React, { Component } from 'react'
import * as BooksAPI from 'BooksAPI'
import { Route, Link } from 'react-router-dom';
import BookShelf from 'BookShelf'
import Header from 'Header'
import Search from 'Search'
import './App.css'

class BooksApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books:[],
            searchResult:[]
        }
    }
    
    componentDidMount() {
        this.getBooks()
    }
    
    //fetch all books
    getBooks = () => {
        BooksAPI.getAll().then((books) =>{
            this.setState({books})
        });
    }

    //filter books by shelf name
    filterBooks = (name) => {
        return this.state.books.filter((book) => book.shelf === name)
    }

    //update book
    updateBook = (book, shelf) => {
        BooksAPI.update(book,shelf).then(()=>{
            book.shelf = shelf
            this.setState((state) => ({
                books: state.books.filter((b) => b.id !== book.id).concat([ book ])
            }));
        })
    }
    
    //search  books
    searchBooks = (query) => {
        if(query){
            BooksAPI.search(query,20).then((books) =>{
                if(books.length){
                    books.map((book,idx) => {
                        let bookExist = this.state.books.find((b) => b.id === book.id)
                        book.shelf = bookExist ? bookExist.shelf : 'none'
                        books[idx] = book;
                    })
                    this.setState({searchResult:books})
                }
            })
        }else{
            this.setState({searchResult: []})
        }
    }
    
    render() {
        return (
            <div className="App">
            <Route exact path="/" render={()=> (
                <div className="list-books">
                    <Header title={"My Reads"} />
                    <div className="list-books-content">
                        <div>
                            <BookShelf onUpdateBook={this.updateBook}  category={"Currently Reading"}  books={this.filterBooks("currentlyReading")}/>
                            <BookShelf onUpdateBook={this.updateBook}  category={"Want to Read"}  books={this.filterBooks("wantToRead")}/>
                            <BookShelf onUpdateBook={this.updateBook} category={"Read"}  books={this.filterBooks("read")}/>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search">Add a book</Link>
                    </div>
                </div>
            )}/>
             <Route exact path="/search" render={()=> (
                <Search books={this.state.searchResult} onSearch={this.searchBooks}  onUpdateBook={this.updateBook} />
            )}/>
            </div>
        )
    }
}

export default BooksApp
