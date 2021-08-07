import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory,Link,useParams  } from "react-router-dom"
import { useState, useEffect } from 'react'


const Update = () => {

    const { id } = useParams();

    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [user, setUser] = useState(currentUser.uid);
    const [data, setData] = useState()
    const [secret, setSecret] = useState('');
    const history = useHistory()


    useEffect(() => {
        fetch(`http://localhost:5000/secret/${id}`, {
          "method": "GET",
          })
          .then(res => 
            res.json())
          .then(result => {
            setData(result);
            console.log(result);
          });
      }, [])


    function handleSubmit(e){
        e.preventDefault();
        const data = {user,secret};

        fetch("http://localhost:5000/edit/" + id, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        }).then(() => {
        alert('Secret updated successfully!');
        history.push('/');
      }).catch((err) => {
          setError(err);
      })
    }

    return (

        <div>
            
            <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Edit Secret</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          { data &&
          <Form onSubmit={handleSubmit}>
            <Form.Group id="user">
              <Form.Label>User UID</Form.Label>
              <Form.Control type="text" name="user" defaultValue={ data.user_uid }  required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Write secret here</Form.Label>
              <Form.Control type="text" name="secret" defaultValue={ data.secrets } onChange={ (e) => setSecret(e.target.value)} rows={5} />
            </Form.Group>
            <br />
            <Button className="w-100" type="submit">
              Submit
            </Button>
          </Form>}
        </Card.Body>
      </Card>

        </div>

    );
}
 
export default Update;