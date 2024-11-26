
export default function AppReducer(state, action) {
    switch (action.type) {
        case "edit":{
            console.log("Updated Fields:", action.updatedFields);
            return state.map((item) =>
                item.id === action.id
                    ? { ...item, ...action.updatedFields }
                    : item
            );
        }
        case "rate":{
            return state.map(person =>
                person.id === action.id
                    ? { ...person, rating: (person.rating + 1) % 11 }
                    : person
            );
        }
        case "select": {
            return {
                ...state,
                selectedId: action.id,
            };
        }
        case "delete":
            return state.filter(person => person.id !== action.id);

        default:
            return state; 
    }
}


