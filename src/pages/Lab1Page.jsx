import PersonalInfo from "../components/PersonalInfo";

const Item = ({name, id}) => <li key={id}></li>;

function Lab1Page ( {names}) {
    return (
        <>
        <h1>Laboratorium 1</h1>
        <h3>Lista imion</h3>
            {names.map((o) => <PersonalInfo  {...o}/>)}
        </>

    );
}

export default Lab1Page;