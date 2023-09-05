//@ts-check
import UserApi from "./api/UserApi";

function getAll() {
    UserApi.getAll()
        .then((users) => {
            console.log("Users:", users);
        });
}

const UserService = {
    getAll
}
export default UserService;
