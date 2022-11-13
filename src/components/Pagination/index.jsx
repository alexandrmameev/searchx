import './index.scss';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const nextPage = () => {
    if(currentPage !== totalPages) setCurrentPage(currentPage + 1);
  }

  const prevPage = () => {
    if(currentPage !== 1) setCurrentPage(currentPage - 1);
  }

  return (
    <div className="pagination__block">
      {currentPage !== 1 && (
        <button 
          className="pagination__item prev"
          onClick={prevPage}
        >
          Previous
        </button>
      )}
      {pageNumbers && pageNumbers.map(item => (
        <button 
          className={`pagination__item ${currentPage === item ? 'active' : ''}`}
          key={item}
          onClick={() => setCurrentPage(item)}
        >
          {item}
        </button>
      ))}
      {currentPage !== totalPages && (
        <button 
          className="pagination__item next"
          onClick={nextPage}
        >
          Next
        </button>
      )}
    </div>
  )
}

export default Pagination