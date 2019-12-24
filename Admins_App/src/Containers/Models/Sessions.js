import React, { Component } from 'react'
import {connect } from "react-redux";
import { getProfileFetch } from "../../Actions/AuthenticationActions"
import { LogoutAdmin }  from "../../Actions/AuthenticationActions"
import HeadingWrapper from "../../Components/Shared/HeadingWrapper"
import { connection } from "../../SignalR/Hubs"
import Spinner from '../../Components/Shared/Spinner'
import "../../Components/ComponentsStyle.css"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


class Sessions extends Component {
    constructor(props){
        super(props);
        this.state={
            columnDefs: [{
                headerName: "Active", field: "active", sortable:true,resizable: true, width:450
              },{
                headerName: "WinningNumbers", field: "winningNumbers",resizable: true, width:450
              },
              {
                headerName: "TotalTickets", field: "totalTickets", sortable:true,resizable: true, width:450
              },
              {
                headerName: "CreatedAt", field: "createdAt", sortable:true,resizable: true, width:450
              }
            ],
              rowData:[]
        }
    }

    componentDidMount = async () => {
       await this.props.getProfileFetch();

       connection.on("notifyAdmins",()=>{
        this.props.getProfileFetch();
        })
       
        connection.start()
    }

    componentWillReceiveProps(nextProps) {
        const sessions= nextProps.activeAdmin.sessions;
        if (this.props !== nextProps) {
         this.setState({
            rowData : sessions
         })
       }
    }

    render() {
        return (
            !this.props.isFetchingAdminData ? 
            <React.Fragment>
            <HeadingWrapper title = {"Admin sessions"} /> 
            <div 
                className="ag-theme-balham"
                style={{ 
                height: '500px', 
                width: '100%' ,
                overflow:"auto",
                marginTop:"5%"
                }} 
            >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}             
            >
               
            </AgGridReact>
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
        logoutAdmin : () => dispatch(LogoutAdmin())
    }
  }

  const mapStateToProps = state => {  
    return {
        activeAdmin : state.adminReducer.activeAdmin,
        isFetchingAdminData: state.adminReducer.isFetchingAdminData
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sessions);