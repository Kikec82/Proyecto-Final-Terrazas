import axios from 'axios'

class AuthService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5001/api',
            withCredentials: true
        })
    }
    login = (username, pwd) => this.app.post('/login', { username, pwd })
    signup = (user) => this.app.post('/signup', user)
    logout = () => this.app.get('/close')
    loggedIn = () => this.app.get('/loggedin')
    editProfile = (id,user) => this.app.post(`/editProfile/${id}`,user )
    getProfile = (id) => this.app.get(`/editProfile/${id}`)
    
    


}

export default AuthService