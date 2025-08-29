import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks } from "../../features/book/booksThunks"
import { Link } from "react-router-dom"
import "./Books.css"
import Header from "../../components/header/Header"
import { Spinner } from "react-bootstrap"

export default function Books() {
  const dispatch = useDispatch()
  const { books, loading, error } = useSelector((state) => state.books)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  return (
    <>
      <Header />
      <section className="py-5 books-section">
        <div style={{minHeight:'100vh'}} className="container px-4 px-lg-5 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 style={{ color: "#1f4e88ff" }} className="books-heading fw-bold ">
              Explore Our Books
            </h2>
            {localStorage.getItem("token") && (
              <Link to="/add-book" className="btn btn-success shadow-sm rounded-pill px-4 fw-semibold">+ Add New Book</Link>
            )}
          </div>

          {loading && (
            <div className="d-flex justify-content-center align-items-center my-5">
              <Spinner animation="border" variant="primary" role="status" />
              <span className="ms-3 text-primary fw-semibold">Loading books...</span>
            </div>
          )}
          {error && (
            <div className="alert alert-danger text-center fw-semibold">
              {error}
            </div>
          )}

          <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 justify-content-center">
            {!loading && books.length > 0 &&
              books.map((book) => (
                <div key={book._id} className="col">
                  <div className="card h-100 book-card shadow-lg border-0 rounded-4">

                    <div className="book-image-container">
                      <Link to={`/books/${book._id}`}>
                        <img className="card-img-top book-cover rounded-top-4" src={book.coverImage} alt={book.title} />
                      </Link>
                    </div>

                    <div className="card-body p-4 text-center">
                      <h5 className="fw-bold book-title text-dark">{book.title}</h5>
                      <p className="text-muted mb-2 book-author small fst-italic">by {book.author}</p>
                      <p className="text-truncate small text-secondary px-2">{book.description}</p>
                    </div>

                    <div className="card-footer p-3 bg-light border-0 text-center">
                      <Link to={`/books/${book._id}`} className="btn btn-outline-primary w-100 rounded-pill fw-semibold shadow-sm"><i className="fa-solid fa-book-open me-2"></i> View Details</Link>
                    </div>
                  </div>
                </div>
              ))}

            {!loading && books.length === 0 && (
              <div className="text-center mt-5">
                <h5 className="text-muted">No books available yet.</h5>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
