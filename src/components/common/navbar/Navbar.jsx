import React from 'react';

import './Navbar.css'

function Navbar () {

  return (
    <section className="navbar">
      {/* <a href="/" className="navbar-item">Home</a> */}
      <a href="/tracker" className="navbar-item">Tracker</a>
      <a href="/budget" className="navbar-item">Budget</a>
      <a href="/export" className="navbar-item">Export</a>
      <a href="/account" className="navbar-item">Account</a>
  </section>
  )

}

export default Navbar;