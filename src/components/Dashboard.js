import React, { useState, useEffect } from "react"
import { Card, Button, Alert, Container,Row } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Dashboard() {
  const [error, setError] = useState("")
  const [data, setData] = useState()
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  useEffect(() => {
    fetch(`http://localhost:5000/secrets/${currentUser.uid}`, {
      "method": "GET",
      })
      .then(res => 
        res.json())
      .then(result => {
        setData(result);
        console.log(result);
      });
  }, [])

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  function handleDelete(id){
    console.log(id);
    fetch("http://localhost:5000/secret/" + id, {
      method: "DELETE",
    }).then(() => {
      alert("Deleted successfully!");
      window.location.reload(false);
    });
  }

  return (
    <>


      <Card className="mb-5">
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <br/>
          <strong>UID:</strong> {currentUser.uid}
          <Link to="/create" className="btn btn-primary w-100 mt-3">
            Submit Secret
          </Link>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <div className="w-100 text-center mt-2">
        <Button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
        </Card.Body>
      </Card>



          <h2 className="text-center mb-4">Shhh..! these are your secrets.</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          { data && 
          <div>
            { data.map( secret => (
              <Alert variant="primary">
                <h5 className="text-center mb-4">
                  { secret.secrets }
                </h5>
                <div className="col">
                  <center>
                    <Link to={`/edit/${secret._id}`}>
                    <Button variant="success me-1">Edit</Button>
                    </Link>                  
                  <Button variant="danger" onClick={ () => handleDelete(secret._id) }>Delete</Button>
                  </center>            
                </div>
              </Alert>))}    
          </div>}


    </>
  )
}