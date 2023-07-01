import { useState } from "react";
import { useId } from "react";
import { blobToBase64 } from "../utils/blobToBase64";

export default function FileInput({ onChange, ...props }) {
  const id = useId();

  const [imageUrl, setImageUrl] = useState("");

  async function changeUrl(file) {
    setImageUrl(await blobToBase64(file));
  }

  function handleChange(e) {
    //
    changeUrl(e.target.files[0]);
    //
    onChange && onChange(e);
  }

  return (
    <>
      <label
        className="mx-auto my-3 p-3 rounded relative w-52 h-32 border-white border-dashed border"
        htmlFor={id}
      >
        <img className="absolute inset-0 object-cover" src={imageUrl} alt="" />
        <span>Coloque sua imagem</span>
        <input
          onChange={handleChange}
          id={id}
          type="file"
          className="absolute inset-0 opacity-0"
          {...props}
        />
      </label>
    </>
  );
}
