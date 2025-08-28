import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { ContextAuth } from "../../context/AuthContext"
import "./Header.css"

export default function Header() {

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const { authStatus, setAuthStatus } = useContext(ContextAuth);

  const handleLogout = () => {
    localStorage.clear()
    setAuthStatus(false)
    navigate("/login")
  }

  return (

    <>
      <nav style={{ backgroundColor: "#e6edf6" }} className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/">
            <i className="fa-solid fa-book" style={{ color: "cyan" }}></i> {" "} Book Review Board
          </Link>
          <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">

              {!authStatus && (
                <Link to="/login" className="btn btn-outline-primary me-2 mb-2 mb-lg-0"> Login <i className="fa-solid fa-sign-in-alt fa-sm"></i></Link>
              )}

              {authStatus && (
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
    
  )
}
