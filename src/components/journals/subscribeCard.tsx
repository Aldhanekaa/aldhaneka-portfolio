export default function JournalSubscribeCard() {
  return (
    <div className="w-full grid grid-cols-9 ">
      <div
        className="overflow-hidden col-span-9 grid grid-cols-9 py-16 rounded-3xl border-2 border-brand-300 relative"
        style={{
          background:
            'linear-gradient(93.74deg, #FFFDF9 -12.16%, #FFFDF9 -2.9%, #F8EDD9 11.31%, #F5E6CB 87.15%, #FFFDF9 103.16%)',
        }}
      >
        <div className="absolute -right-32 top-0 opacity-60">
          <img src="/lonceng.png"></img>
        </div>
        <div className="col-span-1 row-span-2"></div>
        <div className="col-span-7 row-span-1 z-10">
          <h4 className="MADEMellow text-5xl text-brand-350">
            {' '}
            Subscribe To My Journal!
          </h4>
        </div>
        <div className="col-span-5 row-span-1 mt-10 z-10">
          <div className="w-full overflow-hidden bg-brand-50 h-14 relative rounded-full border-2 border-brand-300">
            <input className="w-full h-full px-4"></input>
            <button
              type="button"
              className="py-4 px-4 absolute rounded-full right-0 top-0 text-brand-50"
              style={{
                background:
                  'linear-gradient(95.16deg, #F7E9D0 2.44%, #A8987B 42.73%, #AB9B7E 72.68%, #F5E6CB 111.51%)',
              }}
            >
              Get Notified!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
