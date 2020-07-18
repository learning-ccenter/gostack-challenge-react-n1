import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      id: "id",
      title: "Native",
      url: "http://guthub.com/facebook/react-native",
      techs: ["JS", "Webpack"],
    });

    const repository = response.data;

    setRepositories([...respositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`).then((response) => {
      const repos = respositories.filter((repos) => id !== repos.id);
      setRepositories(repos);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
