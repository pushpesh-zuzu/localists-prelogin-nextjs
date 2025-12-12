import React from 'react';

function NavigationArrows({ onPrev, onNext, canScrollPrev, canScrollNext }) {
  return (
    <div className='rounded-full bg-[#7CD6F0] w-[77px] h-[47px] flex items-center justify-between px-3'>
      <button 
        onClick={onPrev}
        disabled={!canScrollPrev}
        className="disabled:opacity-30 cursor-pointer disabled:cursor-default"
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="rgba(37, 50, 56, 1)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        onClick={onNext}
        disabled={!canScrollNext}
        className="disabled:opacity-30 cursor-pointer disabled:cursor-default"
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="rgba(37, 50, 56, 1)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default NavigationArrows;