import { useState } from 'react';

const useForm = (callback, initialState={}, resetOnSubmit=true) => {
    //esitellään usestate hook johon käyttäjän 
    //lomakkeelle syöttämätieto tallennetaan
    //initialState = se mitä syötetty tai {} tyhjä ?
    const [values, setValues] = useState(initialState);
    //submit estää oletustoiminnan ja
    //ja kutsuu määriteltyä callback funkkii
    const handleSubmit = (event) => { 
        if (event) {
            event.preventDefault();
        }
        callback();
        if(resetOnSubmit) resetValues();
    }

  
    //syötekäsittelijä joka tekee muutoksen tallentaa kentän tiedot state muuttujaan
    //event = lomakkeella tapahtuvat muutos
    const handleChange = (event) => {
         //event kautta tapahtunut tapahtuma säilyy
        event.persist();
        // tallennetaan kenttään syötetty arvo välimuuttujaan
         let value = event.target.value;
        // päivitetään setvalues valueksi
        //ei voi tallentaa suoraan values niin polun kautta
        //palauttaa js olio .. ensin nykyinen purettuna auki ...values sen perään muutettu arvo [event target]: value
        setValues(values => ({...values, [event.target.name]: value}));
    }
    //funk joka palauttaa lomakkeen tiedot alkutilanteeseen
    const resetValues = () => {
        setValues(initialState);
    }
    //palauta luonnin yhteydessä sekä käsittelijät + state muuttuja
    return {
        handleSubmit,
        handleChange,
        resetValues,
        setValues,
        values
    }
} 

export default useForm;