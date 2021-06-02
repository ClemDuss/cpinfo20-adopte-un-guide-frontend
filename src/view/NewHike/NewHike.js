import React from 'react';
import './NewHike.css';

export default class NewHike extends React.Component{
    super(props){
        console.log(this.props.msg)
    }

    render(){
        return(
            <div className={"new-hike"}>
                New Hike
            </div>
        )
    }
}