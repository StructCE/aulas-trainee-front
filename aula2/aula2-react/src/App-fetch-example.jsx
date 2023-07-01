import { useId } from "react";
import { useEffect, useState } from "react";

function useGitRepositoriesFromUser(userName) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then(async (response) => {
        setLoading(false);
        const data = await response.json();
        setRepos(data);
        // console.log(data);
      })
      .catch((_err) => {
        setLoading(false);
        setError(true);
      });
  }, [userName]);

  return { data: repos, error, loading };
}

function App() {
  const { loading, error, data } = useGitRepositoriesFromUser("artistrea");

  return (
    <div className="flex-col w-full h-full flex items-center justify-center">
      {loading && <div>carregando...</div>}
      {error && <span className="text-red-500">Ocorreu algum erro</span>}
      {data && (
        <ul className="flex flex-col gap-6">
          {data.map((repo) => {
            return (
              <li className="flex gap-1 flex-col">
                <h2 className="font-bold text-lg">{repo.full_name}</h2>
                <a className="ml-4 text-blue-500" href={repo.html_url}>
                  {repo.html_url}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
