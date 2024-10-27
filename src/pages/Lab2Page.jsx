import { useParams } from "react-router-dom";
import {data} from '../data/module-data';

function Lab2Page ( ) {
    const {id} = useParams();

    const personId = id ? parseInt(id, 10) : null;
    const person = personId ? data.find(p => p.id === personId) : null;

    if(!id) {
        return <p>Brak identyfikatora osoby</p>;
    }

    if(!person) {
        return <p>nie znaleziono osoby o tym identyfikatorze</p>;
    }

    return (
    <div>
      <h1>Profil Osoby</h1>
      <p><strong>Imię:</strong> {person.name}</p>
      <p><strong>Data urodzenia:</strong> {person.birth}</p>
      <p><strong>Kolor oczu:</strong> {person.eyes}</p>
    </div>
    );
}

export default Lab2Page;