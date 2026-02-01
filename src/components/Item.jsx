import { MdNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';

function Item({ data }) {
  return (
    <div className="flex border-b border-[#BADDFE] text-item-text hover:bg-gray-50 group">
      <div className="flex-1 grid grid-cols-2 gap-x-4 p-3">
        <div className="font-bold text-black">{data.pv}</div>
        <div className="text-right">{data.apip}</div>
        
        <div className="font-bold text-black">{data.klo}</div>
        <div className="text-right">Yläpaine: {data.yp}</div>
        
        <div className="col-span-2">Alapaine: {data.ap}</div>
        <div className="col-span-2">Syke: {data.syke}</div>
        <div className="col-span-2">Vointi: {data.lisätieto}</div>
      </div>
      
      <div className="hidden group-hover:flex w-8 bg-item-editBg text-item-editText justify-center items-center">
        <Link to={`/edit/${data.id}`} className="text-item-editText">
          <MdNavigateNext className="text-2xl" />
        </Link>
      </div>
    </div>
  );
}

export default Item;