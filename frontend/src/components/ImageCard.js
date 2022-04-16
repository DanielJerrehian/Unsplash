import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ImageCard(props) {
    const { image, handleDeleteImage } = props;
    return (
        <Card border="secondary" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image?.urls?.small} />
            <Card.Body>
                <Card.Title>{image?.title.toUpperCase()}</Card.Title>
                <Card.Text>
                    {image?.description || image?.alt_description}
                </Card.Text>
                <Button variant="primary" onClick={() => handleDeleteImage(image?.id)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

export default ImageCard;