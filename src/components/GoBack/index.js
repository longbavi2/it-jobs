import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function GoBack(){
    const Navigate = useNavigate();
    return (
        <>
        <Button onClick={()=>Navigate(-1)}>
            Trở lại
        </Button>
        </>
    )
}
export default GoBack;