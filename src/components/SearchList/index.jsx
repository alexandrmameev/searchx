import { useState } from 'react';

import Pagination from '../Pagination';

import './index.scss';

const SearchList = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);

  const indexOfLastItem = currentPage * resultsPerPage;
  const indexOfFirstItem = indexOfLastItem - resultsPerPage;
  const currentResults = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / resultsPerPage)

  return (
    <div className="search-results__block">
      <div className="search-results__list">
        {currentResults && currentResults.map(({ link, title, description }, index) => (
          <div className="search-results__item" key={index}>
            <a href={link} target="_blank" rel="noreferrer" className="link-wrap">
              <div className="link">{link}</div>
              <div className="title">{title}</div>
            </a>
            <div className="description">{description}</div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="search-results__pagination">
          <Pagination 
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

export default SearchList