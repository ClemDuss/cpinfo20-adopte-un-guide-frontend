import './Button.css';
import React from 'react';

export default class Button extends React.Component{
    render() {
        return (
            <div
                className={
                    `button
                    ${this.props.theme === 'error' ? ' button-error' : ''}
                    ${this.props.theme === 'success' ? ' button-success' : ''}
                    ${this.props.theme === 'primary' ? ' button-primary' : ''}
                    ${this.props.theme === 'green-mtn' ? ' button-green-mtn' : ''}
                    ${this.props.theme === 'white' ? ' button-white' : ''}
                    ${this.props.outlined ? ' outlined' : ''}`
                }
                onClick={this.props.onClick}
            >
                {this.props.children}
            </div>
        );
    }
}