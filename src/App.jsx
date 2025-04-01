import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    features: "",
    price: "",
    year: "",
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      name: formData.name,
      data: {
        features: formData.features,
        price: Number(formData.price),
        year: Number(formData.year),
      },
    };

    fetch("https://api.restful-api.dev/objects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {setResponse(result); localStorage.setItem("objectId", result.id); console.log("Objeto creado:", result);
      })
      .catch((error) => console.error("Error al enviar los datos", error));
  };

  return (
    <div>
      <h1>Crear Objeto</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" required />
        <input type="text" name="features" placeholder="Características" required />
        <input type="number" name="price" placeholder="Precio" required />
        <input type="number" name="year" placeholder="Año de fabricación" required />
        <br />
        <button type="submit">Enviar</button>
      </form><br />
      {response && (
        <div>
          <p><strong>Respuesta:</strong> {JSON.stringify(response)}</p>
        </div>
      )}
    </div>
  );
}
