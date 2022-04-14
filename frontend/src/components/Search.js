import React from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Search(props) {
    const { searchParameter, handleSearchSubmit, handleOnChange } = props;
    

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Form onSubmit={handleSearchSubmit}>
                        <Form.Row>
                            <Col xs={9}>
                                <Form.Control 
                                    type="text"
                                    value={searchParameter}
                                    onChange={handleOnChange}
                                    placeholder="Search for new image..." />
                            </Col>
                            <Col>
                                <Button variant="primary" type="submit">Search</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Search