import { Route, Routes } from 'react-router-dom'
import Books from './pages/Books/Books'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import { Toaster } from 'react-hot-toast'
import AddBook from './pages/addBook/AddBook'
import { ContextAuth } from './context/AuthContext'
import { useContext } from 'react'
import BookDetails from './pages/bookDetails/BookDetails'

function App() {

  const { authStatus } = useContext(ContextAuth)

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Books />} />
        <Route path={'/add-book'} element={authStatus ? <AddBook /> : <Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/login'} element={<Login />} />
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
