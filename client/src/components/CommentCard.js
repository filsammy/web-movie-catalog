import { Card, Container } from 'react-bootstrap';

export default function CommentCard({ commentProp }) {
	const { comment, userId } = commentProp;

	return (
		<Container className="col-12">
			<Card className="comment-card shadow-sm border-0">
				<Card.Body>
					<Card.Text className="mb-2">{comment}</Card.Text>
					<small className="text-dark">By: User {userId}</small>
				</Card.Body>
			</Card>
		</Container>
	);
}
