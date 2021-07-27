import axios from 'axios'

class ExperiencesService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5001/api/experience',
            withCredentials: true
        })
    }
    getExperiences = () => this.app.get('/')
    getExperienceByTerraceId = (terrace_id) => this.app.get(`?terrace=${terrace_id}`)
    getOneExperience = experience_id => this.app.get(`/${experience_id}`)
    saveExperience = experience_info => this.app.post('/new', experience_info)

}

export default ExperiencesService