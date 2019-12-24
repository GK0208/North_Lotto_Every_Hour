import React, { Component } from 'react'
import {connect } from "react-redux";
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import UserTicketsTable from '../../Components/UserTickets/UserTicketsTable';
import { getUserTickets } from "../../Actions/UserActions";
import Pagination from "react-js-pagination";
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import Spinner from '../../Components/Shared/Spinner'
import { LogoutUser }  from "../../Actions/AuthenticationActions"
import TicketFilters from "../../Components/UserTickets/TicketFilters"
import "../../Components/ComponentsStyle.css";
import { connection } from "../../SignalR/Hubs";


class UserTickets extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activePage: 1,
          selectedOption: 'All'
        };
    }

    handlePageChange(pageNumber) { 
         this.setState({activePage : pageNumber});
         this.props.getUserTickets(pageNumber, this.state.selectedOption)
    }

    componentDidMount = async () => {
        await this.props.getProfileFetch()
        this.props.getUserTickets(this.state.activePage, this.state.selectedOption)           
        connection.on("alertUsers",() => {        
            this.props.getProfileFetch()
            this.props.getUserTickets(this.state.activePage, this.state.selectedOption)
        })          
        connection.start().then(function () {
            console.log("connected");
        });
        
    }

    handleOptionChange = (e) => {
        let selectedOption = e.target.value
        this.setState({
            activePage : 1,
            selectedOption           
        })
        this.props.getUserTickets(1, selectedOption)
    }

    render() {
        var activeUser=this.props.activeUser;
        var tickets= Object.entries(this.props.activeUser).length !== 0 ? this.props.userTickets : null ;     
        var index = Object.entries(this.props.activeUser).length !== 0  ? this.props.activeUser.userName.indexOf("@") : null
        var { isFetchingUserData, isLoggedIn } = this.props;
        return ( 
            !isFetchingUserData && isLoggedIn ?
            <React.Fragment>
                <HeadingWrapper title={`${this.props.activeUser.userName.substring(index,this.props.activeUser.length-index)}'s tickets`} />
                <TicketFilters handleOptionChange={this.handleOptionChange} selectedOption={this.state.selectedOption}/>
                <div className="ticketTableWrapper" style={{display:"block"}}>    
                    <UserTicketsTable 
                        ticketsLength={activeUser.ticketsLength} 
                        tickets={tickets} 
                        activePage={this.state.activePage} 
                        handlePageChange={()=>this.handlePageChange()}
                    />
                </div>
                {tickets.length ?
                    <Pagination
                        className="pagination"
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={tickets ? this.props.userTicketsLength : 0}
                        onChange={(e)=>this.handlePageChange(e)}
                    /> : null
                }
            </React.Fragment>
            : 
            <Spinner />            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfileFetch: () => dispatch(getProfileFetch()) ,
        getUserTickets : (page,options) => dispatch( getUserTickets(page,options)),
        logoutUser : () => dispatch(LogoutUser())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeUser : state.lottoReducer.activeUser,
        userTickets : state.userReducer.userTickets,
        userTicketsLength : state.userReducer.userTicketsLength,
        isLoggedIn: state.lottoReducer.isLoggedIn,
        isFetchingUserData: state.lottoReducer.isFetchingUserData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserTickets);