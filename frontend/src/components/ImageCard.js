import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

function ImageCard(props) {
    const { image, handleDeleteImage, handleSaveImage } = props;
    return (
        <Card border="secondary" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image?.urls?.small} />
            <Card.Body>
                <Card.Title>{image.title?.toUpperCase()}</Card.Title>
                <Card.Text>
                    {
                        image?.description?.charAt(0)?.toUpperCase() + image?.description?.slice(1) 
                        || 
                        image?.alt_description?.charAt(0)?.toUpperCase() + image?.alt_description?.slice(1) 
                        ||
                        "No description provided"
                    }
                </Card.Text>
                <div className="d-flex justify-content-center">
                    {
                        !image.saved && (
                            <Button 
                                variant="primary"
                                className="mr-2"
                                onClick={() => handleSaveImage(image?.id)}
                            >
                                Save
                            </Button>
                        )
                    }
                    <Button 
                        variant="secondary" 
                        className="mr-2"
                        onClick={() => handleDeleteImage(image?.id)}
                    >
                        Delete
                    </Button>
                </div>
            </Card.Body>
            <Card.Footer
                className="text-muted"
            >
                {
                    image?.user?.name && !image?.user?.portfolio_url && <p>Author Name: {image?.user?.name}</p>
                }
                {
                    image?.user?.portfolio_url && 
                    <Nav.Link href={image?.user?.portfolio_url} target="_blank">
                        {
                            image?.user?.name
                            ? 
                                `${image?.user?.name}'s Portfolio`
                            :
                                "Author's Portfolio"
                        }
                    </Nav.Link>
                }
            </Card.Footer>
        </Card>
    )
}

export default ImageCard;