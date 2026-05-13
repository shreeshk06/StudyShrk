import { useEffect, useState } from 'react';

export default function ChatPanel({ socket }) {
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat-message', m => setMessages(prev => [...prev, m]));
    return () => socket.off('chat-message');
  }, []);

  const send = () => {
    if (!msg) return;
    socket.emit('chat-message', { text: msg });
    setMsg('');
  };

  return (
    <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col">
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((m, i) => <div key={i} className="bg-zinc-800 p-3 rounded-xl">{m.text}</div>)}
      </div>
      <div className="p-3 flex gap-2">
        <input value={msg} onChange={e => setMsg(e.target.value)} className="flex-1 bg-zinc-800 p-3 rounded-xl text-white outline-none" placeholder="Message..." />
        <button onClick={send} className="bg-cyan-500 px-5 rounded-xl font-bold">Send</button>
      </div>
    </div>
  );
}