import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ProfileTop from './profileTop/profileTop'
import PublicDashboard from './publicDashboard/publicDashboard'
import PublicFeed from './publicFeed/publicFeed'
import './publicProfile.css'
import { login } from '../auth/authActions'
import UserProfile from './userProfile/userProfile';
import { getPublicProfile } from './publicProfileActions'
import { loadState } from '../common/helpers/localStorage'
import { setFollow, setUnfollow, getFollow } from '../traderList/traderListActions'


export class PublicProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeScreen: 1
        }
        this.handleScreen = this.handleScreen.bind(this)
        this.whatToRender = this.whatToRender.bind(this)
        this.isOwner = this.isOwner.bind(this)
    }



    componentWillMount() {

        const { pathname } = this.props.location
        const { getPublicProfile, userAuthenticated, login, history } = this.props
        
        const userId = parseInt(pathname.substr(pathname.lastIndexOf('/') + 1, pathname.length - pathname.lastIndexOf('/')))

        if (userAuthenticated === 'initial') {
            login()
        }
        if(userAuthenticated && isNaN(userId)){
            history.push('/publicProfile/' + loadState("identity").username.usernameId)
        }
        if(!userAuthenticated && isNaN(userId)){
            history.push('/traderList')
        } 

        if(!isNaN(userId)){
            this.setState({ userId: parseInt(userId) })
            getPublicProfile(userId)
            getFollow()
        }
            
        
        
    }
    handleScreen(activeScreen) {
        this.setState({ activeScreen })
    }

    isOwner() {
        const { userId } = this.state
        const identity = loadState("identity")
        if(identity)
            return parseInt(userId) === parseInt(identity.username.usernameId)
        return false
    }

    whatToRender() {
        const { activeScreen } = this.state
        const { userId } = this.state
        if (activeScreen === 0)
            return <PublicFeed />
        else if (activeScreen === 1)
            return <PublicDashboard
                userId={userId} />
        else if (activeScreen === 2)
            return <UserProfile />
    }
    render() {
        const { publicProfile, setFollow, setUnfollow, followingList } = this.props
        const { userId } = this.state
        const profileBody = this.whatToRender()
        const isOwner = this.isOwner()
        return (
            <div>
                <ProfileTop
                    profile={publicProfile}
                    handleScreen={this.handleScreen}
                    userId={userId}
                    isOwner={isOwner}
                    setFollow={setFollow}
                    setUnfollow={setUnfollow}
                    following={followingList.filter((following) => following.usernameId === userId)
                        .length > 0 ? true : false} />
                
                <div className="profile-body">
                    {
                        profileBody
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => (
    {
        publicProfile: state.publicProfile.profile,
        userAuthenticated: state.auth.userAuthenticated,
        followingList: state.traderList.followingList

    }
)

const mapDispatchToProps = dispatch => (
    (bindActionCreators({ login, getPublicProfile, setFollow, setUnfollow, getFollow }, dispatch))
)

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile)
