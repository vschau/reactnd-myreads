import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  handleSelectBook = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update({id: book.id}, book.shelf).then(() =>
      this.setState((prevState) => {
        return {
          books: prevState.books.filter(b => b.id!==book.id).concat([book])
        }
      })
    )
  }

  handleSearchBook = (e) => {
     const query = e.target.value
     this.setState({query})

    // Only perform API call when user stops typing
    // From https://stackoverflow.com/questions/42217121/searching-in-react-when-user-stops-typing
    if (this.timeout)
      clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (!query) {
        this.setState({
          searchBooks: []
        })
      }
      else {
        BooksAPI.search(query).then((response) => {
          if (response.error) {
            this.setState({
              searchBooks: []
            })
          }
          else {
            // response returns books that do not have 'shelf' property.  We need to assign them ourselves.
            // Use a hash table for the 'shelf' status of our books
            const currBooks = new Map(
              this.state.books.map(b => [b.id, b.shelf])
            );
            response.forEach(b => {
              b.shelf = currBooks.has(b.id)? currBooks.get(b.id) : 'none'
            })
            this.setState({
              searchBooks: response
            })
          }
        })
      }
    }, 300);
  }

  handleClearSearch = () => {
    this.setState({
      query: '',
      searchBooks: []
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <BookShelf
            books={this.state.books}
            onSelectBook={this.handleSelectBook}
          />
        }/>
        <Route path="/search" render={() => 
          <SearchBook
            query={this.state.query}
            searchBooks={this.state.searchBooks}
            onClearSearch={this.handleClearSearch}
            onSearchBook={this.handleSearchBook}
            onSelectBook={this.handleSelectBook}
          />
        }/>
      </div>
    )
  }
}

export default BooksApp
