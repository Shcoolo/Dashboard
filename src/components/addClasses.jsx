import React , {useState} from "react";
export const AddClasses =()=>{
    const[value,setValue]=useState("");
    const handleSubmit=e=>{
        e.preventDefault();
        console.log(value)
    }
    return(
        <form className="AddClasses">
            <input type="text" className="classes" value={value} placeholder="" onChange={(e)=>setValue(e.target.value)}/>
            <button type="submit" className="class-btn">Add Class</button>
        </form>
    );
}
