import { useEffect, useState } from 'react';
import { useSearchParams  } from 'react-router-dom';

import SearchField from '../../components/SearchField';
import SearchList from '../../components/SearchList';
import Logo from '../../components/Logo';
import { searchResults } from '../../utils/fakeData';
import { useStateContext } from '../../context/StateContextProvider';

import { ReactComponent as ImageNotFound } from '../../assets/svg/not-found.svg';

import './index.scss';

const Search = () => {
  const [ searchParams ] = useSearchParams();
  const query = searchParams.get('q');
  const queryLowerCase = query.toLowerCase();

  const { setSearchTerm } = useStateContext();

  const [results, setResults] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setSearchTerm(query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Measuring time for finding results
    const startTime = performance.now();

    // Get & set the results
    const filteredResults = searchResults.filter(item => item?.title.toLowerCase().includes(queryLowerCase) || item?.description.toLowerCase().includes(queryLowerCase)).splice(0, 10);
    setResults(filteredResults);

    // Measuring time for finding results
    const endTime = performance.now();
    setTime(+((endTime - startTime) / 1000).toFixed(4));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="search__page">
      <header className="search__header">
        <div className="search__logo">
          <Logo size="small" />
        </div>
        <div className="search__search-wrapper">
          <SearchField />
        </div>
      </header>
      <div className="search__content">
        {results && results.length > 0 ? (
          <>
            <div className="search__info">
                About {results.length} results ({time} seconds) 
            </div>
            <SearchList items={results} />
          </>
        ) : (
          <div className="search__no-results">
            <p>No results containing all your search terms were found.</p>
            <p>Your search - <strong>{query}</strong> - did not match any documents.</p>
            <p>Suggestions:</p>
            <ul>
              <li>Make sure that all words are spelled correctly.</li>
              <li>Try different keywords.</li>
              <li>Try more general keywords.</li>
            </ul>
            <div className="no-results__img">
              <ImageNotFound />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search