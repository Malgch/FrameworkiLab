import { useContext, useState } from "react";
import AppContext from "../data/AppContext";

function CreateForm() {
    const [errors, setErrors] = useState([]); //stan komunikatów błędów
    const[isSending, setSending] = useState(false); //sygnalizator wysyłania
    const dispatch = useContext(AppContext).dispatch;

    const id = Math.floor(Math.random() * 100000);

    const onSubmit = async e => {
        e.preventDefault();
        const err = [];
        const data = new FormData(e.target); 

        const username = data.get("username").trim();
        const surname = data.get("surname").trim();
        const email = data.get("email").trim();
        const passwordField = data.get("passwordField").trim();
        const confirmPassword = data.get("confirmPassword").trim();

        console.log(errors);

        if(!username || username[0] !== username[0].toUpperCase()){
            err.push("Imię musi zaczynać się wielką literą.");
        }

        if(!surname || surname[0] !== surname[0].toUpperCase()){
            err.push("Nazwisko musi zaczynać się wielką literą");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            err.push("Podaj poprawny adres e-mail.");
        }

        if (passwordField.length < 3) {
            err.push("Hasło musi zawierać co najmniej 3 znaki");
        }

        if (passwordField !== confirmPassword) {
            err.push("Hasła muszą się zgadzać.");
        }

        if(err.length != 0) {
            setErrors(err);
            console.log("errors caught in loop")
            return;
        }
        
        // dane formularza są poprawne, wysyłamy lub przekazujemy do dispatch
        setErrors([]);
        setSending(true);


        await new Promise(res => setTimeout(res, 1000)); //symulacja fetch

        dispatch({
            type: "add",
            data: {
                id,
                username,
                surname,
                email,
                password: passwordField,
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
            <input name="id" value={id} readOnly/><br/>

            <label htmlFor="username">Imię</label><br/>
            <input name="username" required minLength="1" maxLength="20" placeholder="Imię"/><br/>

            <label htmlFor="surname">Nazwisko</label><br/>
            <input name="surname" required minLength="1" maxLength="20"/><br/>

            <label htmlFor="email">E-mail</label><br/>
            <input name="email" type="email" required placeholder="john@doe.com" /><br/>

            <label htmlFor="passwordField">Hasło</label><br/>
            <input name="passwordField" type="password" required /><br/>

            <label htmlFor="confirmPassword">Potwierdź hasło</label><br/>
            <input name="confirmPassword" type="password" required /><br/>

            <button disabled={isSending} type="submit">Save</button>
        </form>
        </>
    )
}
export default CreateForm;
