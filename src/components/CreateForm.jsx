import { useContext, useState } from "react";
import AppContext from "../data/AppContext";

function CreateForm() {
    const [errors, setErrors] = useState([]);
    const[isSending, setSending] = useState(false);
    const dispatch = useContext(AppContext).dispatch;

    const onSubmit = async e => {
        const err = [];
        e.preventDefault();
        const data = new FormData(e.target); 
        const title = data.get("title");

        console.log(errors);

        if(title.slice(0,1) !== title.slice(0,1).toUpperCase()){
            err.push("Tytuł zadania musi być z wielkiej litery");
        }

        //if () --tu można dopisać więcej warunkow 

        if(errors.length != 0) {
            setErrors(err);
            return;
        }
        // dane formularza są poprawne, wysyłamy lub przekazujemy do dispatch
        setSending(true);


        await new Promise(res => setTimeout(res, 1000)); //symulacja fetch

        dispatch({
            type: "add",
            data: {}
        });

        setSending(false);
        setErrors([]);

        //czyszczenie formularza
        for(let key of data.keys()){
            e.target[key].value = "";
        }
    }

    return(
        <>
        {errors.map(e => <span>{e}</span>)}
        <form onSubmit={onSubmit}>
            <label htmlFor="title">Tytuł zadania</label>
            <input name="title" required minLength="3" maxLength="20"/>
            <button disabled={isSending} type="submit">Save</button>
        </form>
        </>
    )
}
export default CreateForm;
