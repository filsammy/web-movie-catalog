import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import UserContext from '../UserContext';

export default function Login() {
	const { user, setUser } = useContext(UserContext);
	const notyf = new Notyf();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [isActive, setIsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => res.json())
			.then((data) => {
				setUser({
					id: data.user._id,
					isAdmin: data.user.isAdmin,
				});
			});
	};

	function authenticate(e) {
		e.preventDefault();
		setIsLoading(true);

		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.access) {
					localStorage.setItem('token', data.access);
					retrieveUserDetails(data.access);

					notyf.success('Login Successful!');
				} else if (data.error === 'No Email Found') {
					notyf.error('Email not found. Please check again.');
				} else {
					notyf.error('Authentication failed. Try again.');
				}
			})
			.catch(() => notyf.error('Something went wrong.'))
			.finally(() => {
				setIsLoading(false);
				setEmail('');
				setPassword('');
			});
	}

	useEffect(() => {
		setIsActive(email !== '' && password !== '');
	}, [email, password]);

	if (user.id !== null) {
		return <Navigate to="/movies" />;
	}

	return (
		<Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
			<div className="col-12 col-md-6 col-lg-4 p-4 shadow rounded bg-light">
				<Form onSubmit={authenticate} className="w-100">
					<h1 className="text-center text-dark mb-4">Login</h1>

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

					<Form.Group className="mb-4">
						<Form.Label>Password:</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>

					<div className="text-center">
						<Button
							type="submit"
							className="btn-primary w-100 py-2"
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
									Logging in...
								</>
							) : (
								'Log In'
							)}
						</Button>
					</div>
				</Form>
			</div>
		</Container>
	);
}
