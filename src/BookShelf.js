import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSelectBook: PropTypes.func.isRequired
  }
  
  render() {
    const shelves = {
      currentlyReading: {
        name: 'Currently Reading',
        books: []
      },
      wantToRead: {
        name: 'Want to Read',
        books: []
      },
      read: {
        name: 'Read',
        books: []
      }
    }
    this.props.books.forEach(book => {
      // won't do a push if the book.shelf isn't 'currentlyReading', 'wantToRead' or 'read'
      if (Object.prototype.hasOwnProperty.call(shelves, book.shelf))
        shelves[book.shelf].books.push(book)
    })
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(shelves).map((shelf) =>
              <Shelf
                key={shelf}
                shelfName={shelves[shelf].name}
                books={shelves[shelf].books}
                onSelectBook={this.props.onSelectBook}
              />
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookShelf
