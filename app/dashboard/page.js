"use client";
import { useEffect, useState } from "react";
export default function Dashboard(){
    const [mes,setmsd]=useState("")
    useEffect(()=>{
        async function studentDetails(){
            try{
                const res=await fetch("http://localhost:4000/dashboard",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const data=await res.json()
                setmsd(data.message)
            }catch(err){
                console.log(err)
            }
        }
        studentDetails()
    },[])
    return(
        <div>
            <h1 className="dash">Welcome to your profile</h1>
            <h2 className="dash">Hiiii.......</h2>
            <h2 className="dash">{mes}</h2>
        </div>
    )
}