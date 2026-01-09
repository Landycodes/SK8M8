
export default function InfoModal({ setModalOpen }) {
  return (
    <div className="dialog-box">
      <button className="self-end p-2" onClick={() => setModalOpen(false)}>
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-400 text-white text-sm">
          X
        </span>
      </button>
      <h3 className="mb-[15px] text-xl/6 text-center">How To Play</h3>
      <section className="text-start">
        <h2 className="font-bold text-lg/normal">1 Player</h2>
        <p>
          Select a difficulty setting that suits you and tap spin for a trick to
          try. Flatground, down a gap, off a ramp, go nuts! Just dont sue me if
          you go making a fool of yourself trying to jeffwonSong it down a 10
          stair.
        </p>
      </section>
      <br></br>
      <section className="text-start">
        <h2 className="font-bold text-lg/normal">2+ Players</h2>
        <p>
          This is a survival game. All players choose a difficulty. Someone
          spins for a trick, and everyone must attempt it. Miss the trick, get a
          letter. Collect all letters (S-K-A-T-E) and you're out. Last player
          standing wins. Players can skip a spin if everyone agrees. The final
          letter gets two attempts.
        </p>
      </section>
      <br></br>
      <h3 className="mb-[15px] text-xl/6 text-center">Install Me</h3>
      <ol className="text-start list-decimal text-lg/snug">
        <li>Tap the 3 dots in your browser</li>
        <br></br>
        <li>
          Tap share <small> *If you're using an iphone</small>
        </li>
        <br></br>
        <li>Select "Add to Home Screen"</li>
      </ol>
    </div>
  );
}
