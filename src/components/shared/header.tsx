import React from "react";

const Header = () => {
  return (
    <header className="col-span-full">
      <div className="flex items-center justify-end py-2 bg-gray-50 border h-16">
        <div className="mx-4">
          <button className="text-center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none py-2 px-6 rounded-md bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
            Save changes
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
