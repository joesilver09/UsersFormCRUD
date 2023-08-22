import axios from "axios";
import User from "./User";

const UsersList = ({ users, MAIN_URL, renderUsers, formRef, setEditMode, setModalOn, modalOn }) => {

  const handleUpdateUser = (dataUser) =>{
    setModalOn(!modalOn)
    setEditMode(dataUser)
    formRef.current.first_name.value =  dataUser.first_name
    formRef.current.last_name.value =  dataUser.last_name
    formRef.current.email.value =  dataUser.email
    formRef.current.password.value =  dataUser.password
    formRef.current.birthday.value =  dataUser.birthday

  }
  
  const handleRemoveUser = (idUser) => {
    const url = MAIN_URL + idUser + "/";

    axios
      .delete(url)
      .then(() => renderUsers(), swal("Usuario Eliminado","","success"))
      .catch((err) => console.log(err));
  };

  return (
    <section className="grid grid-cols-1 gap-5 mx-2 md:grid-cols-2  xl:grid-cols-3 mb-4">
      {users.map((user) => (
        <User user={user} key={user.id} handleRemoveUser={handleRemoveUser} handleUpdateUser={handleUpdateUser} />
      ))}
    </section>
  );
};
export default UsersList;
