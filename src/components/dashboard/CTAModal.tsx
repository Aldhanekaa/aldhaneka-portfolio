import React from 'react';

export default function CTAModal({
  isModalShown,
  children,
  onClose,
}: {
  isModalShown: string;
  children: React.ReactNode[] | React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className={`${
        isModalShown ? 'block' : 'hidden'
      } w-full absolute top-0 left-0 h-full`}
    >
      <div className="relative w-full h-full ">
        <div className="relative w-full h-full rounded-2xl bg-brand-350 opacity-75"></div>
        <div className="absolute top-0 right-0 left-0 py-32 px-72">
          <div className="bg-brand-50  mx-auto rounded-2xl px-10 py-14">
            <div className="flex justify-between">
              <h3 className="MADEMellow text-5xl text-brand-300">
                {isModalShown}
              </h3>
              <div
                className="text-2xl cursor-pointer"
                onClick={() => {
                  onClose();
                }}
              >
                <span className="material-symbols-outlined">close</span>
              </div>
            </div>

            {/* HERE IS CONTENT */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
