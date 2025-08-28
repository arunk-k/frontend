import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Header from "../../components/header/Header"
import { fetchBookById, addReview } from "../../features/book/booksThunks"

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return alert("Please enter a comment")

    const result = await dispatch(addReview({ bookId: id, data: { rating, comment } }))
    dispatch(fetchBookById(id))

    if (result.meta.requestStatus === "fulfilled") {
      setSuccessMsg("Review added successfully!")
      setRating(5)
      setComment("")
      setTimeout(() => setSuccessMsg(""), 2000)
    }
  }

  if (loading) return <p className="text-center mt-5">Loading book...</p>
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>
  if (!book) return <p className="text-center mt-5">Book not found</p>

  return (
    <>
      <Header />
      <div className="container py-5 book-details">
        <div className="row">

          <div className="col-md-4 text-center">
            <img src={book.coverImage} alt={book.title} className="img-fluid rounded shadow" />
          </div>

          <div className="col-md-8">
            <h2 className="fw-bold">{book.title}</h2>
            <p className="text-muted">by {book.author}</p>
            <p>{book.description}</p>
            <p className="small text-secondary">Added by: {book.createdBy?.name} ({book.createdBy?.email})</p>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="fw-semibold mb-3">Reviews</h4>
          {reviews.length === 0 ? (
            <p className="text-muted">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border rounded p-3 mb-3 shadow-sm">
                <div className="d-flex justify-content-between">
                  <strong>{review.user?.name}</strong>
                  <span className="badge bg-primary">⭐ {review.rating}/5</span>
                </div>
                <p className="mt-2 mb-0">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {token ? (
          <form onSubmit={handleSubmit} className="mt-4 border p-3 rounded shadow-sm">
            <h5 className="fw-semibold mb-3">Add a Review</h5>

            {successMsg && (
              <div className="alert alert-success py-2">{successMsg}</div>
            )}

            <div className="mb-3">
              <label className="form-label">Rating</label>
              <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num} Star{num > 1 && "s"}</option>))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Comment</label>
              <textarea className="form-control" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary"> Submit Review</button>
          </form>
        ) : (
          <p className="mt-4 text-muted">
            <i className="fa-solid fa-lock me-2"></i>Login to add a review</p>
        )}
      </div>
    </>
  )
}
export default BookDetails
