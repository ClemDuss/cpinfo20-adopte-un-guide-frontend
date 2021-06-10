import GreenLogo from './../../assets/img/logo/A-logo-green.svg';
import {CircularProgress} from "@material-ui/core";
import React from "react";

export default function Loader(){
    return(
        <div style={{minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <img src={GreenLogo} alt={"logo"} style={{width: "5rem", marginBottom: "2rem"}}/>
            <CircularProgress style={{color: "var(--green-mountain)"}}/>
        </div>
    )
}