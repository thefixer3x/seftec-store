
import React from 'react';

const DefiHero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-800 to-indigo-900 py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-20 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900 opacity-90" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            DeFi Leadership
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Seftec is leading the charge in enterprise decentralized finance, delivering secure, 
            compliant DeFi solutions for forward-thinking businesses.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#market-leadership"
              className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Explore Our Vision
            </a>
            <a href="#technical-solution" className="text-base font-semibold leading-6 text-white">
              Technical Solutions <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefiHero;
