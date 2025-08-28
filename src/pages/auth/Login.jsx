import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "../../features/auth/authThunks"
import toast from "react-hot-toast"
import "./Auth.css"
import { ContextAuth } from "../../context/AuthContext"

function Login() {

  const { setAuthStatus } = useContext(ContextAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {

    e.preventDefault()

    const { email, password } = formData

    if (!email || !password) {
      return toast.error("All fields are required")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return toast.error("Invalid credentials")
    }


    try {
      const result = await dispatch(loginUser(formData)).unwrap()

      localStorage.setItem("token", result.token)
      localStorage.setItem("user", result.user)

      toast.success("Login successful")
      setAuthStatus(true)
      navigate("/")
    } catch (e) {
      const errorMsg = e?.message || e?.error || "Login failed"
      toast.error(errorMsg)
    }

  }

  return (
    <>
      <div className="auth-page d-flex align-items-center justify-content-center">
        <div className="auth-card shadow p-4 rounded-4">
          <h2 style={{ color: "#0890c6" }} className="text-center mb-3">Book Review Board</h2>
          <p className="text-center text-muted mb-4">Welcome back! Please login</p>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>

            <button type="submit" className="btn auth-btn w-100">Login</button>
          </form>

          <p className="mt-4 text-center">Don’t have an account?{" "}
            <Link to="/register" className="text-primary">Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
