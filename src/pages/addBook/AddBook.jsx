import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBook } from "../../features/book/booksThunks"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header/Header"
import { Spinner } from "react-bootstrap"
import toast from "react-hot-toast"
import "./AddBook.css"

function AddBook() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, success } = useSelector((state) => state.books)

  const [formData, setFormData] = useState({ title: "", author: "", description: "", coverImage: "" })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const { title, author, description, coverImage } = formData

    if (!title.trim() || !author.trim() || !description.trim() || !coverImage.trim()) {
      toast.error("All fields are required")
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const payload = { ...formData }
      if (!payload.coverImage) delete payload.coverImage

      await dispatch(addBook(payload)).unwrap()

      toast.success("Book added successfully ")
      navigate("/")
    } catch (err) {
      toast.error(err?.message || "Failed to add book")
    }
  }

  const handleCancel = () => {
    navigate("/")
  }

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  return (
    <>
      <Header />
      <section className="py-5 addbook-section">
        <div className="container px-3 px-lg-5 mt-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold addbook-heading">Add a New Book</h2>
          </div>

          <div className="card shadow-lg border-0 rounded-4 p-4 bg-light form-card mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control rounded-pill shadow-sm" placeholder="Enter book title" />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">Author</label>
                <input type="text" name="author" value={formData.author} onChange={handleChange} className="form-control rounded-pill shadow-sm" placeholder="Enter author name" />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="form-control shadow-sm rounded-3" rows="4" placeholder="Write a short description..."></textarea>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">Cover Image URL</label>
                <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} className="form-control rounded-pill shadow-sm" placeholder="Paste image URL (optional)" />
              </div>

              <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="btn btn-primary addbook-btn rounded-pill fw-semibold shadow-sm px-4" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />Adding...
                    </>
                  ) : (
                    "Add Book"
                  )}
                </button>

                <button type="button" onClick={handleCancel} className="btn btn-outline-secondary rounded-pill fw-semibold shadow-sm px-4" disabled={loading}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddBook
