import { useState } from 'react';

export default function MediaPanel({ socket, room }) {
  const [url, setUrl] = useState('');

  const detectType = (u) => {
    if (u.includes('youtube')) return 'video';
    if (u.endsWith('.pdf')) return 'pdf';
    return 'website';
  };

  const load = () => {
    if (!url) return;
    socket.emit('workspace-load', { room, object: { type: detectType(url), url } });
    setUrl('');
  };

  return (
    <div className="bg-zinc-900 border-t border-zinc-800 p-4 flex gap-3">
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste any website/video/pdf link" className="flex-1 bg-zinc-800 rounded-xl p-3 text-white outline-none" />
      <button onClick={load} className="bg-cyan-500 px-6 rounded-xl font-bold">Load</button>
    </div>
  );
}