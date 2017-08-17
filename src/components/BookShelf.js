import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Book from 'Book';


class BookShelf extends Component {

	static propTypes = {
		books:PropTypes.array.isRequired,
		onUpdateBook:PropTypes.func.isRequired,
		category:PropTypes.string.isRequired,

	}

	render(){
		const { books, onUpdateBook } = this.props

		return (
			<div className="bookshelf">
			    <h2 className="bookshelf-title">{this.props.category}</h2>
			    <div className="bookshelf-books">
			        <ol className="books-grid">
			        	{books.map((book) => (
							<li key={book.id}>
								<Book onUpdateBook={onUpdateBook} book={book}/> 
							</li>
			        	))}
			        </ol>
			    </div>
			</div>
		)
	}
}

export default BookShelf;