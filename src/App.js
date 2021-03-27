import React, {useEffect, useState} from 'react'
import './index.css'

export default function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(false);
  async function fetchData(term) {
    try{
      const data = await fetch(`https://itunes.apple.com/search?term=${term}`);
      const temp = await data.json();
      setResults(temp.results);
      setErr(false);
    }
    catch(err){
      setErr(true);
    }
  }

  useEffect(() => {
    fetchData("hariharan");
  }, [])
  const handleClick = e => {
    if (e.key === 'Enter') {
      fetchData(search);
    }
  }
  return (
    <div className="App">
      <div className="container">
        <nav>
          <a href="" className="logo">iTunes</a>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyUp={handleClick} type="search" placeholder="Search"/>
        </nav>
        {err ? 'Error in api' : (
                  <main>
                  {
                    results.map(result => (
                      <div className="result">
                        <p>{result.trackName}</p>
                      </div>
                    ))
                  }
                </main>
        )}
      </div>      
    </div>
  )
}
