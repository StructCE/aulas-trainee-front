import { useState } from "react";
import PageWrapper from "./PageWrapper";
import { useEffect } from "react";
import { fakeApi } from "../utils/fakeApi";
import FileInput from "../components/FileInput";

export function LoginAndRegisterPage() {
  const [userToAdd, setUserToAdd] = useState({
    username: "",
    email: "",
    image: "",
  });

  const [users, setUsers] = useState([]);
  // como pegar os usuários da api?
  useEffect(() => {
    fakeApi
      .get("users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fakeApi
      .post("users/create", userToAdd)
      .then((res) => setUsers((prevU) => [...prevU, res.data]))
      .catch((err) => alert(err.message));
  }

  function handleChange(e, fieldName) {
    const isFileInput = e.target.type === "file";

    if (isFileInput) {
      setUserToAdd((prevS) => ({ ...prevS, [fieldName]: e.target.files[0] }));
    } else {
      setUserToAdd((prevS) => ({ ...prevS, [fieldName]: e.target.value }));
    }
  }

  return (
    <PageWrapper>
      <div>
        <h1>Usuários</h1>
        <h2>Já existentes</h2>
        <UsersCarousel users={users} />
        <h2>Crie um novo:</h2>
      </div>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="" htmlFor="inp1">
          Nome de usuário:
        </label>
        <input
          onChange={(event) => handleChange(event, "username")}
          className="text-black"
          id="inp1"
          type="text"
          placeholder="username"
        />
        <label className="" htmlFor="inp2">
          Email:
        </label>
        <input
          onChange={(event) => handleChange(event, "email")}
          className="text-black"
          id="inp2"
          type="text"
          placeholder="email"
        />
        <FileInput
          onChange={(event) => handleChange(event, "image")}
          placeholder="avatar"
        />
        <button className="bg-sky-400 text-black">Enviar</button>
      </form>
      <pre>{JSON.stringify(userToAdd, null, 2)}</pre>
    </PageWrapper>
  );
}

function UsersCarousel({ users }) {
  const [selected, setSelected] = useState(0);

  function updateSelectedImage(newI) {
    if (newI < 0) return;
    if (newI >= users.length) return;

    setSelected(newI);
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <button
          onClick={() => updateSelectedImage(selected - 1)}
          className="text-7xl p-3"
        >
          {"<"}
        </button>
        <ul className="w-80 h-36 overflow-hidden">
          {users.map(
            (user, i) =>
              selected === i && (
                <li>
                  <UserCard key={i} user={user} />
                </li>
              )
          )}
        </ul>
        <button
          onClick={() => updateSelectedImage(selected + 1)}
          className="text-7xl p-3"
        >
          {">"}
        </button>
      </div>
      <div className="flex gap-1 mx-auto mt-2">
        {users.map((_img, i) => (
          <button
            className="rounded-full w-8 h-8 bg-slate-500"
            onClick={() => updateSelectedImage(i)}
          >
            {i === selected && (
              <span className="rounded-full m-auto block bg-slate-600 w-6 h-6"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function UserCard({ user }) {
  return (
    <article>
      <h2>
        email: {user.email} - <span>@{user.username}</span>
      </h2>

      <img src={user.imageUrl} />
    </article>
  );
}
