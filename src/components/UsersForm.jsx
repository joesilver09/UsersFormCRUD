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

  const capitalizeWords =(str) => {
    const words = str.trim().split(/\s+/);
    const capitalizedWords = words.map(word => {
      const lowercaseWord = word.toLowerCase();
      return lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
    });
    return capitalizedWords.join(' ');
  }

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
      ? updateUser(data, reset, swal("Información Actualizada", "", "success"), 
      (data.first_name = capitalizeWords(data.first_name),data.last_name = capitalizeWords(data.last_name))
      
      )
      : createUser(
          data,
          reset,
          swal("Usuario creado", "", "success"),
          (data.image_url = randomPicture, data.first_name = capitalizeWords(data.first_name),data.last_name = capitalizeWords(data.last_name))
        );
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
        <div className="grid grid-cols-9">
          <label htmlFor="first_name" ><i className='bx bxs-user text-xl'></i> </label>
          <input placeholder="Nombre" 
            className="pl-2 mr-1 placeholder:text-sm col-span-4 rounded-[0.2rem] outline-none border border-slate-400"
            id="first_name"
            {...register("first_name", {
              required: { value: true, message: "Requerido" },
              maxLength: {
                value: 25,
                message: "Maximo 25 carácteres",
              },
              pattern: {
                value:
                  /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]*$/,
                message: "Utiliza solo letras",
              },
            })}
            type="text"
            autoComplete="name"
          />
          

          <input placeholder="Apellido" 
            className="pl-2 col-span-4 placeholder:text-sm rounded-[0.2rem] outline-none border border-slate-400"
            id="last_name"
            {...register("last_name", {
              required: { value: true, message: "Requerido" },
              maxLength: {
                value: 25,
                message: "Maximo 25 carácteres",
              },
              pattern: {
                value:
                  /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]*$/,
                message: "Utiliza solo letras",
              },
            })}
            type="text"
            autoComplete="family-name"
          />
          {errors.first_name && (
            <p className="text-red-600 col-start-2 col-span-4 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.first_name.message}
            </p>
          )}
          {errors.last_name && (
            <p className="text-red-600 col-start-6 col-span-4 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.last_name.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-9">
          <label htmlFor="email">
            <i className="bx bxs-envelope text-xl"></i>{" "}
          </label>
          <input placeholder="Correo" 
            className="placeholder:text-sm pl-2 col-span-8 rounded-[0.2rem] outline-none border border-slate-400"
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
            <p className="text-red-600 col-start-2 col-span-8 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-9">
          <label htmlFor="password">
            <i className="bx bxs-lock-alt text-xl"></i>{" "}
          </label>
          <input placeholder="Contraseña" 
            className="placeholder:text-sm pl-2 col-span-8 rounded-[0.2rem] outline-none border border-slate-400"
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
            type="password"
            
          />
          {errors.password && (
            <p className="text-red-600 col-start-2 col-span-8 text-xs xl:text-base">
              <i className="material-icons text-sm xl:text-base transform translate-y-[0.2rem]">
                error
              </i>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-9">
          <label htmlFor="birthday">
            <i className="bx bxs-cake text-xl"></i>{" "}
          </label>
          <input
            className="pl-2 col-span-8 rounded-[0.2rem] outline-none border border-slate-400"
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
            <p className="text-red-600 col-start-2 col-span-8 text-xs xl:text-base">
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
