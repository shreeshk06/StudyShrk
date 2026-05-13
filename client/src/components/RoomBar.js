export default function RoomBar({ room }) {
  return (
    <div className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-5">
      <div className="text-2xl font-bold text-cyan-500">StudyShrk</div>
      <div className="bg-zinc-800 px-4 py-2 rounded-xl text-sm font-mono tracking-widest text-zinc-400">
        ROOM: <span className="text-white">{room}</span>
      </div>
    </div>
  );
}