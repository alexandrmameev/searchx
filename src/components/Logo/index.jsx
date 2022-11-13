import { Link } from 'react-router-dom';

import './index.scss';

const Logo = ({ size }) => (
  <Link to="/" className={`logo ${size}`}>
    <span className="blue">S</span>
    <span className="red">e</span>
    <span className="yellow">a</span>
    <span className="yellow">r</span>
    <span className="blue">c</span>
    <span className="green">h</span>
    <span className="red">X</span>
  </Link>
)

export default Logo