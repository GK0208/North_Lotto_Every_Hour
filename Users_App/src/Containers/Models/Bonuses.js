import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import { LogoutUser }  from "../../Actions/AuthenticationActions"
import { AcceptBonus } from "../../Actions/UserActions"
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import BonusCard from "../../Components/Shared/BonusCard"
import "../../Components/ComponentsStyle.css"
import { restore } from "../../Actions/AuthenticationActions"
import { connection } from "../../SignalR/Hubs"
import Spinner from '../../Components/Shared/Spinner'

class Bonuses extends Component {

    componentDidMount = async () => {
        this.props.getProfileFetch();

        connection.on("alertUsers",()=>{
            this.props.getProfileFetch();
        })
           
        connection.start()
    }

    componentDidUpdate(){
        if (this.props.success.length > 0) {
            alert(this.props.success)
            this.props.restore();
        }

        if (this.props.error.length > 0){
            alert(this.props.error);
            this.props.restore()
        }
    }

    confirmBonus = (id) =>{
        this.props.acceptBonus(id);
    }

    render() {
        var bonuses = this.props.activeUser.bonuses;
        var { isLoggedIn, isFetchingUserData } = this.props;
        return (     
            !isFetchingUserData && isLoggedIn ? 
                <React.Fragment>
                    { bonuses && bonuses.length ? <HeadingWrapper title = {`Bonus confirmation `} /> : <HeadingWrapper title = {`You don't have additional bonuses `} /> }
                    <div className="bonusCardWrapper">
                    {bonuses.map((bonus,index) => <BonusCard confirmBonus ={(id) => this.confirmBonus(id)} bonus={bonus} key={index}/>)}
                    </div>
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
        acceptBonus : (id) => dispatch(AcceptBonus(id)), 
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(Bonuses);