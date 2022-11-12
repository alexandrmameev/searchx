import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchTerms } from '../../utils/fakeData';

import './index.scss';

import { ReactComponent as IconSearch } from '../../assets/svg/icon-search.svg';
import { ReactComponent as IconClock } from '../../assets/svg/icon-clock.svg';

const AutoComplete = ({ term, setSearchTerm, visibility, setVisibility }) => {
  const navigate = useNavigate();

  const [autocompleteData, setAutocompleteData] = useState([]);
  
  useEffect(() => {
    if(term) {
      const filteredData = searchTerms.filter(item => item.startsWith(term)).slice(0, 10);
      setAutocompleteData(filteredData)
      if(filteredData.length === 0) setVisibility(false);
    }
  }, [term]);

  return (
    <>
      {autocompleteData.length > 0 ? (
        <div 
          className="autocomplete__wrap"
          style={{ display: visibility ? 'block' : 'none' }}
        >
          <div className="autocomplete__list">
            {autocompleteData.map((item, index) => (
              <div 
                key={index}
                className="autocomplete__item"
                onClick={() => {
                  setSearchTerm(item);
                  navigate(`/search?q=${item}`);
                }}
              >
                <div className="icon">
                  <IconSearch />
                </div>
                <div className="title">{item}</div>
                <button 
                  className="btn-remove"
                  onClick={() => {}}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : ''}
    </>
  )
}

export default AutoComplete