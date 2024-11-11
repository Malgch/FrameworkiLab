import PersonalInfo from "../components/PersonalInfo";
import AppReducer from '../data/AppReducer';
import React, { useState } from 'react';
import { useReducer } from 'react';

const Item = ({name, id}) => <li key={id}></li>;

function Lab1Page ( {names}) {
    const [state, dispatch] = useReducer(AppReducer, names);
    return (
        <>
        <h1>Laboratorium 1</h1>
        <h3>Lista imion</h3>
            {state.map((person) => <PersonalInfo  key={person.id} {...person} dispatch={dispatch}/>)}
        </>

    );
}

export default Lab1Page;