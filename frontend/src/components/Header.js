import React from 'react';
import { Navbar, Container } from 'react-bootstrap'
import { ReactComponent as Logo } from '../images/logo.svg'

const navbarStyle = {
    backgroundColor: 'lightblue',
    minHeight: '4rem'
}

function Header(props) {
    const { title } = props;

    return (
        <Navbar style={navbarStyle} variant="light">
            <Container>
                <Logo alt={title} style={{ maxWidth: '12rem', maxHeight: '3rem'}}/>
            </Container>
        </Navbar>
    )
}

export default Header