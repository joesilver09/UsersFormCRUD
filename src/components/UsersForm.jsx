import axios from "axios";
import { useForm } from "react-hook-form";
import { EMPTY_FORM_VALUES } from "../shared/constants";
import { useEffect, useState } from "react";

const UsersForm = ({
  MAIN_URL,
  renderUsers,
  formRef,
  editMode,
  setEditMode,
  modalOn,
  setModalOn,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setrandomPicture(null);
    fetchRandomPicture();
    editMode
      ? updateUser(data, reset, swal("Información Actualizada","", "success"))
      : createUser(data, reset,  swal("Usuario creado","", "success") ,(data.image_url = randomPicture));
    handleModalExit(reset);
    setModalOn(!modalOn);
  };

  useEffect(() => {
    fetchRandomPicture();
  }, []);

  const fetchRandomPicture = () => {
    const url = "https://randomuser.me/api/";
    axios
      .get(url)
      .then(({ data }) => setrandomPicture(data.results[0].picture.large))
      .catch((err) => console.log(err));
  };

  const createUser = (newUser, reset) => {
    axios
      .post(MAIN_URL, newUser)
      .then(() => {
        reset(EMPTY_FORM_VALUES);
        renderUsers();
        setModalOn(false);
      })
      .catch((err) => console.log(err));
  };

  const updateUser = (newEditData, reset) => {
    const url = MAIN_URL + editMode.id + "/";

    axios
      .put(url, newEditData)
      .then(() => {
        renderUsers();
        setModalOn(false);
        reset(EMPTY_FORM_VALUES);
        setEditMode(null);
      })
      .catch((err) => console.log(err));
  };

  const handleModalExit = () => {
    setModalOn(false);
    reset(EMPTY_FORM_VALUES);
    setEditMode(null);
  };

  useEffect(() => {
    if (editMode) {
      reset(editMode);
    }
  }, [editMode]);

  const [randomPicture, setrandomPicture] = useState(null);
  useEffect(() => {
    const url = "https://randomuser.me/api/";
    axios
      .get(url)
      .then(({ data }) => setrandomPicture(data.results[0].picture.large))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section
      className={` fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex justify-center items-center transition-opacity duration-500 ease-in-out xl:text-lg ${
        modalOn ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className=" w-full mx-2 max-w-[22rem] bg-slate-200 grid gap-3 p-6 grid-cols-1 border relative"
      >
        <button
          onClick={handleModalExit}
          type="button"
          className="absolute xl:text-xl top-1 right-2 "
        >
          <i className="bx bx-x-circle"></i>
        </button>
        <h2 className="flex justify-center font-bold text-xl xl:text-2xl ">
          {editMode ? "Editar usuario" : "Nuevo usuario"}
        </h2>
        <div className="grid">
          <label htmlFor="first_name">Nombre: </label>
          <input
            className="pl-2 rounded-[0.2rem] outline-none border border-slate-400"
            id="first_name"
            {...register("first_name", {
              required: { value: true, message: "Campo Requerido" },
              maxLength: {
                value: 25,
                message: "Maximo 25 carácteres",
              },
              pattern: {
                value:
                  /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(\s[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*)*\s*$/,
                message: "Inicia con mayúscula, revisa los espacios",
              },
            })}
            type="text"
            autoComplete="name"
          />
          {errors.first_name && (
            <p className="text-red-600 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.first_name.message}
            </p>
          )}
        </div>
        <div className="grid ">
          <label htmlFor="last_name">Apellidos: </label>
          <input
            className="pl-2 rounded-[0.2rem] outline-none border border-slate-400"
            id="last_name"
            {...register("last_name", {
              required: { value: true, message: "Campo Requerido" },
              maxLength: {
                value: 25,
                message: "Maximo 25 carácteres",
              },
              pattern: {
                value:
                  /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*(\s[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]*)*\s*$/,
                message: "Inicia con mayúscula, revisa los espacios",
              },
            })}
            type="text"
            autoComplete="name"
          />
          {errors.last_name && (
            <p className="text-red-600 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.last_name.message}
            </p>
          )}
        </div>
        <div className="grid">
          <label htmlFor="email">Correo: </label>
          <input
            className="pl-2 rounded-[0.2rem] outline-none border border-slate-400"
            id="email"
            {...register("email", {
              required: { value: true, message: "Campo Requerido" },
              maxLength: {
                value: 150,
                message: "Debe contener maximo 150 carácteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Dirección de correo inválida",
              },
            })}
            type="text"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-600 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid">
          <label htmlFor="password">Contraseña: </label>
          <input
            className="pl-2 rounded-[0.2rem] outline-none border border-slate-400"
            id="password"
            {...register("password", {
              required: { value: true, message: "Campo Requerido" },
              maxLength: {
                value: 25,
                message: "Maximo 25 carácteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&"#/'¿¡\\{}[\]^~`\-_.;<>])[A-Za-z\d@$!%*?&"#/'¿¡\\{}[\]^~`\-_.;<>]+$/,
                message:
                  "Número, carácter especial, minúscula y mayúscula requeridos.",
              },
            })}
            type="text"
          />
          {errors.password && (
            <p className="text-red-600 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="grid">
          <label htmlFor="birthday">Cumpleaños: </label>
          <input
            className="pl-2 rounded-[0.2rem] outline-none border border-slate-400"
            id="birthday"
            {...register("birthday", {
              required: {
                value: true,
                message: "Fecha incorrecta o incompleta",
              },
            })}
            type="date"
          />
          {errors.birthday && (
            <p className="text-red-600 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.birthday.message}
            </p>
          )}
        </div>

        <button className="bg-[#555A88] text-white mt-5 p-1 text-sm xl:text-base font-light">
          {editMode ? "Guardar Cambios" : "Agregar nuevo usuario"}
        </button>
      </form>
    </section>
  );
};
export default UsersForm;
