

export default function(state = [], action){
    switch (action.type){
        case "GET_CITIES":
            if(action.payload.query){
                return state;
            }
            let cities = action.payload.data.data.cities;
            return [...cities];
        default:
            return state;
    }
}