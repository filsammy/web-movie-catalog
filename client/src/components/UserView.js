import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';

export default function UserView({ moviesData }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const moviesArr = moviesData.map(movie => (
			<Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="d-flex align-items-stretch">
				<MovieCard movieProp={movie} />
			</Col>
		));
		setMovies(moviesArr);
	}, [moviesData]);

	return (
		<Container fluid className="px-4 py-4">
			<h1 className='text-center mb-4'>Explore Movies and TV Shows</h1>
			<Row className="g-4 justify-content-center">{movies}</Row>
		</Container>
	);
}
