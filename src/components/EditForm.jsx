import { useForm } from "react-hook-form";
import { useContext, useEffect} from "react";
import AppContext from "../data/AppContext";
import { useParams } from "react-router-dom";

function EditForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { items, dispatch } = useContext(AppContext);
    const { id } = useParams();

    const itemToEdit = items.find((item) => item.id === parseInt(id, 10));

    useEffect(() => {
        if (itemToEdit) {
            reset(itemToEdit);
        }
    }, [itemToEdit, reset]);

    if (!itemToEdit) {
        return <p>User not found</p>;
    }

    const onSubmit = (data) => {
        dispatch({
            type: "edit",
            id: parseInt(data.id, 10), 
            updatedFields: data,
        });
        alert("Record updated successfully!");
    };

    //validacje
    const nameValidation = (name) => {

        if (!/^[A-Z]/.test(name)) {
            return "Imię musi zaczynać się z wielkiej litery";
        }
        if (/[^a-zA-Z\s]/.test(name)) {
            return "Imię nie może zawierać cyfr ani znaków specjalnych";
        }
        return true;
    };

    const validateBirthDate = (birthDate) => {
        const today = new Date();
        const selectedDate = new Date(birthDate);
        return selectedDate <= today || "Data urodzenia nie może być w przyszłości";
    };

    //FORM
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="id">ID</label><br/>
            <input type="text" value={itemToEdit.id} readOnly/>

            <label htmlFor="name">Imię</label><br/>
            <input
                {...register("name", {
                    required: "Imię jest wymagane",
                    maxLength: { value: 20, message: "Imię nie może być dłuższe niż 20 znaków" },
                    minLength: { value: 2, message: "Imię nie może być krótsze niż 2 znaki" },
                    validate: nameValidation,
                })}
            /><br/>
            {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

            <label htmlFor="birth">Data urodzenia</label><br/>
            <input
                type="date"
                {...register("birth", {
                    required: "Data urodzenia jest wymagana",
                    validate: validateBirthDate,
                })}
            />
            {errors.birth && <p style={{ color: "red" }}>{errors.birth.message}</p>}

            <label htmlFor="eyes">Eye Color</label>
            <select
                {...register("eyes", {
                    required: "Kolor oczu jest wymagany",
                })}
            >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="brown">Brown</option>
                <option value="grey">Grey</option>
                <option value="black">Black</option>
                <option value="amber">Amber</option>
            </select>
            {errors.eyes && <p style={{ color: "red" }}>{errors.eyes.message}</p>}

            <label htmlFor="rating">Rating</label>
            <input
                type="number"
                min="0"
                max="10"
                {...register("rating", {
                    required: "Rating jest wymagany",
                    valueAsNumber: true,
                    min: { value: 0, message: "Rating musi wynosić przynajmniej 0" },
                    max: { value: 10, message: "Rating musi wynosić 10 lub mniej" },
                })}
            />
            {errors.rating && <p style={{ color: "red" }}>{errors.rating.message}</p>}

            <button type="submit">Save</button>
        </form>
    );
}

export default EditForm;