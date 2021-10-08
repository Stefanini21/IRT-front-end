import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

export default class Footer extends Component {
    render() {
        return (
            <Container fluid style={{ backgroundColor: '#212529', color: '#fff', bottom: 0, position: "absolute", width: '100%', height: '80px' }}>
                <Container style={{ display: '', justifyContent: 'center', padding: '10px' }}>
                    <p>Footer from ReactJS</p>
                </Container>
            </Container>
        )
    }
}