import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBook } from "../../features/book/booksThunks"
import { useNavigate } from "react-router-dom"
import Header from "../../components/header/Header"

 function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.books)

  const [formData, setFormData] = useState({title: "",author: "",description: "",coverImage: ""})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(addBook(formData))
    navigate("/")
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="mb-4">📖 Add New Book</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required/>
          </div>

          <div className="mb-3">
            <label className="form-label">Author</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} className="form-control" required/>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" rows="4" required></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Cover Image URL</label>
            <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} className="form-control"/>
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </>
  )
}

export default AddBook
