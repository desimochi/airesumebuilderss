import { useEffect, useState } from "react"

export default function useUnloadWarning (condition){

    useEffect(()=>{
        if(!condition){
            return;
        }
        const listener = (event)=>{
            event.preventDefault();
        }
        window.addEventListener("beforeunload", listener)

        return ()=> window.removeEventListener("beforeunload", listener)
    }, [condition])
}