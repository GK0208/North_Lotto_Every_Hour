import React, { Component } from 'react'
import {connect } from "react-redux";
import { getProfileFetch,LogoutAdmin } from "../../Actions/AuthenticationActions"
import { getWinners } from "../../Actions/AdminActions"
import Spinner from '../../Components/Shared/Spinner'
import  WinnerTable  from "../../Components/Tables/WinnerTable"
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import Pagination from "react-js-pagination";
import WinnersFilter from "../../Components/Filters/WinnersFilter"
import "../../Components/ComponentsStyle.css"
import { connection } from "../../SignalR/Hubs"


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

        connection.on("notifyAdmins",()=>{
            this.props.getProfileFetch();
            this.props.getWinners(this.state.activePage,this.state.selectedOption);
        })
           
        connection.start()     
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
        return (
               !this.props.isFetchingAdminData ?
                <React.Fragment>
                    <HeadingWrapper title={"North Lotto Every Hour Winners"} />  
                    <div  style={{display:"flex",marginTop:"2%",marginLeft:"10%",marginBottom:"0px"}}>
                        <WinnersFilter  handleOptionChange={this.handleOptionChange} handleInputUser={this.handleInputUser} />        
                    </div> 
                    <div className="winnersWrapper">    
                        <WinnerTable winners={this.props.winners} />   
                    </div>  
                    <Pagination
                            className="pagination"
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={winners ? this.props.winnersLength : 0}
                            onChange={(e)=>this.handlePageChange(e)}
                        />             
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
        logoutAdmin : () => dispatch(LogoutAdmin())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeAdmin : state.adminReducer.activeAdmin,
        winners : state.lottoReducer.winners,
        winnersLength : state.lottoReducer.winnersLength,
        isFetchingAdminData: state.adminReducer.isFetchingAdminData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Winners);