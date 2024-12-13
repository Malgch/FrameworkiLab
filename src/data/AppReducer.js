
export default function AppReducer(state, action) {
    if (!Array.isArray(state)) {
        state = Object.values(state); // Normalize into an array
    }
    switch (action.type) {
        case "edit": {
            console.log("Reducer Edit action", state)
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
            console.log("selected user in reducer", action.id);
            return {
                ...state,
                select: action.id,
            };
        }
        case "delete": {
            return state.filter((item) => item.id !== action.id);
        }
        case "add": {
            console.log("Reducer action added user", action.data);
            return [...state, action.data]; 
        }
        default:
            return state;
    }
}


