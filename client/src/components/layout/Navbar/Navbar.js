import { Navbar, Nav } from 'react-bootstrap'

import { Component } from 'react'


class Navigation extends Component {

    render() {
        const style = {
            background: '#07ab8d',
        }
        const style2 = {
            color: 'white'
        }
        return (

            <Navbar collapseOnSelect expand="lg" style={style}>
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Brand style={style2} href="/">Tuterraza.com</Navbar.Brand>
                    <Nav>
                        <Nav.Link style={style2} href="/login">Inicio Sesión</Nav.Link>
                        <Nav.Link style={style2} href="/signup">Registro</Nav.Link>
                        <Nav.Link style={style2} href="/newterrace">Crear Reseña Terraza</Nav.Link>
                        <Nav.Link style={style2} href="/terracelist">Lista de Terrazas</Nav.Link>
                        <Nav.Link style={style2} href="/close">Cerrar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation