

import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";



const UseAuthor = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default UseAuthor;