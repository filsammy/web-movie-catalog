import { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';
import { Link } from 'react-router-dom';

export default function AdminView({ moviesData, fetchData }) {
	const [moviesRows, setMoviesRows] = useState([]);


	useEffect(() => {
		const rows = moviesData.map(movie => (
			<tr key={movie._id}>
				<td>{movie.title}</td>
				<td>{movie.description}</td>
				<td>{movie.director}</td>
				<td>{movie.year}</td>
				<td>{movie.genre}</td>
				<td className='text-center'>
					<EditMovie movie={movie} fetchData={fetchData} />
					<DeleteMovie movie={movie} fetchData={fetchData} />
				</td>
			</tr>
		));
		setMoviesRows(rows);
	}, [moviesData, fetchData]);

	return (
		<Container fluid className="py-4">
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h1 className="mb-0">Admin Dashboard</h1>
				<Link to="/addMovie" className='btn btn-primary' id='addMovie'>Add Movie</Link>
			</div>

			<Table striped bordered hover responsive>
				<thead className="table-primary text-center">
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Director</th>
						<th>Year</th>
						<th>Genre</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{moviesRows}</tbody>
			</Table>
		</Container>
	);
}
