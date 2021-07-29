import { Switch, Route, Redirect } from 'react-router-dom'
import IndexPage from '../pages/IndexPage/IndexPage'
import Signup from '../pages/Signup/Signup'
import Login from '../pages/Login/Login'
import Profile from '../pages/Profile/Profile'
import NewTerrace from '../pages/NewTerrace/NTReview'
import TerraceList from '../pages/TerraceList/TerraceList'
import TerraceDetails from '../pages/TerraceDetails/TDetails'
import EditProfile from '../pages/EditProfile/EditProfile'
import ClosePage from '../pages/ClosePage.js/ClosePage'


const Routes = ({ storeUser, loggedUser }) => {

    return (
        <Switch>
            <Route path="/" exact render={() => <IndexPage />} />
            <Route path="/signup" render={props => <Signup {...props} />} />
            <Route path="/login" render={props => <Login {...props} storeUser={storeUser} />} />
            <Route path="/profile" render={() => loggedUser ? <Profile loggedUser={loggedUser} /> : <Redirect to="/" />} />
            <Route path="/editProfile/:id" render={props => <EditProfile {...props}  />} />
            <Route path="/terracelist" render={() => <TerraceList />} />
            <Route path="/terracedetails/:id" render={props => <TerraceDetails {...props} />} />
            <Route path="/newterrace" render={props => <NewTerrace {...props} />} />
            <Route path="/close" render={()=><ClosePage/>}/>

        </Switch>
    )
}

export default Routes