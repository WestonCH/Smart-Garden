import React from 'react';
import { Text, View ,TextInput,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {log_out} from "../actions";
import Login from './Login'
import TabBars from './TabBar';

class UserPage extends React.Component{
    render(){
        const {log_out}=this.props;
        if(this.props.user.hasLogin===true)
            return(
            <View style={{flex:1}}>
                <TabBars/>
            </View>);
        else return(
            <View>
                <Login/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps,{log_out})(UserPage);