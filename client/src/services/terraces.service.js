import axios from 'axios'

class TerracesService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5001/api/terraces',
            withCredentials: true
        })
    }
    getTerraces = () => this.app.get('/')
    getOneTerrace = terrace_id => this.app.get(`/${terrace_id}`)
    saveTerrace = terrace_info => this.app.post ('/new', terrace_info)
    
}

export default TerracesService

