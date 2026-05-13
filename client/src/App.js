import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Workspace from './components/Workspace';
import RoomBar from './components/RoomBar';
import MediaPanel from './components/MediaPanel';
import ChatPanel from './components/ChatPanel';

const socket = io('http://localhost:4000');

export default function App() {
  const [room, setRoom] = useState('');
  const [joined, setJoined] = useState(false);
  const [name, setName] = useState('');
  const [state, setState] = useState(null);

  useEffect(() => {
    socket.on('room-state', data => setState(data));
    socket.on('workspace-update', data => setState(data));
    return () => {
      socket.off('room-state');
      socket.off('workspace-update');
    };
  }, []);

  const joinRoom = () => {
    if (!room || !name) return;
    socket.emit('join-room', { room, name });
    setJoined(true);
  };

  if (!joined) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900 rounded-3xl border border-zinc-800 p-8 space-y-5">
          <h1 className="text-4xl font-bold text-white">StudyShrk</h1>
          <input className="w-full bg-zinc-800 rounded-xl p-4 text-white" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-full bg-zinc-800 rounded-xl p-4 text-white" placeholder="Room code" value={room} onChange={e => setRoom(e.target.value)} />
          <button onClick={joinRoom} className="w-full bg-cyan-500 text-white p-4 rounded-xl font-bold">Join Workspace</button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <RoomBar room={room} />
      <div className="flex flex-1 overflow-hidden">
        <Workspace socket={socket} state={state} />
        <ChatPanel socket={socket} room={room} />
      </div>
      <MediaPanel socket={socket} room={room} />
    </div>
  );
}