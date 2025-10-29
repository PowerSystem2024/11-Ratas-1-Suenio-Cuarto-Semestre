function Card({ children }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full border border-gray-100 transition-all hover:shadow-xl">
      {children}
    </div>
  );
}

export default Card;
