import { Component } from 'react'
import AuthService from './../../../services/auth.service'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            pwd: ''
        }
        this.authService = new AuthService()
    }

    handleFormSubmit = e => {
        e.preventDefault()

        const { username, pwd } = this.state

        this.authService.login(username, pwd)
            .then(responseFromServer => {
                const user = responseFromServer.data
                console.log(user)
                this.props.storeUser(user)
                this.props.history.push('/profile')         // Redirect with RRD props
            })
            .catch(err => console.log(err))
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {

        return (
            <div className="login">

                <h2>Iniciar Sesion</h2>
                <form onSubmit={this.handleFormSubmit}>

                    <h4>Usuario</h4> <input type="text" name="username" onChange={e => this.handleChange(e)} />
                    <h4>Contraseña</h4> <input type="password" name="pwd" onChange={e => this.handleChange(e)} />
                    <div>
                        <br></br>
                        <button className="btn btn-success"> Entrar </button>
                    </div>

                </form>
            </div>
        )
    }
}

export default Login

