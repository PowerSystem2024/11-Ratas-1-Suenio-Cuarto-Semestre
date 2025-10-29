import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
    />
  );
});
export default Input;
