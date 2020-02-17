import React from 'react';

import conf from 'config/app'
import './style.scss';

const Footer = () => (
  <footer>
    <section>This project is licensed under the MIT license.</section>
    <section>Made with <span role="img" aria-label="heart-emoji">❤️</span> by <a 
      href={conf.config.footerURL}>Nervatura</a></section>
  </footer>
);

export default Footer;
