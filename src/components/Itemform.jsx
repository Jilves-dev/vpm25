import React from 'react';
import Button from '../shared/Button';
import useForm from '../shared/useForm';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ItemForm({ data, types, lifestyles, onItemSubmit, onItemDelete }) {
  const navigate = useNavigate();

  const submit = () => {
    let storedvalues = Object.assign({}, values);
    storedvalues.yp = parseFloat(storedvalues.yp);
    storedvalues.ap = parseFloat(storedvalues.ap);
    storedvalues.syke = parseFloat(storedvalues.syke);
    storedvalues.id = storedvalues.id ? storedvalues.id : uuidv4();
    // Varmista että lifestyle on array
    storedvalues.lifestyle = storedvalues.lifestyle || [];
    onItemSubmit(storedvalues);
    navigate("/");
  };

  const initialState = data ? { ...data, lifestyle: data.lifestyle || [] } : {
    pv: new Date().toISOString().substring(0, 10),
    apip: "aamu",
    klo: "",
    yp: 0,
    ap: 0,
    syke: 0,
    lisätieto: types ? types[0] : "",
    lifestyle: []
  };

  const { values, handleChange, handleSubmit, setValues } = useForm(submit, initialState, false);

  // Lifestyle checkbox handler (ei käytä handleChange koska on array)
  const handleLifestyleChange = (lifestyleName) => {
    setValues(prev => ({
      ...prev,
      lifestyle: prev.lifestyle.includes(lifestyleName)
        ? prev.lifestyle.filter(l => l !== lifestyleName)
        : [...prev.lifestyle, lifestyleName]
    }));
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onItemDelete(values.id);
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Päivä + aamu/ilta + klo */}
        <div className="flex gap-2 mb-2">
          <div className="flex flex-col flex-1 mx-1">
            <label htmlFor="pv" className="text-xs mb-2">pvm</label>
            <input type="date" name="pv" onChange={handleChange} value={values.pv} required
              className="p-2 border border-gray-400 rounded text-lg outline-none" />
          </div>
          <div className="flex flex-col flex-1 mx-1">
            <label htmlFor="apip" className="text-xs mb-2">aamu vai ilta?</label>
            <select name="apip" onChange={handleChange} value={values.apip} required
              className="p-2 border border-gray-400 rounded text-lg outline-none">
              <option value="aamu">aamu</option>
              <option value="ilta">ilta</option>
            </select>
          </div>
          <div className="flex flex-col flex-1 mx-1">
            <label htmlFor="klo" className="text-xs mb-2">klo</label>
            <input type="time" name="klo" onChange={handleChange} value={values.klo}
              className="p-2 border border-gray-400 rounded text-lg outline-none" />
          </div>
        </div>

        {/* Yläpaine + Alapaine */}
        <div className="flex gap-2 mb-2">
          <div className="flex flex-col flex-1 mx-1">
            <label htmlFor="yp" className="text-xs mb-2">yläpaine</label>
            <input type="number" name="yp" step="0.1" onChange={handleChange} value={values.yp} required
              className="p-2 border border-gray-400 rounded text-lg outline-none" />
          </div>
          <div className="flex flex-col flex-1 mx-1">
            <label htmlFor="ap" className="text-xs mb-2">alapaine</label>
            <input type="number" name="ap" step="0.1" onChange={handleChange} value={values.ap} required
              className="p-2 border border-gray-400 rounded text-lg outline-none" />
          </div>
        </div>

        {/* Syke */}
        <div className="flex gap-2 mb-2">
          <div className="flex flex-col flex-1 mx-1">
            <label htmlFor="syke" className="text-xs mb-2">syke</label>
            <input type="number" name="syke" step="0.1" onChange={handleChange} value={values.syke} required
              className="p-2 border border-gray-400 rounded text-lg outline-none" />
          </div>
        </div>

        {/* Vointi */}
        <div className="flex gap-2 mb-2">
          <div className="flex flex-col flex-1 mx-1">
            <label htmlFor="lisätieto" className="text-xs mb-2">vointi</label>
            <select name="lisätieto" onChange={handleChange} value={values.lisätieto} required
              className="p-2 border border-gray-400 rounded text-lg outline-none">
              {types && types.map((lisätieto) => (
                <option key={lisätieto} value={lisätieto}>{lisätieto}</option>
              ))}
            </select>
          </div>
        </div>

        {/* LIFESTYLE CHECKBOXES */}
        <div className="mx-1 mb-4">
          <label className="text-xs mb-2 block">elämäntapa</label>
          <div className="flex flex-wrap gap-2">
            {lifestyles && lifestyles.map((lifestyle) => (
              <label
                key={lifestyle}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-colors ${
                  values.lifestyle.includes(lifestyle)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={values.lifestyle.includes(lifestyle)}
                  onChange={() => handleLifestyleChange(lifestyle)}
                  className="hidden"
                />
                {values.lifestyle.includes(lifestyle) ? '✓' : '+'} {lifestyle}
              </label>
            ))}
          </div>
        </div>

        {/* Napit */}
        <div className="flex gap-2 mb-2">
          <div className="flex-1 mx-1">
            <Button onClick={handleCancel}>PERUUTA</Button>
          </div>
          <div className="flex-1 mx-1">
            <Button primary type="submit">{data ? "TALLENNA" : "LISÄÄ"}</Button>
          </div>
        </div>

        {onItemDelete && (
          <div className="flex gap-2">
            <div className="flex-1 mx-1">
              <Button onClick={handleDelete}>POISTA</Button>
            </div>
            <div className="flex-1 mx-1"></div>
          </div>
        )}
      </form>
    </div>
  );
}

export default ItemForm;