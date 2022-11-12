import { Link } from 'react-router-dom';

import SearchField from '../../components/SearchField';

import './index.scss';

const Home = () => {
  return (
    <div className="home__page">
      <Link to="/" className="home__logo">
        <span className="blue">S</span>
        <span className="red">e</span>
        <span className="yellow">a</span>
        <span className="yellow">r</span>
        <span className="blue">c</span>
        <span className="green">h</span>
        <span className="red">X</span>
      </Link>
      <div className="home__search">
        <SearchField autoFocus={true} />
      </div>
    </div>
  )
}

export default Home