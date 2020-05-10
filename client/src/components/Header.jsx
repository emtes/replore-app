import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>
        <Link to="/">Replore</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to="/repos">Repositories</Link>
          </li>
          <li>
            <a href="https://github.com/emtes/unit-8-project">Fork me on GitHub</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
