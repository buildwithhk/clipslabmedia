import confetti from 'canvas-confetti';

export function triggerSuccessConfetti(originY = 0.65): void {
  try {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: originY },
      colors: ['#FF0054', '#FF3366', '#FFA670', '#121212'],
    });
  } catch {
    // Safe no-op if canvas/animation is unavailable
  }
}
