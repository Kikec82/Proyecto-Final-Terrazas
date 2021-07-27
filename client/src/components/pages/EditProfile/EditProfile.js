import React, { Component } from 'react'

import AuthService from '../../../services/auth.service'

import { Container } from 'react-bootstrap'

class EditProfile extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            pwd: '',
            city: '',
            email: '',
            image: '',
            path: ''
        }
        this.authService = new AuthService()
        
        // this.getProfile(this.loggedUser)
    }

    componentDidMount() {

        const { id } = this.props.match.params
        this.authService
            .getProfile(id)
            .then(response => {
                this.setState({ user: response })
                console.log(response)
            })
    }
    //envia el formulario al backend
    handleFormSubmit = e => {
        e.preventDefault()

        const { id } = this.props.match.params
        const { username, pwd, city, email, image } = this.state

        this.authService
            .editProfile(id,{ username, pwd, city, email, image })
            .then(() => this.props.history.push('/login'))          // Redirect with RRD props
            .catch(err => console.log(err))
    }


    //esta rescata la info de los inputs
    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {
        return (

            <Container>

                <div className="editProfile">

                    <form onSubmit={this.handleFormSubmit}>

                        <h4>Usuario</h4> <input type="text" name="username" onChange={e => this.handleChange(e)} value={this.state.username} />
                        <h4>Contraseña</h4> <input type="password" name="pwd" onChange={e => this.handleChange(e)} value={this.state.pwd} />
                        <h4>Email</h4> <input type="text" name="email" onChange={e => this.handleChange(e)} value={this.state.email}/>
                        <h4>Foto de perfil</h4> <input type="file" name="image" onChange={e => this.handleChange(e)} value={this.state.image} />
                        <h4>Ciudad</h4> <input type="text" name="city" onChange={e => this.handleChange(e)} value={this.state.city} />

                    </form>
                    <br></br>
                        <button className="btn btn-success"> Modificar </button>
                </div>
            </Container>

        )
    }
}

export default EditProfile

