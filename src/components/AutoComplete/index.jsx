import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { searchTerms } from '../../utils/fakeData';
import { useStateContext } from '../../context/StateContextProvider';

import { ReactComponent as IconSearch } from '../../assets/svg/icon-search.svg';
import { ReactComponent as IconClock } from '../../assets/svg/icon-clock.svg';

import './index.scss';

const AutoComplete = ({ searchTerm }) => {
  const navigate = useNavigate();
  const { setSearchTerm, autoCompleteVisibility, setAutoCompleteVisibility, termsHistory, setTermsHistory, setAutoCompleteLength } = useStateContext();

  const [autocompleteData, setAutocompleteData] = useState([]);

  // Click on autocomplete item
  const itemOnClick = (item) => {
    setSearchTerm(item);

    // Add term to the history
    if(!termsHistory.includes(item)) setTermsHistory(prev => [...prev, item]);

    // Hide autocomplete dropdown
    setAutoCompleteVisibility(false);

    // Navigate to search results
    navigate(`/search?q=${item}`);
  }
  
  useEffect(() => {
    if(searchTerm) {
      // Filter all terms which started with ${searchTerm}
      let filteredData = searchTerms.filter(item => item.startsWith(searchTerm));

      // Sort all terms. Terms added to the history moved to the top.
      filteredData.sort((a, b) => {
        if(termsHistory && termsHistory.includes(a) && termsHistory.includes(b)){
          return a - b;
        } else if(termsHistory && (termsHistory.includes(a) || termsHistory.includes(b))){
          if(termsHistory.includes(a)) return -1;
          if(termsHistory.includes(b)) return 1;
          return 0;
        } else {
          return a - b;
        }
      });

      // Set only first 10 terms
      filteredData = filteredData.slice(0, 10);
      setAutocompleteData(filteredData);

      // Set terms length to show autocomplete dropdown only if there is any terms
      setAutoCompleteLength(filteredData.length);
    } else {
      if(termsHistory.length > 0){
        // If there is no ${searchTerm} in input, show the history terms. If there are some terms in history.
        setAutocompleteData(termsHistory.slice(0, 10));
        setAutoCompleteLength(termsHistory.length);
      } else {
        // Or not show anything
        setAutocompleteData([]);
        setAutoCompleteLength(0);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, termsHistory]);

  return (
    <>
      {autocompleteData.length > 0 ? (
        <div 
          className="autocomplete__wrap"
          style={{ display: autoCompleteVisibility ? 'block' : 'none' }}
        >
          <div className="autocomplete__list">
            {autocompleteData.map((item, index) => (
              <div 
                key={index}
                className="autocomplete__item"
              >
                <div className="icon">
                  {termsHistory.includes(item) ? (
                    <IconClock />
                  ) : (
                    <IconSearch 
                      onClick={() => itemOnClick(item)} 
                    />
                  )}
                </div>
                <div 
                  className={`title ${termsHistory.includes(item) ? 'in-history' : ''}`}
                  onClick={() => itemOnClick(item)}
                >
                  {item}
                </div>
                {termsHistory.includes(item) && (
                  <button 
                    className="btn-remove"
                    onClick={() => {
                      const index = termsHistory.indexOf(item);
                      setTermsHistory(prev => {
                        prev.splice(index, 1);
                        return [...prev];
                      });
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : ''}
    </>
  )
}

export default AutoComplete