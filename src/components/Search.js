import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from 'Book'

class Search extends Component {
	static propTypes = {
    	books: PropTypes.array.isRequired,
    	onUpdateBook: PropTypes.func.isRequired,
    	onSearch: PropTypes.func.isRequired
  	}

  	componentWillUnmount(){
        this.props.onSearch(this.state.query);
    }

  	updateQuery = (query) => {
  		this.props.onSearch(query.trim())
  	}
	
	render(){
		const {onUpdateBook, books } = this.props

		return(
			<div className="search-books">
			    <div className="search-books-bar">
			    	<Link to="/" className="close-search">Close</Link>
			        <div className="search-books-input-wrapper">
			            <input type="text" placeholder="Search by title or author" onChange={(e) => this.updateQuery(e.target.value)} />
			        </div>
			    </div>
			    <div className="search-books-results">
			        <ol className="books-grid">
						{books.map((book) => (
							<li key={book.id}> 
								<Book book={book} onUpdateBook={onUpdateBook}/>
							</li>
						))}
			        </ol>
			    </div>
			</div>
		)
	}
}

export default Search