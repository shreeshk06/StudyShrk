import { useEffect, useRef } from 'react';

export default function Workspace({ state, socket }) {
  const iframeRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (!state) return;
    if (state.current?.type === 'website') iframeRef.current.src = state.current.url;
    if (state.current?.type === 'video') videoRef.current.src = state.current.url;
  }, [state]);

  const syncScroll = () => {
    socket.emit('workspace-action', {
      type: 'scroll',
      value: iframeRef.current.contentWindow.scrollY
    });
  };

  if (!state?.current) return <div className="flex-1 flex items-center justify-center text-zinc-500">Empty Workspace</div>;

  return (
    <div className="flex-1 relative overflow-hidden bg-zinc-950">
      {state.current.type === 'website' && <iframe ref={iframeRef} className="w-full h-full border-none" title="workspace" onLoad={syncScroll} />}
      {state.current.type === 'video' && <video ref={videoRef} controls className="w-full h-full object-contain" />}
      {state.current.type === 'pdf' && <iframe className="w-full h-full" src={state.current.url} />}
    </div>
  );
}