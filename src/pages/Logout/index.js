/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { actionAuthen } from "../../actions/authenToken";
import { deleteAllCookies } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout(){
    const dispath = useDispatch();
    const navigate = useNavigate();
    deleteAllCookies();
   useEffect(()=>{
    dispath(actionAuthen(false));
    navigate("/login");
   },[])
    return (
        <>
        </>
    )
}
export default Logout;
