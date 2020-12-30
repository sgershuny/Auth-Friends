import axios from 'axios';
//INVEST IN BIGGEST MALAYSIAN FOOD SUPPLIER UK

export const LOGIN_SUCCESS = "LOGIN_SUCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_FAILURE = "LOGIN_FAILURE";


export const loginRequest = (credentials) => (dispatch) => {
    dispatch({type: LOGIN_LOADING})
    console.log("ACTION CALLED!!")
    return (
        axios.post("http://localhost:5000/api/login",credentials)
        .then( res => {
            console.log(res)
            localStorage.setItem('token',res.data.payload)
        })
        .catch(err => {
            dispatch({type: LOGIN_FAILURE});
        })
    )
}

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";

export const getData = () => dispatch => {
    dispatch({type: FETCH_DATA_START})
    axios
        .get("http://localhost:5000/api/friends", {
            headers: {Authorization: localStorage.getItem('token')}
        })
        .then(res => {
            console.log(res);
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
            if(err.response.status === 403){
                localStorage.removeItem('token');
            }
            dispatch({
                type: FETCH_DATA_FAILURE,
                payload: err
            })
        })
}

export const FRIEND_ADD = "FRIEND_ADD";
//export const FRIEND_ADD_FAILED = "FRIEND_ADD_FAILED";

export default function authorize() {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        }
    });
};

export const addFriend = (friend) => (dispatch) => {
    console.log("FRIEND ADD CALLED", friend)
    authorize().post("http://localhost:5000/api/friends",friend)
        .then(res => {
            console.log(res)
            dispatch({
                type: FRIEND_ADD,
                payload: friend
            })
        })
        .catch(err => console.log(err))
}
