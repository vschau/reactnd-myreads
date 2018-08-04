import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

/*
  NOTES: The search from BooksAPI is limited to a particular set of search terms.
  You can find these search terms here:
  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
  you don't find a specific author or title. Every search is limited by search terms.
*/
class SearchBook extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    searchBooks: PropTypes.array.isRequired,
    onClearSearch: PropTypes.func.isRequired,
    onSearchBook: PropTypes.func.isRequired,
    onSelectBook: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.timeout = 0;
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.props.query}
              onChange={this.props.onSearchBook}
            />
          </div>
          <button onClick={this.props.onClearSearch} className='clear-search'></button>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.props.searchBooks.length > 0? this.props.searchBooks.map(book =>
                <li key={book.id}>
                  <Book
                    book={book}
                    onSelectBook={this.props.onSelectBook}
                  />
                </li>
              ) : null
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
