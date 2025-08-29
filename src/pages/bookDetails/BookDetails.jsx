import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Header from "../../components/header/Header"
import { fetchBookById, addReview } from "../../features/book/booksThunks"
import { Spinner } from "react-bootstrap"
import toast from "react-hot-toast"
import "./BookDetails.css"

function BookDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { book, reviews, loading, error } = useSelector((state) => state.books)
  const token = localStorage.getItem("token")

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  useEffect(() => {
    dispatch(fetchBookById(id))
  }, [id, dispatch])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return toast.error("Please enter a comment")

    const result = await dispatch(addReview({ bookId: id, data: { rating, comment } }))
    dispatch(fetchBookById(id))

    if (result.meta.requestStatus === "fulfilled") {
      setSuccessMsg("Review added successfully!")
      setRating(5)
      setComment("")
      setTimeout(() => setSuccessMsg(""), 2000)
    } else {
      toast.error("Failed to submit review")
    }
  }

  return (
    <>
      <Header />
      <section className="py-5 bookdetails-section">
        <div style={{ minHeight: '100vh' }} className="container px-3 px-lg-5">

          {loading && (
            <div className="d-flex justify-content-center align-items-center my-5">
              <Spinner animation="border" variant="primary" role="status" />
              <span className="ms-3 text-primary fw-semibold">Loading book details...</span>
            </div>
          )}

          {!loading && book && (
            <>
              <div className="card shadow-lg border-0 rounded-4 p-4 bg-light mb-5">
                <div className="row g-4 align-items-center">
                  <div className="col-md-4 text-center">
                    <img src={book.coverImage} alt={book.title} className="img-fluid rounded-4 shadow-sm book-cover-detail" />
                  </div>
                  <div className="col-md-8">
                    <h2 className="fw-bold text-dark">{book.title}</h2>
                    <p className="text-muted fst-italic">by {book.author}</p>
                    <p className="text-secondary">{book.description}</p>
                    <p className="small text-muted">Added by: <strong>{book.createdBy?.name}</strong> ({book.createdBy?.email})
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="fw-bold text-dark mb-3"><i className="fa-solid fa-star text-warning"></i> Reviews</h4>
                {reviews.length === 0 ? (
                  <p className="text-muted">No reviews yet.</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review._id} className="review-card shadow-sm rounded-4 p-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <strong className="text-dark">{review.user?.name}</strong>
                        <span className="badge bg-primary rounded-pill"><i className="fa-solid fa-star text-warning"></i>{review.rating}/5</span>
                      </div>
                      <p className="mt-2 mb-0 text-secondary">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {token ? (
                <div className="card shadow-lg border-0 rounded-4 p-4 bg-light">
                  <form onSubmit={handleSubmit}>
                    <h5 className="fw-bold mb-3 text-dark">Add a Review</h5>

                    {successMsg && <div className="alert alert-success py-2">{successMsg}</div>}

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Rating</label>
                      <select className="form-select rounded-pill shadow-sm" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>{num} Star{num > 1 && "s"}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Comment</label>
                      <textarea className="form-control shadow-sm rounded-3" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your thoughts..." />
                    </div>

                    <div className="text-center">
                      <button type="submit" className="btn btn-primary rounded-pill fw-semibold shadow-sm review-btn" disabled={loading}>
                        {loading ? "Submitting..." : "Submit Review"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <p className="mt-4 text-muted">
                  <i className="fa-solid fa-lock me-2"></i>Login to add a review
                </p>
              )}
            </>
          )}
          {!loading && !book && (
            <p className="text-center mt-5 text-muted">Book not found</p>
          )}
        </div>
      </section>
    </>
  )
}

export default BookDetails
