import React, { Component } from 'react';

class Wrapper extends Component {
    componentWillMount = () => {
        this.props.load.then((Component) => {
            this.Component = Component
            this.forceUpdate();
        });
    }

    render = () => (
        this.Component ? <this.Component.default /> : null
    )
}

export default Wrapper;