import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

function Welcome() {
    return (  
        <Jumbotron>
            <h1>Unsplash Image Gallery</h1>
            <p>
                This application retrieves photos using the Unsplash API. Enter a search term to start!
            </p>
            <p>
                <Button variant="primary" href="https://unsplash.com" target="_blank">
                    Learn More
                </Button>
            </p>
        </Jumbotron>
    )
}

export default Welcome;