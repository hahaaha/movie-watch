import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) {
      warnToast('请输入搜索关键词');
      return;
    }
    if (search.trim()) {
      navigate(`/search?query=${search}`);
    }
  };

  const warnToast = (text: string) => {
    toast(text);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <div className="flex items-center">
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          placeholder="Search for a movie"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
