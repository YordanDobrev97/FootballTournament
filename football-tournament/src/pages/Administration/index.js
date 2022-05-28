import { Link } from 'react-router-dom'
import Search from '../../components/Search'

import './index.scss'

const Administration = () => {
  return (
    <div>
      <main>
        <div class="flex-grid">
          <div>
            <h2>Clean CSS Code</h2>
            <ul>
              <li>no position: absolute</li>
              <li>no float</li>
              <li>no clearfix</li>
              <li>no faux columns</li>
              <li>no javascript</li>
            </ul>
          </div>
          <div>
            <h2>Font Awesome</h2>
            <ul>
              <li>no images</li>
              <li>no extra retina sprites</li>
            </ul>
          </div>
          <div>
            <h2>SCSS</h2>
            <ul>
              <li>no headache :)</li>
            </ul>
          </div>
        </div>

        <div class="flex-grid">
          <div>
            <h2>Headline</h2>
            Some Content
          </div>
          <div>
            <h2>Headline</h2>
            Some Content
          </div>
        </div>

        <div class="flex-grid">
          <div>
            <h2>Headline</h2>
            Some Content
          </div>
        </div>
      </main>
    </div>
  );
};

export default Administration;
