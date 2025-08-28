import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import { Toaster } from 'react-hot-toast'
import AddBook from './pages/addBook/AddBook'
import Books from './pages/books/Books'
import BookDetails from './pages/bookDetails/BookDetails'


function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Books />} />
        <Route path={'/add-book'} element={<AddBook /> } />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/books/:id'} element={<BookDetails />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
