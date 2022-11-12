import { useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';

import SearchField from '../../components/SearchField';
import SearchList from '../../components/SearchList';
import Logo from '../../components/Logo';
import { searchResults } from '../../utils/fakeData';

import './index.scss';

const Search = () => {
  const [ searchParams ] = useSearchParams();
  const query = searchParams.get('q');
  const queryLowerCase = query.toLowerCase();

  const [results, setResults] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const filteredResults = searchResults.filter(item => item?.title.toLowerCase().includes(queryLowerCase) || item?.description.toLowerCase().includes(queryLowerCase)).splice(0, 10);
    setResults(filteredResults)
    const endTime = Date.now();
    setTime((endTime - startTime) / 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="search__page">
      <header className="search__header">
        <div className="search__logo">
          <Logo size="small" />
        </div>
        <div className="search__search-wrapper">
          <SearchField
            value={query}
          />
        </div>
      </header>
      <div className="search__content">
        {results && results.length > 0 ? (
          <>
            <div className="search__info">
                About {results.length} results ({time} seconds) 
            </div>
            <SearchList 
              items={results}
            />
          </>
        ) : (
          'No results'
        )}
      </div>
    </div>
  )
}

export default Search