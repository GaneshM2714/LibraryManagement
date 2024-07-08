import React from 'react';
import axios from 'axios';
import { Card, Button, ListGroup } from 'react-bootstrap';

function MembersList({ members, setMembers }) {
  const deleteMember = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/members/${id}`);
      setMembers(members.filter(member => member.MemberID !== id));
      alert('Member deleted successfully!');
    } catch (error) {
      console.error('There was an error deleting the member!', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <ListGroup>
      {members.map(member => (
        <Card key={member.MemberID} className="mb-2">
          <Card.Body>
            <Card.Title>{member.Name || 'Unknown Name'}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Joined: {new Date(member.JoinDate).toLocaleDateString()}</Card.Subtitle>
            <Button variant="danger" onClick={() => deleteMember(member.MemberID)}>Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </ListGroup>
  );
}

export default MembersList;
