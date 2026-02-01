function Content({ children }) {
  return (
    <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-track-white scrollbar-thumb-gray-300">
      {children}
    </div>
  );
}

export default Content;