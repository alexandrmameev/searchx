import { useLocation } from 'react-router-dom';

import Logo from '../Logo';

import robot from '../../assets/img/robot.png';

import './index.scss';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="not-found__page">
      <div className="not-found__row">
        <div className="not-found__content">
          <div className="not-found__logo">
            <Logo size="medium" />
          </div>
          <div className="not-found__text">
            <div className="error">
              <strong>404.</strong> That's an error.
            </div>
            <div className="info">The requested URL {location.pathname} was not found on this server.<br/><span>That's all we know.</span></div>
          </div>
        </div>
        <div className="not-found__image">
          <img src={robot} alt="Page not found" />
        </div>
      </div>
    </div>
  )
}

export default NotFound