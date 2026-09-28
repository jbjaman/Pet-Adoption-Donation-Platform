import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "./UseAxiosSecure";
import UseAuthor from "./UseAuthor";




const UseAdmin = () => {
    const { user } = UseAuthor();
    console.log(user.email);
    const axiosSecure = UseAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log("UseAdmin file: ", res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading];
};


export default UseAdmin;