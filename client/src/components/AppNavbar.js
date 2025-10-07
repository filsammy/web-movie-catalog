import { useContext } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import UserContext from '../UserContext';

export default function AppNavbar() {
	const { user } = useContext(UserContext);

	return (
		<Navbar variant="dark" expand="lg" sticky="top" className="custom-navbar">
			<Container fluid>
				<Navbar.Brand as={Link} to="/">
					Movie Catalog
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{user.id ? (
							user.isAdmin ? (
								<>
									<Nav.Link as={NavLink} to="/movies">
										Dashboard
									</Nav.Link>
									<Nav.Link as={NavLink} to="/logout">
										Logout
									</Nav.Link>
								</>
							) : (
								<>
									<Nav.Link as={NavLink} to="/movies">
										Movies
									</Nav.Link>
									<Nav.Link as={NavLink} to="/logout">
										Logout
									</Nav.Link>
								</>
							)
						) : (
							<>
								<Nav.Link as={NavLink} to="/movies">
									Movies
								</Nav.Link>
								<Nav.Link as={NavLink} to="/login">
									Login
								</Nav.Link>
								<Nav.Link as={NavLink} to="/register">
									Register
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
