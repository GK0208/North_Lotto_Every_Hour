import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import { getWinners } from "../../Actions/UserActions"
import  WinnerTable  from "../../Components/Winners/WinnerTable"
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import Pagination from "react-js-pagination";
import { LogoutUser }  from "../../Actions/AuthenticationActions"
import WinnersFilter from "../../Components/Winners/WinnersFilter"
import "../../Components/ComponentsStyle.css"
import { connection } from "../../SignalR/Hubs"
import Spinner from '../../Components/Shared/Spinner'

class Winners extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activePage: 1,
          selectedOption: 'All',
          userInput:""
        };
      }

    componentDidMount = async () => {
        await this.props.getProfileFetch();
        this.props.getWinners(this.state.activePage,this.state.selectedOption);

        connection.on("alertUsers",()=>{
            this.props.getProfileFetch();
            this.props.getWinners(this.state.activePage,this.state.selectedOption);
           })
           
           connection.start().then(function () {
            console.log("connected");
           });       
    }

    handlePageChange(pageNumber) { 
        this.setState({activePage: pageNumber});
        this.props.getWinners(pageNumber,this.state.selectedOption,this.state.userInput)
    }

    handleOptionChange = (e) => {
        let selectedOption=e.target.value
        this.setState({
            activePage:1,
            selectedOption           
        })
        this.props.getWinners(1,selectedOption,this.state.userInput)
    }
    handleInputUser = (e) => {
        let userInput=e.target.value
        this.setState({
            activePage:1,
            userInput           
        })
        this.props.getWinners(1,this.state.selectedOption,userInput)
    }

    render() {
        const winners = this.props.winners;
        var { isFetchingUserData, isLoggedIn } = this.props;
        return (
               !isFetchingUserData && isLoggedIn ?
                <React.Fragment>
                    <HeadingWrapper title={"North Lotto 7/36 Winners"} />  
                    <div  style={{display:"flex",marginTop:"2%",marginLeft:"10%",marginBottom:"0px"}}>
                        <WinnersFilter  handleOptionChange={this.handleOptionChange} handleInputUser={this.handleInputUser} />        
                    </div> 
                    <div className="winnersWrapper">    
                        <WinnerTable winners={this.props.winners} />   
                    </div>  
                    {winners.length ?
                        <Pagination
                            className="pagination"
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={winners ? this.props.winnersLength : 0}
                            onChange={(e)=>this.handlePageChange(e)}
                        />   : null
                    }          
                </React.Fragment>
                : 
                <Spinner />            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileFetch : () => dispatch(getProfileFetch()),
        getWinners : (page,filter,userInput) => dispatch(getWinners(page,filter,userInput)),
        logoutUser : () => dispatch(LogoutUser())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeUser : state.lottoReducer.activeUser,
        winners : state.lottoReducer.winners,
        winnersLength : state.lottoReducer.winnersLength,
        isLoggedIn: state.lottoReducer.isLoggedIn,
        isFetchingUserData: state.lottoReducer.isFetchingUserData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Winners);

