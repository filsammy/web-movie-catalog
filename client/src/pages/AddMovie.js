import { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from '../UserContext';

export default function AddMovie() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const notyf = new Notyf();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddMovie = (e) => {
        e.preventDefault();
        setLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/movies/addMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                title,
                director,
                year,
                description,
                genre,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data._id) {
                    notyf.success('Movie successfully added!');
                    // Reset form
                    setTitle('');
                    setDescription('');
                    setDirector('');
                    setYear('');
                    setGenre('');
                    navigate('/movies');
                } else {
                    notyf.error('Error adding movie. Please try again.');
                }
            })
            .catch(() => notyf.error('Something went wrong.'))
            .finally(() => setLoading(false));
    };

    // 🚫 Redirect if not admin
    if (user.isAdmin !== true) {
        return <Navigate to="/movies" />;
    }

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col xs={12} md={8} lg={6} className="mx-auto p-4 shadow rounded bg-light">
                    <Form onSubmit={handleAddMovie}>
                        <h2 className="text-center mb-4">Add Movie</h2>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Director</Form.Label>
                            <Form.Control
                                type="text"
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Link to="/movies" className="btn btn-danger">
                                Cancel
                            </Link>
                            <Button type="submit" variant="success" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />{' '}
                                        Adding...
                                    </>
                                ) : (
                                    'Add Movie'
                                )}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
