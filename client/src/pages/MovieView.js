import { useState, useEffect, useContext } from 'react';
import { Container, Button, Row, Col, Modal, Form, Image, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from '../UserContext';
import CommentCard from '../components/CommentCard';

export default function MovieView() {
	const { movieId } = useParams();
	const { user } = useContext(UserContext);

	const notyf = new Notyf();

	const [movie, setMovie] = useState(null);
	const [comment, setComment] = useState('');
	const [showComment, setShowComment] = useState(false);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	const fetchMovie = () => {
		setLoading(true);
		fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${movieId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.movie) {
					setMovie(data.movie);
				} else {
					setMovie(null);
				}
			})
			.catch(() => notyf.error('Failed to fetch movie.'))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchMovie();
	}, [movieId]);

	const openComment = () => setShowComment(true);

	const closeComment = () => {
		setShowComment(false);
		setComment('');
	};

	const addComment = (e) => {
		e.preventDefault();
		setSubmitting(true);

		fetch(`${process.env.REACT_APP_API_URL}/movies/addComment/${movieId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify({
				id: user.id,
				comment: comment,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'Comment added') {
					notyf.success('Comment added successfully');
					fetchMovie();
					closeComment();
				} else {
					notyf.error('Unable to add comment. Try again.');
				}
			})
			.catch(() => notyf.error('Something went wrong.'))
			.finally(() => setSubmitting(false));
	};

	return (
		<>
			<Container fluid className="pt-4">
				<Row className="justify-content-center">
					<Col xs={12} md={8} lg={6} className="text-center">
						{loading ? (
							<div
								className="d-flex justify-content-center align-items-center"
								style={{ minHeight: '60vh' }}
							>
								<Spinner animation="border" role="status" />
								<span className="ms-2">Loading movie...</span>
							</div>
						) : movie ? (
							<>
								<Image
									fluid
									src="https://cdn.cineamo.com/images/placeholders/landscape/im-posterFilmLandscape.jpg"
									alt="Movie poster"
									className="mb-3"
								/>
								<hr />
								<h1 className="mt-1">{movie.title}</h1>
								<p>
									<strong>Year:</strong> {movie.year}
								</p>
								<p>
									<strong>Genre:</strong> {movie.genre}
								</p>
								<p>{movie.description}</p>
								<p>
									<strong>Director:</strong> {movie.director}
								</p>

								<div className="mt-4 text-start">
									<h3>Comments</h3>
									<hr />
									{movie.comments?.length > 0 ? (
										movie.comments.map((comment) => (
											<CommentCard
												commentProp={comment}
												key={comment._id || comment.createdAt}
											/>
										))
									) : (
										<p className="pt-3 text-muted">No Comments Yet</p>
									)}
								</div>

								<div className="mt-3">
									{user.id ? (
										<Button
											variant="primary"
											size="sm"
											onClick={openComment}
											className="mx-2"
											id='addComment'
										>
											Add Comment
										</Button>
									) : (
										<p className="text-dark">Please login to comment</p>
									)}
								</div>
							</>
						) : (
							<p className="text-dark">Movie not found</p>
						)}
					</Col>
				</Row>
			</Container>

			<Modal show={showComment} onHide={closeComment} centered>
				<Form onSubmit={addComment}>
					<Modal.Header closeButton>
						<Modal.Title>Leave a Comment</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Your Comment:</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								required
							/>
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeComment}>
							Cancel
						</Button>
						<Button variant="success" type="submit" disabled={submitting}>
							{submitting ? (
								<>
									<Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
									/>{' '}
									Submitting...
								</>
							) : (
								'Submit'
							)}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
}
