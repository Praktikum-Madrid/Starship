import React from 'react';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <>
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
