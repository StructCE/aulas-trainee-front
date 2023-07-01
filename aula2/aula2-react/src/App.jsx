import { images } from "./components/Carousel/images";
import { Carousel } from "./components/Carousel";
import { useId } from "react";
import { useState } from "react";

function App() {
  return (
    <div className="flex-col w-full h-full flex items-center justify-center">
      {/* <Carousel images={images} />
      <div className="h-10"></div>
      <Carousel images={images} /> */}
      <CustomFileInput />
    </div>
  );
}

function CustomFileInput({ onChange, ...props }) {
  const id = useId();
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");

  function handleChange(e) {
    setFileName(e.target.files[0].name);
    onChange && onChange(e);
  }

  return (
    <label
      htmlFor={id}
      className="relative p-2 h-40 w-60 rounded-sm border border-dotted"
    >
      <span className="text-xs text-gray-500">Selecione um arquivo</span>
      <div className="h-4"></div>
      <span>{fileName}</span>
      <input
        type="file"
        id={id}
        className="opacity-0 absolute inset-0"
        onChange={handleChange}
        {...props}
      />
    </label>
  );
}
export default App;
