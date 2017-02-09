import React from "react";
import {push} from "react-router-redux";
import {connect} from "react-redux";
import {Link} from "react-router";

const Home = React.createClass({

  render() {
    return (
      <div>
        <h1>BlueChilli&rsquo;s front end component library.</h1>

        <p>A harmonious collection of <a href="https://facebook.github.io/react/">React</a> components,
          built to play with <a href="http://redux.js.org/">Redux</a>.</p>

        <hr/>


        <h2>Playground</h2>
        <ul>
          <li><Link to="/style-guide">Style Guide</Link></li>
          <li><Link to="/crud-helpers">Crud Helpers</Link></li>
          <li><Link to="components/fonticons">Font Icons</Link></li>
        </ul>
      </div>

    );
  }
});


export default connect()(Home);


