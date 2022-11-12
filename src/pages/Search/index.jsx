import { useSearchParams  } from 'react-router-dom';

import SearchField from '../../components/SearchField';
import SearchList from '../../components/SearchList';
import Logo from '../../components/Logo';

import './index.scss';

const Search = () => {
  const [ searchParams ] = useSearchParams();

  return (
    <div className="search__page">
      <header className="search__header">
        <div className="search__logo">
          <Logo size="small" />
        </div>
        <div className="search__search-wrapper">
          <SearchField
            value={searchParams.get('q')}
          />
        </div>
      </header>
      <div className="search__content">
        <div className="search__info">
            Результатов: примерно 3 250 000 000 (0,45 сек.) 
        </div>
        <SearchList 
          items={'test'}
        />
      </div>
    </div>
  )
}

export default Search