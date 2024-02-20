import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function FormLogin() {
  const register = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Form
      className="container"
      style={{
        width: "100vw",
      }}
      onSubmit={register}
    >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="input password"
          as="input"
          rows={3}
        />
      </Form.Group>
      <button className="btn btn-success">Dang ki</button>
    </Form>
  );
}

export default FormLogin;
