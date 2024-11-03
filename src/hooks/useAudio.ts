import { useState, useCallback, useEffect, useRef } from "react";
interface UseAudioArgs {
 src: string;
 preload?: boolean;
 autoplay?: boolean;
 volume?: number;
 mute?: boolean;
 loop?: boolean;
 rate?: number;
}

const useAudio= ({
 src,
 preload = true,
 autoplay = false,
 volume = 0.5,
 mute = false,
 loop = false,
 rate = 1.0,
}: UseAudioArgs) => {
const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);
const [audioReady, setAudioReady] = useState<boolean>(false);
const [audioLoading, setAudioLoading] = useState<boolean>(true);
const [audioError, setAudioError] = useState<string>("")
const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
const [audioPaused, setAudioPaused] = useState<boolean>(false);
const [audioDuration, setAudioDuration] = useState<number>(0);
const [audioMute, setAudioMute] = useState<boolean>(false);
const [audioLoop, setAudioLoop] = useState<boolean>(false);
const [audioVolume, setAudioVolume] = useState<number>(volume);
const [audioSeek, setAudioSeek] = useState<number>(rate);
const [audioRate, setAudioRate] = useState<number>(0);
const audioSeekRef = useRef<number>();

const newAudio = useCallback(
 ({
   src,
   autoplay = false,
   volume = 0.5,
   mute = false,
   loop = false,
   rate = 1.0,
 }: any): HTMLAudioElement => {
   const audioElement = new Audio(src);
   audioElement.autoplay = autoplay;
   audioElement.volume = volume;
   audioElement.muted = mute;
   audioElement.loop = loop;
   audioElement.playbackRate = rate;
   return audioElement;
 },
[]);

const load = useCallback(({ src, preload, autoplay, volume, mute, loop, rate }: any) => {
 const newAudioElement = newAudio({
   src,
   preload,
   autoplay,
   volume,
   mute,
   loop,
   rate,
 });
newAudioElement.addEventListener('abort', () => setAudioError("Error!"));
newAudioElement.addEventListener('error', () => setAudioError("Error!"));
newAudioElement.addEventListener('loadeddata', () => {
 if (autoplay) {
   setAudioLoading(false);
   setAudioReady(true);
   setAudioDuration(newAudioElement.duration);
   setAudioMute(mute);
   setAudioLoop(loop)
   setAudioPlaying(true);
 } else {
   setAudioLoading(false);
   setAudioReady(true);
   setAudioDuration(newAudioElement.duration);
   setAudioMute(mute);
   setAudioLoop(loop);
 }
});
newAudioElement.addEventListener('play', () => {
 setAudioPlaying(true);
 setAudioPaused(false);
});
newAudioElement.addEventListener('pause', () => {
 setAudioPlaying(false);
 setAudioPaused(true);
});
newAudioElement.addEventListener('ended', () => {
 setAudioPlaying(false);
 setAudioPaused(false);
 setAudioSeek(0);
 setAudioLoading(false);
 setAudioError("");
});
setAudio(newAudioElement);
},
[newAudio]
);

useEffect(() => {
 if (!src) return;
 if (!preload) return;
 load({ src, autoplay, volume, mute, loop, rate });
}, [src, preload, autoplay, volume, mute, loop, rate, load]);

const onToggle = () => {
 if (!audio) return;
 if (audioReady) audio.play();
 if (audioPlaying) audio.pause();
};

const onPlay = () => {
 if (!audio) return;
 audio.play();
};
const onPause = () => {
 if (!audio) return;
 audio.pause();
};
const onMute = () => {
 if (!audio) return;
 audio.muted = !audioMute;
 setAudioMute(!audioMute);
};
const onLoop = () => {
 if (!audio) return;
 audio.loop = !audioLoop;
 setAudioLoop(!audioLoop);
};


const onVolume = (volume: number) => {
    if (!audio) return;
    setAudioVolume(volume);
    audio.volume = volume;
};

const onRate = (rate: number) => {
    if (!audio) return;
    setAudioRate(rate);
    audio.playbackRate = rate;
};

const onSeek = (seek: number) => {
    if (!audio) return;
    setAudioSeek(seek);
    audio.currentTime = seek;
};

useEffect(() => {
 const animate = () => {
   const seek = audio?.currentTime;
   setAudioSeek(seek as number);
   audioSeekRef.current = requestAnimationFrame(animate);
 };
 if (audio && audioPlaying) {
   audioSeekRef.current = requestAnimationFrame(animate);
 }
 return () => {
   if (audioSeekRef.current) {
     window.cancelAnimationFrame(audioSeekRef.current);
   }
 };
}, [audio, audioPlaying, audioPaused]);

return {
 ready: audioReady,
 loading: audioLoading,
 error: audioError,
 playing: audioPlaying,
 paused: audioPaused,
 duration: audioDuration,
 mute: audioMute,
 loop: audioLoop,
 volume: audioVolume,
 seek: audioSeek,
 rate: audioRate,
 onToggle,
 onPlay,
 onPause,
 onMute,
 onLoop,
 onVolume,
 onRate,
 onSeek,
}

}
export default useAudio;