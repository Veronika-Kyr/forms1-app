import React, { createRef, useState } from "react";
import './UserForm.css';

export default function UserForm() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        age: '',
        employed: 'false',
        color: '',
        stoodge: 'larry',
        sauces: [],
        notes: ''
    });
    const [disabledBtn, setdisabledBtn] = useState('disabled');
    const [clickSubmit, setclickSubmit] = useState(false);
    const form = createRef();
    const [ageclassName, setageclassName] = useState('inputEqualWidth');
    const [firstnameclassName, setfirstnameclassName] = useState('inputEqualWidth');
    const [lastnameclassName, setlastnameclassName] = useState('inputEqualWidth');
    const [notesclassName, setnotesclassName] = useState('inputEqualWidth');

    function resetData(e) {
        if (!disabledBtn) {
            setdisabledBtn('disabled');
            setFormState({
                firstName: '',
                lastName: '',
                age: '',
                employed: 'false',
                color: '',
                stoodge: 'larry',
                sauces: [],
                notes: ''
            });
            setclickSubmit(false);
            setageclassName('inputEqualWidth');
            setfirstnameclassName('inputEqualWidth');
            setlastnameclassName('inputEqualWidth');
            setnotesclassName('inputEqualWidth');
            form.current.reset();
        }
    };

    function changeState(value, field) {
        const clone = { ...formState };
        clone[field] = value;
        setFormState(clone);
    }

    function handleSauces(event) {
        let arrOFsauces = [...formState.sauces];
        if (event.target.checked) {
            arrOFsauces.push(event.target.value);
        }
        else {
            arrOFsauces.splice(arrOFsauces.indexOf(event.target.value), 1);
        };
        changeState(arrOFsauces, 'sauces');
    }

    function fieldValidator() {
        let s = 0;
        if (!/^\d+$/.test(formState.age)) { setageclassName('redBorder') } else { s = s + 1; }
        if (!/^[a-zA-Z\s]+$/.test(formState.firstName)) { setfirstnameclassName('redBorder'); } else { s = s + 1; }
        if (!/^[a-zA-Z\s]+$/.test(formState.lastName)) { setlastnameclassName('redBorder'); } else { s = s + 1; }
        if (formState.notes && formState.notes.length > 100) { setnotesclassName('redBorder'); } else { s = s + 1; }
        if (s === 4) { return true } else alert('Correct your inputs!');
    }

    function submitData(event) {
        event.preventDefault();
        setclickSubmit(true);
        let respValid = fieldValidator();
        if (respValid) {
            setageclassName('inputEqualWidth');
            setfirstnameclassName('inputEqualWidth');
            setlastnameclassName('inputEqualWidth');
            setnotesclassName('inputEqualWidth');
            alert(JSON.stringify(formState));
        }
    }

    return (
        <div className="userForm">
            <form onSubmit={submitData} onChange={() => { setdisabledBtn(false) }} ref={form} >
                <div className="choice">
                    <div>First Name</div>
                    <div>
                        <label className="general">
                            <input className={firstnameclassName} type="text" onChange={(event) => {
                                if (!clickSubmit) { changeState(event.target.value, 'firstName') }
                                else {
                                    if (!/^[a-zA-Z\s]+$/.test(event.target.value)) { setfirstnameclassName('redBorder'); }
                                    else {
                                        changeState(event.target.value, 'firstName')
                                        setfirstnameclassName('inputEqualWidth');
                                    }
                                }
                            }} placeholder='First Name' />
                        </label>
                    </div>
                </div>
                <div className="choice">
                    <div>Last Name</div>
                    <div>
                        <label className="general">
                            <input className={lastnameclassName} type="text" onChange={(event) => {
                                if (!clickSubmit) { changeState(event.target.value, 'lastName') }
                                else {
                                    if (!/^[a-zA-Z\s]+$/.test(event.target.value)) { setlastnameclassName('redBorder'); }
                                    else {
                                        changeState(event.target.value, 'lastName');
                                        setlastnameclassName('inputEqualWidth');
                                    }
                                }
                            }} placeholder='Last Name' />
                        </label>
                    </div>
                </div>
                <div className="choice">
                    <div>Age</div>
                    <div>  <label className="general">
                        <input type="text" className={ageclassName} onChange={(event) => {
                            if (!clickSubmit) { changeState(event.target.value, 'age') }
                            else {
                                if (!/^\d+$/.test(event.target.value)) { setageclassName('redBorder'); }
                                else {
                                    changeState(event.target.value, 'age');
                                    setageclassName('inputEqualWidth');
                                }
                            }
                        }} placeholder='Age' />
                    </label></div>
                </div>
                <div className="choice">
                    <div>Employed</div>
                    <div>  <label className="empl"> <input type="checkbox" name="empl" value="false" onChange={() => changeState(true, 'employed')} />  </label></div>
                </div>
                <div className="choice">
                    <div>Fafourite Color</div>
                    <div>
                        <label>
                            <select name="color" className="inputEqualWidth" onChange={(event) => { changeState(event.target.value, 'color') }}>
                                <option value="red"></option>
                                <option value="red">red</option>
                                <option value="green">green</option>
                                <option value="blue">blue</option>
                                <option value="violet">violet</option>
                            </select>
                        </label></div>
                </div>
                <div className="choice">
                    <div className="head">Sauces</div>
                    <div>
                        <label className="sauces"><input type="checkbox" value="ketchup" checked={formState.sauces.includes('ketchup')} onChange={handleSauces} /> Ketchup  </label>
                        <label className="sauces">  <input type="checkbox" value="mustard" checked={formState.sauces.includes('mustard')} onChange={handleSauces} /> Mustard  </label>
                        <label className="sauces">  <input type="checkbox" value="mayonnaise" checked={formState.sauces.includes('mayonnaise')} onChange={handleSauces} /> Mayonnaise  </label>
                        <label className="sauces">  <input type="checkbox" value="guacamole" checked={formState.sauces.includes('guacamole')} onChange={handleSauces} /> Guacamole  </label>
                    </div>
                </div>
                <div className="choice">
                    <div>Best Stoodge</div>
                    <div>
                        <label className="stoodge"> <input defaultChecked type="radio" name="group1" value="larry" onChange={(event) => { changeState(event.target.value, 'stoodge') }} /> Larry</label>
                        <label className="stoodge"> <input type="radio" name="group1" value="moe" onChange={(event) => { changeState(event.target.value, 'stoodge') }} /> Moe</label>
                        <label className="stoodge"> <input type="radio" name="group1" value="curly" onChange={(event) => { changeState(event.target.value, 'stoodge') }} /> Curly</label>
                    </div> </div>
                <div className="choice">
                    <div>Notes</div>
                    <div>  <label> <textarea className={notesclassName} placeholder="Notes" maxLength={100} name="text1" cols="30" rows="10" onChange={(event) => {
                        if (!clickSubmit) { changeState(event.target.value, 'notes') }
                        else {
                            if (event.target.value && event.target.value.length > 100) { setnotesclassName('redBorder'); }
                            else {
                                changeState(event.target.value, 'notes');
                                setnotesclassName('inputEqualWidth');
                            }
                        }
                    }}></textarea> </label></div>
                </div>
                <div className="btn">
                    <button className="btnS" type="submit" disabled={disabledBtn} >Submit</button>
                    <button className="btnR" type="reset" disabled={disabledBtn} onClick={resetData}>Reset</button>
                </div>
                <div className="userChoice">
                    ｛
                    {formState.firstName && <p> {`"firstName": "${formState.firstName}" `} </p>}
                    {formState.lastName && <p> {`"lastName": "${formState.lastName}" `} </p>}
                    {formState.age && <p> {`"age": "${formState.age}" `} </p>}
                    {formState.color && <p> {`"color": "${formState.color}" `} </p>}
                    {formState.employed && <p> {`"employed": "${formState.employed}" `} </p>}
                    {formState.notes && <p> {`"notes": "${formState.notes}" `} </p>}
                    {formState.stoodge && <p> {`"stoodge": "${formState.stoodge}" `} </p>}
                    {formState.sauces.length !== 0 && (
                        <p>
                            "sauces": "{formState.sauces.map((sauce, index) => {
                                return (
                                    <span key={index} > {`  ${sauce},   `} </span>
                                )
                            })}"
                        </p>
                    )}
                    ｝
                </div>
            </form >
        </div >
    )
}