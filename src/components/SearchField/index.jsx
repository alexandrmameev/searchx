import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoComplete from '../AutoComplete';
import { useStateContext } from '../../context/StateContextProvider';

import './index.scss';

import { ReactComponent as IconSearch } from '../../assets/svg/icon-search.svg';

const SearchField = ({ autoFocus }) => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, autoCompleteVisibility, setAutoCompleteVisibility, termsHistory, setTermsHistory, autoCompleteLength } = useStateContext();

  // Add ref to the search field wrapper, for handling outside click
  const searchRef = useRef(null);

  // On press Enter
  const onKeyDown = (e) => {
    if(e.key === 'Enter'){
      // Check if this item isn't in history, if so, add it to the history.
      if(!termsHistory.includes(searchTerm)) setTermsHistory(prev => [...prev, searchTerm]);

      // Hide autocomplete dropdown
      setAutoCompleteVisibility(false);

      // Navigate to search results
      navigate(`/search?q=${searchTerm}`);
    }
  }

  useEffect(() => {
    // Clear input on component load
    setSearchTerm('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handle click outside of search field
  useEffect(() => {
    function handleClickOutside(e) {
      // Check if clicked outside
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        // Hide autocomplete dropdown
        setAutoCompleteVisibility(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchRef]);

  return (
    <div 
      className={`search-field__wrapper${autoCompleteVisibility && autoCompleteLength > 0 ? ' autocomplete--opened' : ''}`}
      ref={searchRef}
    >
      <div className="search-field__input-wrapper">
        <label 
          htmlFor="search-field"
          className="search-field__label"
        >
          <IconSearch />
        </label>
        <input 
          autoFocus={autoFocus}
          autoComplete="off"
          className="search-field__input"
          id="search-field"
          type="text" 
          value={searchTerm}
          onClick={() => {
            // Check if there are something inside history or autocomplete data
            if(termsHistory.length > 0 || autoCompleteLength > 0){
              // Show autocomplete dropdown
              setAutoCompleteVisibility(true)
            }
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if(e.target.value.length > 0){
              // Show autocomplete only if there is something inside input
              setAutoCompleteVisibility(true);
            }
          }}
          onKeyDown={(e) => onKeyDown(e)}
        />
        {searchTerm && (
          <button 
            className="search-field__btn-clear"
            onClick={() => setSearchTerm('')}
          />
        )}
      </div>
      <AutoComplete searchTerm={searchTerm} />
    </div>
  )
}

export default SearchField