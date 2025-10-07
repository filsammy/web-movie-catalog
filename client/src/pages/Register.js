import '../App.css';
import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from '../UserContext';

export default function Register() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const notyf = new Notyf();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [isActive, setIsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	function register(e) {
		e.preventDefault();
		setIsLoading(true);

		fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				if (data.message === 'Registered Successfully') {
					setEmail('');
					setPassword('');
					setConfirmPassword('');
					notyf.success('Registration Successful');
					navigate('/login');
				} else if (data.error === 'Email invalid') {
					notyf.error('Email is invalid. Please check again.');
				} else if (data.error === 'Password must be atleast 8 characters') {
					notyf.error('Password must be at least 8 characters.');
				} else {
					notyf.error('Something went wrong. Please try again.');
				}
			})
			.catch(() => notyf.error('Server error. Please try again later.'))
			.finally(() => setIsLoading(false));
	}

	useEffect(() => {
		if (
			email !== '' &&
			password !== '' &&
			confirmPassword !== '' &&
			password === confirmPassword
		) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password, confirmPassword]);

	if (user.id !== null) {
		return <Navigate to="/movies" />;
	}

	return (
		<Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
			<div className="col-12 col-md-6 col-lg-4 p-4 shadow rounded bg-light">
				<Form onSubmit={register} className="w-100">
					<h1 className="text-center text-dark mb-4">Register</h1>

					<Form.Group className="mb-3">
						<Form.Label>Email:</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter Email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Password:</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-4">
						<Form.Label>Confirm Password:</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Group>

					<div className="text-center">
						<Button
							type="submit"
							className="btn-success w-100 py-2"
							disabled={!isActive || isLoading}
						>
							{isLoading ? (
								<>
									<Spinner
										as="span"
										animation="border"
										size="sm"
										role="status"
										aria-hidden="true"
									/>{' '}
									Registering...
								</>
							) : (
								'Register'
							)}
						</Button>
					</div>
				</Form>
			</div>
		</Container>
	);
}
