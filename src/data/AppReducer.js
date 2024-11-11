
export default function AppReducer(state, action){
    switch(action.type){
        case "edit":
            return state.map(person =>
                person.id === action.id
                  ? { ...person, name: action.newName } : person );
        case "rate":{
            return state.map(person =>
                person.id === action.id
                  ? { ...person,  rating: (person.rating + 1) % 11 }: person );
        }
        case "delete":
            return state.filter(person => person.id !== action.id);       
    }
}