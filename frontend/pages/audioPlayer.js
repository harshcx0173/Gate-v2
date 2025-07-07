import { useState, useEffect, useRef } from "react";

export default function AudioPlayer() {
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [is8D, setIs8D] = useState(false);
  const [isLofi, setIsLofi] = useState(false);
  const [isEQ, setIsEQ] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  const audioRef = useRef(null);
  const pannerRef = useRef(null);
  const eqRef = useRef(null);
  const convolverRef = useRef(null);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);
  const updateTimeRef = useRef(null);

  useEffect(() => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(context);
    return () => context.close();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    audio.loop = isRepeat;
    audioRef.current = audio;

    audio.onloadedmetadata = () => setDuration(audio.duration);
    audio.ontimeupdate = () => setPosition(audio.currentTime);
  };

  const setupAudioGraph = () => {
    const context = audioContext;
    const audio = audioRef.current;

    if (!audio || !context) return;

    const sourceNode = context.createMediaElementSource(audio);
    const gainNode = context.createGain();
    const panner = context.createStereoPanner();
    const eq = context.createBiquadFilter();
    const convolver = context.createConvolver();

    eq.type = "lowshelf";
    eq.frequency.value = 200;
    eq.gain.value = 0;

    const impulseBuffer = context.createBuffer(
      2,
      0.5 * context.sampleRate,
      context.sampleRate
    );
    for (let channel = 0; channel < 2; channel++) {
      const buffer = impulseBuffer.getChannelData(channel);
      for (let i = 0; i < impulseBuffer.length; i++) {
        buffer[i] =
          (Math.random() * 2 - 1) * Math.pow(1 - i / impulseBuffer.length, 2);
      }
    }
    convolver.buffer = impulseBuffer;

    sourceNode.connect(eq);
    eq.connect(convolver);
    convolver.connect(panner);
    panner.connect(gainNode);
    gainNode.connect(context.destination);

    setSource(sourceNode);
    pannerRef.current = panner;
    eqRef.current = eq;
    convolverRef.current = convolver;
    gainNodeRef.current = gainNode;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !audioContext) return;

    if (!source) setupAudioGraph();

    if (isPlaying) {
      audio.pause();
      clearInterval(intervalRef.current);
    } else {
      audioContext.resume();
      audio.play();
      intervalRef.current = setInterval(() => {
        if (is8D && pannerRef.current) {
          const pan = Math.sin(Date.now() / 1000);
          pannerRef.current.pan.setValueAtTime(pan, audioContext.currentTime);
        }
      }, 100);
    }

    setIsPlaying(!isPlaying);
  };

  const toggle8D = () => setIs8D((prev) => !prev);

  const toggleEQ = () => {
    if (eqRef.current) {
      eqRef.current.gain.value = isEQ ? 0 : 10;
    }
    setIsEQ((prev) => !prev);
  };

  const toggleLofi = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = isLofi ? 1 : 0.8;
    setIsLofi((prev) => !prev);
  };

  const toggleRepeat = () => {
    const audio = audioRef.current;
    if (audio) audio.loop = !isRepeat;
    setIsRepeat((prev) => !prev);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = parseFloat(e.target.value);
      setPosition(audio.currentTime);
    }
  };

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎧 Next.js 8D + Lofi Music Player</h2>

      <input type="file" accept="audio/*" onChange={handleFileUpload} />

      <div style={{ marginTop: 20 }}>
        <button onClick={togglePlayPause}>
          {isPlaying ? "⏸ Pause" : "▶️ Play"}
        </button>
        <button onClick={toggle8D} style={{ marginLeft: 10 }}>
          {is8D ? "🔄 8D ON" : "➡️ 8D OFF"}
        </button>
        <button onClick={toggleEQ} style={{ marginLeft: 10 }}>
          {isEQ ? "🎚 EQ ON" : "🎛 EQ OFF"}
        </button>
        <button onClick={toggleLofi} style={{ marginLeft: 10 }}>
          {isLofi ? "🎵 Lofi Mode ON" : "🎶 Lofi Mode OFF"}
        </button>
        <button onClick={toggleRepeat} style={{ marginLeft: 10 }}>
          {isRepeat ? "🔁 Repeat ON" : "🔂 Repeat OFF"}
        </button>
      </div>

      {duration > 0 && (
        <div style={{ marginTop: 20 }}>
          <input
            type="range"
            min="0"
            max={duration}
            value={position}
            onChange={handleSeek}
            style={{ width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{formatTime(position)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
