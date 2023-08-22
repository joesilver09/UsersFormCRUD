const User = ({ user, handleRemoveUser, handleUpdateUser }) => {
  return (
    <article className="max-w-[23rem] xl:max-w-[25.5rem]">
      <div className="grid grid-cols-2 border rounded-md border-gray-300/80">
        <h2 className="truncate col-span-2 font-bold text-xl xl:text-2xl ml-3 mt-4">
          {user.first_name + " " + user.last_name}
        </h2>
        <div className="grid grid-cols-2 gap-10 col-span-2 border-y m-3 ">
          <div className="grid grid-cols-1 my-2 ">
            <ul className="flex flex-col justify-center">
            <li className="text-base text-gray-400/60">CUMPLEAÑOS</li>
              <li className="text-sm xl:text-base">
                {" "}
                <i className="bx bx-gift"></i>
                {` ${user.birthday}`}
              </li>
              <li className="text-base text-gray-400/60">CORREO</li>
              <li className="text-sm xl:text-base mb-2">{user.email}</li>
            
            </ul>
          </div>
          <div className="my-3 ml-[2.8rem] mr-1 rounded">
            <img src={user.image_url} alt="profile picture" style={{ borderRadius: "50%" }} />
          </div>
        </div>

        <div className="col-start-2  row-start-3 grid grid-cols-3 gap-2 mx-4 mb-4">
          <button
            onClick={() => handleRemoveUser(user.id)}
            className=" bg-[#D93F3F] col-start-2 rounded-[0.250rem]"
          >
            <i className="bx bx-trash text-gray-200 flex justify-center p-1"></i>
          </button>
          <button
            onClick={() => handleUpdateUser(user)}
            className=" bg-gray-100 border border-gray-300 col-start-3 rounded-[0.250rem]"
          >
            <i className="bx bx-pencil flex justify-center text-gray-300 bg-"></i>
          </button>
        </div>
      </div>
    </article>
  );
};
export default User;
