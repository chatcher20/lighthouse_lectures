import { useState } from 'react';

import useBookData from './hooks/useBookData';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { light, dark } from './themes'
import GlobalStyle from './components/GlobalStyles';
import Header from './components/Header';
import Welcome from './components/Welcome'
import {TopBar as Sticky} from './components/Header/styles'
import BookCard from './components/BookCard';
import Input from './components/Input'
import BookSearch from './components/BookSearch';

import "./app.scss"
import BooksContainer from './components/BooksContainer';

function App() {
  const { books, authorValue, titleValue, handleSearch,setAuthorValue, setTitleValue, loading, error } = useBookData("robot");
  const [ theme, setTheme ] = useState('light');
  console.log(books)
  const selectedTheme = theme === 'light' ? light : dark;
  const bookCards = books.map((book, i) => {
    const imageLink = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "images/nopic.png";
    return (<BookCard 
      key={i}
      img={imageLink}
      title={book.volumeInfo.title}
      authors={book.volumeInfo.authors}
    />)
  })
  
  return (
    <ThemeProvider theme={selectedTheme}>
      <div className="App">
        <GlobalStyle />
        <Router>
          <Header theme={theme} setTheme={setTheme}/>
          <Welcome />
          <BookSearch 
            authorValue={authorValue} 
            titleValue={titleValue} 
            setAuthorValue={setAuthorValue} 
            setTitleValue={setTitleValue} 
            handleSearch={handleSearch}
          />
          <BooksContainer>
            {!loading && !error && (
              bookCards
            )}
          </BooksContainer>
          {/* <div className="book-search">
            <Sticky isSticky/>
            <h2>Looking for something?</h2>
            <form>
              <Input
                label="book title"
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
              />
              <Input
                label="author"
                value={authorValue}
                onChange={(e) => setAuthorValue(e.target.value)}
              /> 
              <button 
                type="submit" 
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </div> */}
        
          {/* <div style={{padding: "20px 20px", display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "20px", background: "white"}}>
            <Sticky isSticky/>
            {!loading && !error && (
              bookCards
            )}
          </div> */}
          

        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
