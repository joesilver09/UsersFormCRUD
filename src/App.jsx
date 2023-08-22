import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import UsersForm from "./components/UsersForm";
import UsersList from "./components/UsersList";

const MAIN_URL = "https://users-crud.academlo.tech/users/";

function App() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [modalOn, setModalOn] = useState(false);
  const formRef = useRef(null);

  const renderUsers = () => {
    axios
      .get(MAIN_URL)
      .then(({ data }) => setUsers(data))
      .catch((err) => console.log(err));
  };
  const handleModalOpen = () => {
    setModalOn(true);
  };

  useEffect(() => {
    renderUsers();
  }, []);


  return (
    <>
      <main className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 p-3 py-5 mt-3 mx-2 w-full max-w-[24rem] md:max-w-[48rem] xl:max-w-[72rem]">
          <h2 className="left-0 text-3xl xl:text-4xl font-bold">Usuarios</h2>
          <div className="flex justify-end">
            <button
              className="bg-[#555A88] text-white text-[0.65rem] xl:text-base flex justify-center items-center w-[7.5rem] xl:w-48"
              onClick={handleModalOpen
              }
            >
              <i className="bx bx-plus"></i> Crear nuevo usuario
            </button>
          </div>
        </div>
        <UsersList
          MAIN_URL={MAIN_URL}
          renderUsers={renderUsers}
          formRef={formRef}
          users={users}
          setEditMode={setEditMode}
          setModalOn={setModalOn}
          modalOn={modalOn}
        />
        <UsersForm
          MAIN_URL={MAIN_URL}
          renderUsers={renderUsers}
          formRef={formRef}
          editMode={editMode}
          setEditMode={setEditMode}
          modalOn={modalOn}
          setModalOn={setModalOn}
        />
      </main>
    </>
  );
}

export default App;
