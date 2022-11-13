import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoComplete from '../AutoComplete';
import { useStateContext } from '../../context/StateContextProvider';

import './index.scss';

import { ReactComponent as IconSearch } from '../../assets/svg/icon-search.svg';

const SearchField = ({ autoFocus }) => {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, autoCompleteVisibility, setAutoCompleteVisibility, termsHistory, setTermsHistory, autoCompleteLength } = useStateContext();

  const searchRef = useRef(null);

  const onKeyDown = (e) => {
    if(e.key === 'Enter'){
      if(!termsHistory.includes(searchTerm)) setTermsHistory(prev => [...prev, searchTerm]);
      setAutoCompleteVisibility(false);
      navigate(`/search?q=${searchTerm}`);
    }
  }

  useEffect(() => {
    setSearchTerm('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
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
      className={`search-field__wrapper${autoCompleteVisibility ? ' autocomplete--opened' : ''}`}
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
            if(termsHistory.length > 0 || searchTerm.length > 0){
              setAutoCompleteVisibility(true)
            }
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if(e.target.value.length > 0){
              //if(autoCompleteLength !== 0){
                console.log(autoCompleteLength); 
              //}
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