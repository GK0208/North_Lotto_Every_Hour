import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import { LogoutUser }  from "../../Actions/AuthenticationActions"
import Welcome from "../../Components/Shared/WelcomeJumbotron"
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import "../../Components/ComponentsStyle.css"
import Subscribe from "../../Components/Shared/Subscribe"
import { subscribeUser } from "../../Actions/UserActions"
import { restore } from "../../Actions/AuthenticationActions"
import Spinner from '../../Components/Shared/Spinner'

 class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            subscribeEmail : ""
        }
    }

    componentDidMount = () => {
        this.props.getProfileFetch();
    }


    componentWillReceiveProps(nextProps){
        if (this.state.subscribeEmail !== nextProps.activeUser.userName){
            this.setState({
                subscribeEmail: nextProps.activeUser.userName
            })
        }

        if (nextProps.success && this.props.success !== nextProps.success) {
            alert(nextProps.success)
            this.props.restore();
        }

        if (nextProps.error && this.props.error !== nextProps.error){
            alert(nextProps.error);
            this.props.restore()
        }
    }

    handleSubscription = () => {
        const subscriber = this.state.subscribeEmail
        this.props.subscribeUser(subscriber)
    }

    render() {
        var { isFetchingUserData, isLoggedIn } = this.props
        return (     
            !isFetchingUserData && isLoggedIn ? 
                <React.Fragment>
                    <HeadingWrapper title = {`Welcome to Lotto Every Hour `} />
                    <Welcome user = {this.props.activeUser}/>
                    <Subscribe subscriber ={this.state.subscribeEmail} handleSubscription={() => this.handleSubscription()}/>
                </React.Fragment>
            :
            <Spinner />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileFetch : () => dispatch(getProfileFetch()),
        logoutUser : () => dispatch(LogoutUser()),
        subscribeUser : (subscriber) => dispatch(subscribeUser(subscriber)),
        restore : () => dispatch(restore())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeUser : state.lottoReducer.activeUser,
        success : state.lottoReducer.success,
        error : state.lottoReducer.error,
        bonuses : state.userReducer.bonuses,
        isLoggedIn: state.lottoReducer.isLoggedIn,
        isFetchingUserData: state.lottoReducer.isFetchingUserData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);