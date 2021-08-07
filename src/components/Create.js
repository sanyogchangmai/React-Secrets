import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory,Link } from "react-router-dom"
import { useState } from 'react'

const Create = () => {

    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [user, setUser] = useState(currentUser.uid);
    const [secret, setSecret] = useState('');
    const history = useHistory();
    
    function handleSubmit(e){
        e.preventDefault();
        const data = {user,secret};

        fetch('http://localhost:5000/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        }).then(() => {
        alert('Secret added successfully!');
        history.push('/');
      }).catch((err) => {
          setError(err);
      })
    }

    return (
        <div>
            <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {/* { currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="user">
              <Form.Label>User UID</Form.Label>
              <Form.Control type="text" name="user" value={ user }  required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Write secret here</Form.Label>
              <Form.Control type="text" name="secret" value={ secret } onChange={ (e) => setSecret(e.target.value)} rows={3} />
            </Form.Group>
            <br />
            <Button className="w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
        </div>
    );
}
 
export default Create;