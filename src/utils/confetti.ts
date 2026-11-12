import confetti from 'canvas-confetti';

export function triggerSuccessConfetti(originY = 0.65): void {
  try {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: originY },
      colors: ['#AAFF00', '#FF0054', '#121212'],
    });
  } catch {
    // Safe no-op if canvas/animation is unavailable
  }
}
