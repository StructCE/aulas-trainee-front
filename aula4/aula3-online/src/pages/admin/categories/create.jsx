import { useNavigate } from "react-router-dom";
import { api } from "../../../utils/api";
import { useState } from "react";

export function AdminCreateCategoryPage() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  function validateCategory(cat) {
    if (!cat.name)
      return { valid: false, message: "Categoria precisa ter nome" };

    return { valid: true, message: "Categoria criada" };
  }
  function handleChange(key, value) {
    setCategory((prevCategory) => {
      return { ...prevCategory, [key]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { valid, message } = validateCategory(category);

    if (valid) {
      api
        .post("categories/create", {
          category,
        })
        .then(() => {
          alert("Categoria criada");
          navigate("/admin/categories");
        })
        .catch((err) => {
          alert("Ocorreu um erro inesperado no servidor");
        });
    } else {
      alert(message);
    }
  }

  return (
    <section>
      <h1>Crie sua categoria</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex flex-col">
          <label htmlFor="inp1">Nome:</label>
          <input
            className="text-black"
            value={category.name}
            onChange={(e) => handleChange("name", e.target.value)}
            type="text"
            id="inp1"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="inp2">Descrição:</label>
          <input
            className="text-black"
            value={category.description}
            onChange={(e) => handleChange("description", e.target.value)}
            type="text"
            id="inp2"
          />
        </div>
        <button className="mt-10">Criar</button>
      </form>
    </section>
  );
}
