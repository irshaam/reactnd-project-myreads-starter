import React from 'react'
import PropTypes from 'prop-types';
import Book from 'Book';

const BookShelf = (props) => {
	const { books, onUpdateBook } = props
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.category}</h2>
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

BookShelf.propTypes = {
	books:PropTypes.array.isRequired,
	onUpdateBook:PropTypes.func.isRequired,
	category:PropTypes.string.isRequired,
}

export default BookShelf;