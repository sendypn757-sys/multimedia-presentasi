(function () {
  'use strict';

  /* ---------- Navigasi slide ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var bar = document.getElementById('bar');
  var count = document.getElementById('count');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var current = 0;

  function go(n) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === n);
      s.classList.toggle('past', i < n);
      s.setAttribute('aria-hidden', i === n ? 'false' : 'true');
    });
    current = n;
    count.textContent = (n + 1) + ' / ' + slides.length;
    bar.style.width = ((n + 1) / slides.length * 100) + '%';
    prev.disabled = n === 0;
    next.disabled = n === slides.length - 1;
    slides[n].scrollTop = 0;
    try { history.replaceState(null, '', '#' + (n + 1)); } catch (e) {}
  }

  prev.addEventListener('click', function () { go(current - 1); });
  next.addEventListener('click', function () { go(current + 1); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') go(current + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(current - 1);
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(slides.length - 1);
  });

  var startX = null;
  document.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 60) go(current + (dx < 0 ? 1 : -1));
    startX = null;
  }, { passive: true });

  /* ---------- Slide 5: titik interaktif ---------- */
  var parts = [
    { t: 'Kepala', d: 'CT dan MRI diolah menjadi model 3D agar dokter bisa melihat struktur otak dari berbagai sudut. VR juga dipakai untuk terapi fobia dan kecemasan.' },
    { t: 'Dada', d: 'Animasi 3D jantung menjelaskan kondisi dan prosedur kepada pasien dengan bahasa visual, sehingga lebih mudah dipahami daripada istilah medis.' },
    { t: 'Lengan', d: 'Rehabilitasi berbasis VR dan game melatih gerak lengan setelah stroke, sambil merekam kemajuan pasien.' },
    { t: 'Kaki', d: 'Video latihan fisioterapi dan sensor gerak membantu pasien berlatih di rumah dengan arahan yang jelas.' }
  ];
  var info = document.getElementById('info');
  var hots = document.querySelectorAll('.hot');

  function showPart(i) {
    var p = parts[i];
    info.innerHTML = '<h3></h3><p></p>';
    info.querySelector('h3').textContent = p.t;
    info.querySelector('p').textContent = p.d;
    Array.prototype.forEach.call(hots, function (h) { h.classList.toggle('on', +h.dataset.i === i); });
  }
  Array.prototype.forEach.call(hots, function (h) {
    var i = +h.dataset.i;
    h.addEventListener('mouseenter', function () { showPart(i); });
    h.addEventListener('focus', function () { showPart(i); });
    h.addEventListener('click', function () { showPart(i); });
  });

  /* ---------- Slide 8: kuis ---------- */
  var questions = [
    { q: 'Apa yang dimaksud multimedia?', o: ['Hanya video', 'Gabungan teks, gambar, audio, video, animasi, dan interaksi', 'Hanya gambar bergerak'], a: 1 },
    { q: 'Elemen gamifikasi yang membangun kebiasaan belajar harian, seperti di Duolingo, adalah...', o: ['Streak', 'Firewall', 'Kompresi data'], a: 0 },
    { q: 'Manfaat telemedicine bagi daerah terpencil adalah...', o: ['Menggantikan semua operasi', 'Konsultasi dokter tanpa harus datang ke klinik', 'Menghilangkan biaya internet'], a: 1 },
    { q: 'Visual dan audio dalam pembelajaran membantu karena...', o: ['Materi lebih mudah dipahami dan diingat', 'Materi jadi lebih sedikit', 'Guru tidak lagi diperlukan'], a: 0 }
  ];
  var quiz = document.getElementById('quiz');
  var qi = 0, score = 0;

  function renderQ() {
    if (qi >= questions.length) {
      quiz.innerHTML = '<p class="q"></p><button class="btn" id="again">Ulangi kuis</button>';
      quiz.querySelector('.q').textContent = 'Skor kamu: ' + score + ' dari ' + questions.length;
      document.getElementById('again').addEventListener('click', function () { qi = 0; score = 0; renderQ(); });
      return;
    }
    var item = questions[qi];
    quiz.innerHTML = '<p class="q"></p><div class="opts"></div><p class="fb" aria-live="polite"></p><div class="qn"><span></span><button class="btn" id="nq" hidden>Lanjut</button></div>';
    quiz.querySelector('.q').textContent = (qi + 1) + '. ' + item.q;
    quiz.querySelector('.qn span').textContent = 'Soal ' + (qi + 1) + ' dari ' + questions.length;
    var opts = quiz.querySelector('.opts');
    item.o.forEach(function (text, i) {
      var b = document.createElement('button');
      b.className = 'opt';
      b.textContent = text;
      b.addEventListener('click', function () { answer(i, b); });
      opts.appendChild(b);
    });
  }

  function answer(i, btn) {
    var item = questions[qi];
    var all = quiz.querySelectorAll('.opt');
    Array.prototype.forEach.call(all, function (b) { b.disabled = true; });
    all[item.a].classList.add('ok');
    var fb = quiz.querySelector('.fb');
    if (i === item.a) { score++; fb.textContent = 'Benar.'; }
    else { btn.classList.add('bad'); fb.textContent = 'Belum tepat. Jawaban yang benar ditandai warna terang.'; }
    var nq = document.getElementById('nq');
    nq.hidden = false;
    nq.textContent = qi === questions.length - 1 ? 'Lihat skor' : 'Lanjut';
    nq.addEventListener('click', function () { qi++; renderQ(); });
  }
  renderQ();

  /* ---------- Slide 11: toggle perbandingan ---------- */
  var data = {
    pos: [
      ['Healthcare', 'Diagnosis lebih jelas, edukasi pasien lebih mudah, layanan menjangkau daerah jauh.'],
      ['Education', 'Belajar fleksibel, materi visual lebih mudah dipahami, motivasi naik lewat gamifikasi.'],
      ['Entertainment', 'Akses luas ke konten, peluang kerja bagi kreator, pengalaman yang makin imersif.']
    ],
    neg: [
      ['Healthcare', 'Privasi data pasien dan biaya perangkat canggih.'],
      ['Education', 'Kesenjangan akses internet dan perangkat, serta distraksi saat belajar.'],
      ['Entertainment', 'Risiko kecanduan, waktu layar berlebih, dan hak cipta.']
    ]
  };
  var cmp = document.getElementById('cmp');
  var col = document.getElementById('col');
  var toggles = document.querySelectorAll('.toggle button');

  function renderCmp(k) {
    cmp.classList.add('fade');
    setTimeout(function () {
      cmp.innerHTML = '';
      data[k].forEach(function (row) {
        var tr = document.createElement('tr');
        row.forEach(function (c) {
          var td = document.createElement('td');
          td.textContent = c;
          tr.appendChild(td);
        });
        cmp.appendChild(tr);
      });
      col.textContent = k === 'pos' ? 'Dampak positif' : 'Tantangan';
      cmp.classList.remove('fade');
    }, 200);
  }
  Array.prototype.forEach.call(toggles, function (b) {
    b.addEventListener('click', function () {
      Array.prototype.forEach.call(toggles, function (x) { x.classList.toggle('on', x === b); });
      renderCmp(b.dataset.t);
    });
  });
  cmp.innerHTML = '';
  data.pos.forEach(function (row) {
    var tr = document.createElement('tr');
    row.forEach(function (c) { var td = document.createElement('td'); td.textContent = c; tr.appendChild(td); });
    cmp.appendChild(tr);
  });

  /* ---------- Slide 10: tab studi kasus dengan video YouTube ---------- */
  /* id = ID video YouTube (11 karakter setelah "v=" pada URL) */
  var cases = [
    { name: 'Netflix', file: '', poster: '', captions: '', id: 'Cm73ma6Ibcs',
      src: 'Blue Eye Samurai Hammerscale, Netflix',
      text: 'Memakai rekomendasi berbasis data dan streaming adaptif yang menyesuaikan kualitas video dengan kecepatan internet penonton.' },
    { name: 'Industri game', file: '', poster: '', captions: '', id: 'nRDkkpScTF4',
      src: 'MPL ID S18 GRAND FINALS Bahasa Indonesia, MPL Indonesia',
      text: 'Game mobile seperti Mobile Legends membangun komunitas dan turnamen esports yang besar di Indonesia.' },
    { name: 'Film dan efek visual', file: '', poster: '', captions: '', id: '_I74C4_w1so',
      src: 'DEADPOOL & WOLVERINE | VFX Breakdown, FilmIsNow Epic Movie Zone',
      text: 'CGI memungkinkan adegan yang mustahil direkam secara nyata, dari dunia fantasi sampai aksi berskala besar.' }
  ];
  var tl = document.querySelector('.tablist');
  var tp = document.getElementById('tabp');

  function pick(i) {
    var c = cases[i];
    Array.prototype.forEach.call(tl.children, function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    tp.innerHTML = '<div class="video"></div><h3></h3><p></p><p class="src"></p>';
    var box = tp.querySelector('.video');
    if (c.file) {
      var v = document.createElement('video');
      v.controls = true;
      v.preload = 'metadata';
      v.playsInline = true;
      v.src = c.file + '#t=0.5';
      if (c.poster) v.poster = c.poster;
      v.setAttribute('aria-label', 'Video: ' + c.name);
      if (c.captions) {
        var t = document.createElement('track');
        t.kind = 'subtitles'; t.src = c.captions; t.srclang = 'id'; t.label = 'Indonesia'; t.default = true;
        v.appendChild(t);
      }
      box.appendChild(v);
    } else if (/^[\w-]{11}$/.test(c.id)) {
      var btn = document.createElement('button');
      btn.className = 'play';
      btn.setAttribute('aria-label', 'Putar video: ' + c.name);
      btn.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + c.id + '/hqdefault.jpg)';
      btn.innerHTML = '<span aria-hidden="true">&#9654;</span>';
      btn.addEventListener('click', function () {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + c.id + '?autoplay=1&rel=0';
        f.title = 'Video: ' + c.name;
        f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        box.innerHTML = '';
        box.appendChild(f);
      });
      box.appendChild(btn);
    } else {
      box.textContent = 'Isi file atau id video di script.js (array cases)';
    }
    tp.querySelector('h3').textContent = c.name;
    tp.querySelectorAll('p')[0].textContent = c.text;
    var srcEl = tp.querySelector('.src');
    srcEl.textContent = 'Video: ' + c.src;
    if (!c.file && /^[\w-]{11}$/.test(c.id)) {
      var a = document.createElement('a');
      a.href = 'https://www.youtube.com/watch?v=' + c.id;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'Tonton di YouTube';
      srcEl.appendChild(document.createTextNode(' · '));
      srcEl.appendChild(a);
    }
  }
  cases.forEach(function (c, i) {
    var b = document.createElement('button');
    b.className = 'tab'; b.setAttribute('role', 'tab'); b.textContent = c.name;
    b.addEventListener('click', function () { pick(i); });
    tl.appendChild(b);
  });
  pick(0);

  /* ---------- Efek parallax orb di slide judul ---------- */
  var orb = document.querySelector('.orb');
  if (orb && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    slides[0].addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - .5) * 40;
      var y = (e.clientY / window.innerHeight - .5) * 40;
      orb.style.translate = x + 'px ' + y + 'px';
    });
  }

  /* ---------- Mulai ---------- */
  var start = parseInt(location.hash.replace('#', ''), 10);
  go(isNaN(start) ? 0 : start - 1);
})();