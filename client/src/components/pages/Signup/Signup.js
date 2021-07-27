import { Component } from 'react'
import { Container } from 'react-bootstrap'

import AuthService from './../../../services/auth.service'
import UploadsService from '../../../services/upload.service'

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            pwd: '',
            city: '',
            email: '',
            image: '',
            imageFile: undefined,
            path: '',
            loading: false
        }
        this.authService = new AuthService()
        this.uploadsService = new UploadsService()
    }

    //envia el formulario al backend
    handleFormSubmit = e => {
        e.preventDefault()

        const { username, pwd, city, email, image } = this.state

        this.authService
            .signup({ username, pwd, city, email, image })
            .then(() => this.props.history.push('/login'))          // Redirect with RRD props
            .catch(err => console.log(err))
    }

    //upload image post a ruta

    //esta rescata la info de los inputs
    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFileUpload = e => {

        this.setState({ loading: true })

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        this.uploadsService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    loading: false,
                    image: response.data.cloudinary_url
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Container>
                <div className="signup">

                    <h2>Registro</h2>
                    <form onSubmit={this.handleFormSubmit}>

                        <h4>Usuario</h4> <input type="text" name="username" onChange={e => this.handleChange(e)} />
                        <h4>Contraseña</h4> <input type="password" name="pwd" onChange={e => this.handleChange(e)} />
                        <h4>Email</h4> <input type="text" name="email" onChange={e => this.handleChange(e)} />
                        <h4>Foto de perfil</h4> <input type="file" value={this.state.imageFile} onChange={this.handleFileUpload} name="image" />
                        <h4>Ciudad</h4> <input type="text" name="city" onChange={e => this.handleChange(e)} />
                        <div>
                            <br></br>
                            <button className="btn btn-success"> Registrarse </button>
                        </div>
                    </form>
                </div>
            </Container>

        )
    }
}
export default Signup