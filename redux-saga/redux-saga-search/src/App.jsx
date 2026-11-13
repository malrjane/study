import { useDispatch, useSelector } from "react-redux";
import { queryChanged } from "./app/searchSlice";


function App() {
  const dispatch = useDispatch();

  const { query, items, loading, error } = useSelector(
    (state) => state.search
  );

  const handleChange = (event) => {
    dispatch(queryChanged(event.target.value));
  };

  return (
    <div className="app">
      <h1>Search</h1>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />

      {!query.trim() && (
        <p>Type something to search...</p>
      )}

      {query.trim() && loading && (
        <p>Searching...</p>
      )}

      {query.trim() && error && (
        <p role="alert">{error}</p>
      )}

      {query.trim() && !loading && !error && (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App
