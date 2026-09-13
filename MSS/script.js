(function(){
  "use strict";

  var frame = document.getElementById('frame');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Entrance reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  /* ---------- Ambient floating hearts in hero ---------- */
  var heartField = document.getElementById('heartField');
  var heartGlyphs = ['♥', '♡'];

  function spawnDriftHeart(){
    if (!heartField) return;
    var h = document.createElement('span');
    h.className = 'drift-heart';
    h.textContent = heartGlyphs[Math.random() < 0.5 ? 0 : 1];
    var left = 8 + Math.random() * 84;
    var drift = (Math.random() * 60 - 30) + 'px';
    var duration = 6 + Math.random() * 4;
    h.style.left = left + '%';
    h.style.setProperty('--drift-x', drift);
    h.style.animationDuration = duration + 's';
    h.style.fontSize = (12 + Math.random() * 10) + 'px';
    heartField.appendChild(h);
    setTimeout(function(){ h.remove(); }, duration * 1000 + 200);
  }

  var driftTimer = null;
  if (!reduceMotion){
    driftTimer = setInterval(spawnDriftHeart, 1400);
    spawnDriftHeart();
  }

  /* ---------- Flip cards ---------- */
  var flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(function(card){
    function toggle(){ card.classList.toggle('flipped'); }
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggle();
      }
    });
  });

  /* ---------- Love letter reveal ---------- */
  var letterBtn = document.getElementById('letterBtn');
  var parchment = document.getElementById('parchment');
  if (letterBtn && parchment){
    letterBtn.addEventListener('click', function(){
      parchment.classList.add('open');
      letterBtn.classList.add('is-hidden');
      letterBtn.setAttribute('aria-expanded', 'true');
      setTimeout(function(){
        parchment.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }, 150);
    });
  }

  /* ---------- Burst hearts on "send some love" ---------- */
  var sendLoveBtn = document.getElementById('sendLoveBtn');
  if (sendLoveBtn){
    sendLoveBtn.addEventListener('click', function(e){
      var rect = sendLoveBtn.getBoundingClientRect();
      var originX = rect.left + rect.width / 2;
      var originY = rect.top + rect.height / 2;
      var count = reduceMotion ? 0 : 14;

      for (var i = 0; i < count; i++){
        var heart = document.createElement('span');
        heart.className = 'burst-heart';
        heart.textContent = Math.random() < 0.5 ? '♥' : '♡';
        heart.style.left = originX + 'px';
        heart.style.top = originY + 'px';

        var angle = Math.random() * Math.PI * 2;
        var distance = 70 + Math.random() * 90;
        var bx = Math.cos(angle) * distance;
        var by = Math.sin(angle) * distance - 40;

        heart.style.setProperty('--bx', bx + 'px');
        heart.style.setProperty('--by', by + 'px');
        heart.style.fontSize = (14 + Math.random() * 12) + 'px';
        heart.style.color = Math.random() < 0.5 ? 'var(--wine)' : 'var(--rose)';

        document.body.appendChild(heart);
        (function(el){
          setTimeout(function(){ el.remove(); }, 1200);
        })(heart);
      }
    });
  }

})();