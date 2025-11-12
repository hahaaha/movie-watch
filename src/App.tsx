import { useState } from "react"
import { useNavigate } from "react-router"
import "./App.css"

function App() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!search.trim()) return
    if (search.trim()) {
      navigate(`/search?query=${search}`)
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="flex items-center">
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="Search for a movie"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch()
            }
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  )
}

export default App
