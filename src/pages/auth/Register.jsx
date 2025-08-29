import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { registerUser } from "../../features/auth/authThunks"
import toast from "react-hot-toast"
import "./Auth.css"

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" })

  const handleSubmit = async (e) => {

    e.preventDefault()

    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields are required")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email address")
    }


    if (password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    try {
      await dispatch(registerUser(formData)).unwrap()
      toast.success("Registration successful")
      navigate("/login")
    } catch (e) {
      if (e?.message === "User already exists") {
        toast.error("User already exists")
      } else {
        toast.error(e?.message || "Registration failed")
      }
    }

  }

  return (
    <>
      <div className="auth-page d-flex align-items-center justify-content-center">
        <div className="auth-card shadow p-4 rounded-4">
          <h2 style={{ color: "#0890c6" }} className="text-center mb-3">Book Review Board</h2>
          <p className="text-center text-muted mb-4">Create your account to get started</p>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Create a password" value={formData.password} onChange={(e) =>setFormData({ ...formData, password: e.target.value })}/>
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData,confirmPassword: e.target.value})}/>
            </div>

            <button type="submit" className="btn auth-btn w-100" >
              Register
            </button>
          </form>

          <p className="mt-4 text-center"> Already have an account?{" "}
            <Link to="/login" className="text-primary">Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register
