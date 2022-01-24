import React from 'react'
import {Nav, Navbar, Container, Form } from 'react-bootstrap'
import logo from '../assets/download.png'
import { Link } from 'react-router-dom'

class NavigationBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar
                    style={style.navbar}
                    className="p-1"
                    variant="light"
                    fixed="top"
                >
                    <Container>
                        <Navbar.Brand>
                            <img src={logo} style={style.navbarLogo} />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/" style={style.navbarLink}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/pokemon-list" style={style.navbarLink} className="ml-5">
                                    Pokedex
                                </Nav.Link>
                                {/* <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="cari iphone x"
                                    className="mx-2"
                                    style={style.searchForm}
                                /> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

const style = {
    navbar: {
        padding: "2px",
        backgroundImage: 'radial-gradient(circle, #a9adb4, #bcbec3, #cecfd2, #e0e0e2, #f2f2f2)',
        borderBottom: "1px solid #eaeaea",
        boxShadow:
            "0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    },
    navbarLogo: {
        height: "30px",
    },
    navbarLink: {
        fontSize: "16px",
        fontWeight: "500",
        color: "#475569",
      },
      searchForm: {
        padding: "10px",
      },
}

export default NavigationBar