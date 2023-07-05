import { useState } from "react";
import { api } from "../../../utils/api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function useCategoriesIndex() {
  const [categories, setCategories] = useState([]);

  const [updates, setUpdates] = useState(0);
  function forceUpdateIndex() {
    setUpdates(updates + 1);
  }

  useEffect(() => {
    api
      .get("categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((er) => alert("erro"));
  }, [updates]);

  return { forceUpdateIndex, categories };
}

export function AdminIndexCategoriesPage() {
  const { forceUpdateIndex, categories } = useCategoriesIndex();

  return (
    <div>
      <h1>Categorias:</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => {
            return (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td className="flex flex-col">
                  <Link
                    className="text-yellow-400"
                    to={`/admin/categories/${cat.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        confirm(`Deseja mesmo deletar a categoria ${cat.name}?`)
                      ) {
                        api
                          .delete(`categories/delete/${cat.id}`)
                          .then(() => {
                            alert(`Categoria ${cat.name} deletada`);
                            forceUpdateIndex();
                          })
                          .catch(() => alert("Ocorreu um erro inesperado"));
                      }
                    }}
                    className="text-red-400"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Link className="text-green-400" to="/admin/categories/create">
        Criar nova
      </Link>
    </div>
  );
}
