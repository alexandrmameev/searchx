import SearchField from '../../components/SearchField';
import Logo from '../../components/Logo';

import './index.scss';

const Home = () => {
  return (
    <div className="home__page">
      <div className="home__logo">
        <Logo />
      </div>
      <div className="home__search">
        <SearchField autoFocus={true} />
      </div>
    </div>
  )
}

export default Home