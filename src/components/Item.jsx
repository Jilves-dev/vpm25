import { MdNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';

// Lifestyle tagejen värit
const LIFESTYLE_COLORS = {
  'Suolan vähentäminen': 'bg-orange-100 text-orange-700',
  'Liikunta': 'bg-green-100 text-green-700',
  'Hyvä uni': 'bg-purple-100 text-purple-700',
  'Vähä alkoholia': 'bg-blue-100 text-blue-700',
  'Stressinhallinta': 'bg-pink-100 text-pink-700',
  'Terveellinen ruokavalio': 'bg-yellow-100 text-yellow-700',
};

// Default väri jos kategoria ei ole listassa
const DEFAULT_COLOR = 'bg-gray-100 text-gray-700';

function Item({ data }) {
  return (
    <div className="flex border-b border-[#BADDFE] text-[#999999] hover:bg-gray-50 group">
      <div className="flex-1 p-3">
        {/* Yläpalki: päivä + apip */}
        <div className="grid grid-cols-2 gap-x-4">
          <div className="font-bold text-black">{data.pv}</div>
          <div className="text-right">{data.apip}</div>
        </div>

        {/* Klo + Yläpaine */}
        <div className="grid grid-cols-2 gap-x-4">
          <div className="font-bold text-black">{data.klo}</div>
          <div className="text-right">Yläpaine: {data.yp}</div>
        </div>

        {/* Alapaine, Syke, Vointi */}
        <div>Alapaine: {data.ap}</div>
        <div>Syke: {data.syke}</div>
        <div>Vointi: {data.lisätieto}</div>

        {/* Lifestyle tagit */}
        {data.lifestyle && data.lifestyle.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.lifestyle.map((item) => (
              <span
                key={item}
                className={`text-xs px-2 py-0.5 rounded-full ${LIFESTYLE_COLORS[item] || DEFAULT_COLOR}`}
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Edit nappi */}
      <div className="hidden group-hover:flex w-8 bg-[#dddddd] text-[#666666] justify-center items-center">
        <Link to={`/edit/${data.id}`} className="text-[#666666]">
          <MdNavigateNext className="text-2xl" />
        </Link>
      </div>
    </div>
  );
}

export default Item;