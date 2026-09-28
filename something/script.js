document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const sealBtn = document.getElementById('seal-btn');
  const envelopeStage = document.getElementById('envelope-stage');
  const letterStage = document.getElementById('letter-stage');

  function openLetter() {
    if (envelope.classList.contains('open')) return;

    // Trigger opening animation on the envelope
    envelope.classList.add('open');

    // Smooth transition to display the letter document
    setTimeout(() => {
      envelopeStage.classList.add('hidden');
      letterStage.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  }

  sealBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openLetter();
  });

  envelope.addEventListener('click', openLetter);
});