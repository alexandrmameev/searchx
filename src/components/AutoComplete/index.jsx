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

  const itemOnClick = (item) => {
    setSearchTerm(item);
    if(!termsHistory.includes(item)) setTermsHistory(prev => [...prev, item]);
    setAutoCompleteVisibility(false);
    navigate(`/search?q=${item}`);
  }
  
  useEffect(() => {
    if(searchTerm) {
      let filteredData = searchTerms.filter(item => item.startsWith(searchTerm));
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
      filteredData = filteredData.slice(0, 10);
      setAutocompleteData(filteredData);
      setAutoCompleteLength(filteredData.length);
    } else {
      if(termsHistory.length > 0){
        setAutocompleteData(termsHistory.slice(0, 10));
        setAutoCompleteLength(termsHistory.length);
      } else {
        setAutocompleteData([]);
        setAutoCompleteLength(0);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, termsHistory]);

  useEffect(() => {
   console.log(termsHistory);
  }, [termsHistory])

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
                  className="title"
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