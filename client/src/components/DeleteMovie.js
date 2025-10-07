import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function DeleteMovie({ movie, fetchData }) {
	const deleteToggle = (movieObj) => {
		fetch(`${process.env.REACT_APP_API_URL}/movies/deleteMovie/${movieObj._id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === 'Movie deleted successfully') {
					Swal.fire({
						title: 'Success',
						icon: 'success',
						text: 'Movie successfully deleted',
					});
					fetchData();
				} else {
					Swal.fire({
						title: 'Something Went Wrong',
						icon: 'error',
						text: 'Please try again',
					});
					fetchData();
				}
			});
	};

	return (
		<Button
			variant="danger"
			size="sm"
			onClick={() => deleteToggle(movie)}
			className="mx-3"
		>
			Delete
		</Button>
	);
}
