import React from 'react';
import { connect } from 'react-redux';


import { getData,addFriend } from '../actions/actions';

class FriendsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            friend: {
                name: '',
                age: '',
                email: '',
                id: ''
            }
        }
    }
    componentDidMount(){
        this.props.getData()
    }

    handleChange = e => {
        e.preventDefault();
 
        this.setState({

            friend:{
                ...this.state.friend,
                [e.target.name]: e.target.value,
                id: this.props.friends.length+1
            }

        })
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.state.name!== '' && this.state.age !== '' && this.state.email !== ''){
            this.props.addFriend(this.state.friend)
        }
    }

    render(){
        console.log(this.state.friend)
        return(
            <div>
                {this.props.friends.map(friend => {
                    return(
                        <div key = {friend.id}>
                            <h1>
                                {friend.name}
                            </h1>
                            <h4>{friend.email}</h4>
                            <h4>{friend.age}</h4>
                        </div>
                    )
                })}

                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        placeholder= "Name" 
                        name = 'name'
                        onChange = {this.handleChange}
                    />
                    <input 
                        type="email" 
                        placeholder= "E-mail" 
                        name = 'email'
                        onChange = {this.handleChange}
                    />
                    <input 
                        type="age" 
                        placeholder= "Age"
                        name = 'age'
                        onChange = {this.handleChange}
                    />
                    <input type="submit" onClick={this.handleSubmit}/>
                </form>
            </div>
            
        )
    }
}


const mapStateToProps = state => {
    return{
        friends: state.friends,
        fetchingData: state.fetchingData
    }
}
export default connect(mapStateToProps,{ getData,addFriend })(FriendsList);