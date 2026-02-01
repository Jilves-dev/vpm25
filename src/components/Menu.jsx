import { Link } from 'react-router-dom';
import { MdViewList, MdTimeline, MdSettings } from 'react-icons/md';

function Menu() {
  return (
    <div className="bg-black text-white h-16 flex justify-evenly items-center">
      <div>
        <Link to="/" className="text-white text-2xl">
          <MdViewList />
        </Link>
      </div>
      <div>
        <Link to="/stats" className="text-white text-2xl">
          <MdTimeline />
        </Link>
      </div>
      <div>
        <Link to="/settings" className="text-white text-2xl">
          <MdSettings />
        </Link>
      </div>
    </div>
  );
}

export default Menu;