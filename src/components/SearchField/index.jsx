import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoComplete from '../AutoComplete';

import './index.scss';

import { ReactComponent as IconSearch } from '../../assets/svg/icon-search.svg';

const SearchField = ({ value = '', autoFocus }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(value);
  const [autoCompleteVisibility, setAutoCompleteVisibility] = useState(false);

  return (
    <div className={`search-field__wrapper${autoCompleteVisibility ? ' autocomplete--opened' : ''}`}>
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
            onClick={() => {setAutoCompleteVisibility(true)}}
            onChange={(e) => {setSearchTerm(e.target.value)}}
            onFocus={() => {setAutoCompleteVisibility(true)}}
            //onBlur={() => {setAutoCompleteVisibility(false)}}
            onKeyDown={(e) => {
              if(e.key === 'Enter') navigate(`/search?q=${searchTerm}`);
            }}
          />
          {searchTerm && (
            <button 
              className="search-field__btn-clear"
              onClick={() => {
                setSearchTerm('');
              }}
            />
          )}
      </div>
      <AutoComplete 
        visibility={autoCompleteVisibility}
        term={searchTerm}
        setSearchTerm={setSearchTerm}
        setVisibility={setAutoCompleteVisibility}
      />
    </div>
  )
}

export default SearchField