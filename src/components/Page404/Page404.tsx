import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header/Header';

export default function Page404() {
  return (
    <>
      <Header />
      <div>Страница 404</div>
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to='/'>Go to the home page</Link>
        </p>
      </div>
    </>
  );
}
