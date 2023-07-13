import Main from "./Main";
import Footer from "./Footer";
import Header from "./Header";
import "./LayoutDefault.scss"
import { useSelector } from "react-redux";
function LayoutDefault() {
    const authen = useSelector(state => state.changeToken);
    return (
        <>
            <div className="layout-default">
                <Header />
                <Main />
                <Footer />
            </div>
        </>
    )
}
export default LayoutDefault;