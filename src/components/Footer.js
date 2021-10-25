import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

export default class Footer extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '#212529', color: '#fff', bottom: 0, position: "absolute", width: '100%', height: '80px' }}>
                <Container>
                    <Row>
                        <Col>
                                <p>Footer from ReactJS</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}