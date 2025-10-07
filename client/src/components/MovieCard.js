import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MovieCard({ movieProp }) {
	const { _id, title, year, genre } = movieProp;

	return (
		<Container className="col d-flex align-items-stretch">
			<Card className="movie-card mt-3 p-0 shadow-sm">
				<Card.Img
					variant="top"
					src="https://cdn.cineamo.com/images/placeholders/landscape/im-posterFilmLandscape.jpg"
					className="movie-img img-fluid"
					alt={`${title} poster`}
				/>
				<Card.Body className="d-flex flex-column">
					<Card.Title className="text-truncate">{title}</Card.Title>
					{year && <Card.Text className="text-muted mb-1">{year}</Card.Text>}
					{genre && <Card.Text className="small text-muted">{genre}</Card.Text>}
					<div className="mt-auto">
						<Link className="btn btn-primary w-100 mt-3" to={`/movies/${_id}`}>
							View Movie
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
}
