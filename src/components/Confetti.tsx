import { useCallback, useEffect, useRef } from "react";

import ReactCanvasConfetti from "react-canvas-confetti";

export default function Confetti() {
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  useEffect(() => fire(), []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  return (
    // The area is extended around the Quizz because I want the confetti to go all around.
    // It was NOT possible to make a fixed div taking the whole screen. Indeed, the quizz is
    // sometimes wrapped in a div that is translated. When a div is translated, the "fixed" position
    // works relative to it. https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed_positioning
    <ReactCanvasConfetti
      refConfetti={getInstance}
      style={{
        position: "absolute",
        pointerEvents: "none",
        width: 1400,
        height: 1400,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // border: "solid 4px red",
      }}
    />
  );
}
