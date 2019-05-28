import React, { Component, Fragment } from 'react';
import { Table, Button, Form, Col, Card } from 'react-bootstrap';

class TableComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            students: [],
            name: "",
            email: "",
            street: "",
            zip: "",
            town: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    getStudents = async () => {
        const response = await fetch('http://localhost:3012/students');
        if (response.status === 200) {
            try {
                const responseJSON = await (() => {
                    return response.json()
                })();
                this.setState(
                    {
                        students: responseJSON
                    }
                );
            }
            catch {
            }
        }
    }

    deleteStudent = async (id) => {
        await fetch('http://localhost:3012/students/' + id, { method: 'DELETE' })
        this.getStudents();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await fetch('http://localhost:3012/students/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                address: {
                    gata: this.state.street,
                    postnummer: this.state.zip,
                    ort: this.state.town
                }
            })
        })

        this.setState({
            name: "",
            email: "",
            street: "",
            zip: "",
            town: ""
        });

        this.getStudents();
    }

    componentDidMount() {
        this.getStudents();
    }

    render() {
        let students = [];

        if (this.state.students.length !== 0) {
            this.state.students.forEach((element, index) => {
                students.push(
                    <tr key={index}>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.address.gata}, {element.address.postnummer} {element.address.ort}</td>
                        <td><Button onClick={() => this.deleteStudent(element._id)} variant="danger">Delete</Button></td>
                    </tr>
                )
            })
        }

        return (
            <Fragment>
                <Card>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students}
                        </tbody>
                    </Table>
                </Card>
                <Card>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Name: </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.state.name}
                                    placeholder="Student's Name"
                                    name="name"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Email: </Form.Label>
                                <Form.Control
                                    required
                                    type="email"
                                    value={this.state.email}
                                    name="email"
                                    placeholder="Student's Email"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Street: </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.state.street}
                                    name="street"
                                    placeholder="Street Address"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Zip: </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.state.zip}
                                    name="zip"
                                    placeholder="Zip-Code"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Town: </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={this.state.town}
                                    name="town"
                                    placeholder="Town"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">Add Student</Button>
                    </Form>
                </Card>
            </Fragment>
        )
    }
}

export default TableComponent;