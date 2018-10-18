import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from "react-redux-toastr";

const toastrMessageOptions = {
    timeOut: 3000, // Default value is 0
    onShowComplete: () => console.log('SHOW: animation is done'),
    onHideComplete: () => console.log('HIDE: animation is done'),
    removeOnHover: false, // Default value is false
    removeOnHoverTimeOut: 1000, // Default value is 1000
    component: React.Component
};
export class Toastr extends Component{

    

    render(){
        const {dashboardError} = this.props
        toastr.error('Error', 'error', toastrMessageOptions)
      

        return(
            <div></div>
        )
    }
}

const mapStateToProps = state => {
    return { dashboardError: state.dashboard.dashboardError }
}



export default connect(mapStateToProps, null)(Toastr)