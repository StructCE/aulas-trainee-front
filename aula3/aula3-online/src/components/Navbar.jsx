import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function Navbar({ user, handleLogin, handleLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-slate-700 flex justify-between">
      <NavLink className="w-10" to="/">
        <img
          className="h-full px-2 object-contain"
          src="https://1050295053-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FRwjVAuidMiDuOSaQFEA2%2Fuploads%2Fgit-blob-765eb429a161c9870558a484589622573da4023a%2Fmark-foguetinho-branco.png?alt=media"
          alt=""
        />
      </NavLink>

      <ul className="flex justify-center gap-4 text-lg ">
        <li>
          <NavLink
            className={({ isActive }) =>
              `p-2 block transition-all ${
                isActive ? "bg-white/10 scale-105" : ""
              }`
            }
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `p-2 block transition-all ${
                isActive ? "bg-white/10 scale-105" : ""
              }`
            }
            to="/about"
          >
            Sobre nós
          </NavLink>
        </li>
      </ul>
      {user ? (
        <details
          // hackzinho com key pra fazer o dropdown fechar quando trocar a rota:
          key={location.key}
          className="relative items-center"
          htmlFor="navsel"
        >
          <summary className="flex cursor-pointer">
            <span className="text-white flex items-center">
              {user.username}
            </span>
            <img
              src={user.avatarUrl}
              className="rounded-full w-10 p-2 object-contain"
              alt=""
            />
          </summary>
          <div className="absolute p-1 bg-white/5 rounded-b-lg top-full right-0 w-max">
            <span className="opacity-80 text-sm">Opções de usuário</span>
            <nav>
              <ul>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `p-2 block transition-all ${
                        isActive ? "bg-white/10 scale-105" : ""
                      }`
                    }
                    to="/profile"
                  >
                    Perfil
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      navigate("/");
                    }}
                    className="p-2"
                    to="/logout"
                  >
                    Logout
                  </button>
                </li>
                {user.isAdmin && (
                  <li>
                    <span className="opacity-80 text-sm">Opções de Admin</span>
                    <ul>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `p-2 block transition-all ${
                              isActive ? "bg-white/10 scale-105" : ""
                            }`
                          }
                          to="/admin/categories"
                        >
                          Gerenciar categorias
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </details>
      ) : (
        <button className="p-2 block" onClick={handleLogin}>
          Login
        </button>
      )}
    </nav>
  );
}
