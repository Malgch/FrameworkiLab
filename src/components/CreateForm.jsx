import { useContext, useState, useMemo } from "react";
import AppContext from "../data/AppContext";

function CreateForm() {
    const [errors, setErrors] = useState([]); //stan komunikatów błędów
    const[isSending, setSending] = useState(false); //sygnalizator wysyłania
    const {items, dispatch} = useContext(AppContext);

    const newId = useMemo(() => {
        if (!Array.isArray(items) || items.length === 0 ) return 1; {
        const maxId = Math.max(...items.map(user => user.id));
        return maxId +1;
        }
    }, [items])
    

    const onSubmit = async e => {
        e.preventDefault();
        const err = [];
        const data = new FormData(e.target); 

        const username = data.get("username").trim();
        const birthDate = data.get("birthDate").trim();
        const eyes = data.get("eyes").trim();
        const rating = data.get("rating").trim();


        console.log(errors);

        if(!username || username[0] !== username[0].toUpperCase()){
            err.push("Imię musi zaczynać się wielką literą.");
        }

        if(username.length < 3){
            err.push("Imię musi być dłuższe niż 3 znaki.");
        }

        var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        if(format.test(username)){
            err.push("Imię nie może zawierać znaków specjalnych")
        }

        if(isNaN(rating)){
            err.push("Rating musi być liczbą")
        }

        const today = new Date();
        if (new Date(birthDate) > today) {
            err.push("Data urodzenia nie może być w przyszłości");
        }

        if(err.length != 0) {
            setErrors(err);
            console.log("errors caught in loop")
            return;
        }
        
        // dane formularza są poprawne, wysyłamy lub przekazujemy do dispatch
        setErrors([]);
        setSending(true);
        alert("Dodano nowego użytkownika");

        await new Promise(res => setTimeout(res, 1000)); //symulacja fetch

        dispatch({
            type: "add",
            data: {
                id: newId,
                username,
                birthDate,
                eyes,
                rating,
            },
        });

        setSending(false);

        //czyszczenie formularza
        for(let key of data.keys()){
            e.target[key].value = "";
        }
    }

    return(
        <>
        {errors.length > 0 && (
            <div>
                {errors.map((error, index) => (
                    <span key={index} style={{ color: "red", display: "block" }}>
                        {error}
                    </span>
                ))}
            </div>
        )}
        
        <form onSubmit={onSubmit}>
            <h2>Formularz</h2>
            <label htmlFor="id">Id</label><br/>
            <input name="id" value={newId} readOnly/><br/>

            <label htmlFor="username">Imię</label><br/>
            <input name="username" required minLength="1" maxLength="20" placeholder="Imię"/><br/>

            <label htmlFor="birthDate">Data urodzenia</label><br/>
            <input name="birthDate" type="date" required /><br/>

            <label htmlFor="eyes">Oczy</label><br/>
            <select name="eyes"  required><br/>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="brown">Brown</option>
                <option value="grey">Grey</option>
                <option value="black">Black</option>
                <option value="amber">Amber</option>
                </select><br/>

            <label htmlFor="rating">Rating</label><br/>
            <input name="rating" type="number" min="0" max="10" required /><br/>


            <button disabled={isSending} type="submit">Save</button>
        </form>
        </>
    )
}
export default CreateForm;
