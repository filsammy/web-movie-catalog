import { useEffect, useState, useContext } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Movies() {
	const { user } = useContext(UserContext);
	const notyf = new Notyf();

	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchData = () => {
		setIsLoading(true);
		fetch(`${process.env.REACT_APP_API_URL}/movies/getMovies`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				if (typeof data.message !== 'string') {
					setMovies(data.movies);
				} else {
					setMovies([]);
					notyf.error('No movies available right now.');
				}
			})
			.catch(() => {
				notyf.error('Failed to fetch movies. Please try again later.');
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		fetchData();
	}, []);

	let content;
	if (isLoading) {
		content = (
			<div className="d-flex justify-content-center align-items-center min-vh-50">
				<Spinner animation="border" role="status" />
				<span className="ms-2">Loading movies...</span>
			</div>
		);
	} else {
		content = user.isAdmin
			? <AdminView moviesData={movies} fetchData={fetchData} />
			: <UserView moviesData={movies} />;
	}

	return <Container fluid className="py-4">{content}</Container>;

}
