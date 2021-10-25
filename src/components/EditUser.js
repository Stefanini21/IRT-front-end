import React, { Component } from 'react';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user
        }
    }

    render() {
        return (
            <div>
                <h2>In edit user!</h2>
            </div>
        )
    }


}

export default EditUser;