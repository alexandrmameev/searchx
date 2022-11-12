import './index.scss';

const SearchList = ({ items }) => {
  return (
    <div className="search-results__block">
      <div className="search-results__list">
        {items && items.map(({ link, title, description }, index) => (
          <div className="search-results__item" key={index}>
            <a href={link} target="_blank" rel="noreferrer" className="link-wrap">
              <div className="link">{link}</div>
              <div className="title">{title}</div>
            </a>
            <div className="description">{description}</div>
          </div>
        ))}
      </div>
      <div className="search-results__pagination">
        Pager
      </div>
    </div>
  )
}

export default SearchList