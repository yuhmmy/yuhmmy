import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="ui center aligned container">
          Copyright &copy; yUHmmy, University of Hawaii Manoa<br />
          <a href="https://yuhmmy.github.io/">yUHmmy&apos;s GitHub</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
