import { useState, useEffect, useRef } from "react";

const videoFiles = ["A.mp4", "B.mp4", "C.mp4", "D.mp4"];
const FADE_DURATION_MS = 1000;

const VideoBackground = () => {
  // Index of the video currently visible
  const [currentIndex, setCurrentIndex] = useState(0);
  // Whether the first video element is visible (true) or second (false)
  const [showFirst, setShowFirst] = useState(true);
  // Tracks if we are currently transitioning to prevent race conditions
  const isTransitioning = useRef(false);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  // Helper: get next index in circular manner
  const getNextIndex = (index: number) => (index + 1) % videoFiles.length;

  // On mount: preload first two videos, with first video visible and playing
  useEffect(() => {
    if (!videoRef1.current || !videoRef2.current) return;

    // Set up first video - visible and playing
    videoRef1.current.src = videoFiles[currentIndex];
    videoRef1.current.load();
    videoRef1.current.style.zIndex = "10";

    videoRef1.current
      .play()
      .catch((e) => console.error("Error playing first video:", e));

    // Preload next video in second video element, hidden, no play yet
    const nextIndex = getNextIndex(currentIndex);
    videoRef2.current.src = videoFiles[nextIndex];
    videoRef2.current.load();
    videoRef2.current.style.opacity = "0";
    videoRef2.current.style.zIndex = "0";
  }, []);

  const handleVideoEnd = () => {
    if (isTransitioning.current) return; // Prevent overlapping transitions

    isTransitioning.current = true;

    const currentVideo = showFirst ? videoRef1.current : videoRef2.current;
    const nextVideo = showFirst ? videoRef2.current : videoRef1.current;

    if (!currentVideo || !nextVideo) {
      isTransitioning.current = false;
      return;
    }

    const nextIndex = getNextIndex(currentIndex);

    // Start playing nextVideo immediately
    nextVideo
      .play()
      .then(() => {
        // Fade crossfade start:
        // Fade out current, fade in next - use CSS transitions

        currentVideo.style.transition = `opacity ${FADE_DURATION_MS}ms ease-in-out`;
        nextVideo.style.transition = `opacity ${FADE_DURATION_MS}ms ease-in-out`;

        // Bring next video on top
        nextVideo.style.zIndex = "10";
        currentVideo.style.zIndex = "0";

        // Start fade
        currentVideo.style.opacity = "0";
        nextVideo.style.opacity = "1";

        // After fade duration, update states
        setTimeout(() => {
          setCurrentIndex(nextIndex);
          setShowFirst((prev) => !prev);

          // Now preload the next-next video for the hidden element (which is currentVideo)
          const upcomingIndex = getNextIndex(nextIndex);
          currentVideo.src = videoFiles[upcomingIndex];
          currentVideo.load();
          currentVideo.style.opacity = "0";
          currentVideo.style.zIndex = "0";

          // Pause the now hidden video to save resources
          currentVideo.pause();

          isTransitioning.current = false;
        }, FADE_DURATION_MS);
      })
      .catch((err) => {
        console.error("Failed to start next video playback:", err);
        // fallback: switch visibility immediately without fade
        setCurrentIndex(nextIndex);
        setShowFirst((prev) => !prev);
        isTransitioning.current = false;
      });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
      <video
        ref={videoRef1}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover absolute top-0 left-0"
        style={{
          opacity: showFirst ? 1 : 0,
          zIndex: showFirst ? 10 : 0,
          transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
        }}
      />
      <video
        ref={videoRef2}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="w-full h-full object-cover absolute top-0 left-0"
        style={{
          opacity: !showFirst ? 1 : 0,
          zIndex: !showFirst ? 10 : 0,
          transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
        }}
      />
      {/* Optional overlay gradient */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.1) 0%, hsl(var(--background) / 0.6) 85%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
};

export default VideoBackground;
