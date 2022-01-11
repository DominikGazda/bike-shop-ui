export default function addOrder(order){

    return function(dispatch){
        dispatch({type:'ADD_ORDER'})
    }
}