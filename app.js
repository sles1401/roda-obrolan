(() => {
  'use strict';

  // =========================================================================
  // 1. Constants & Seed Data
  // =========================================================================
  const STORAGE_KEYS = {
    CUSTOM_TOPICS: 'roda_obrolan_custom_topics_v1',
    DELETED_IDS: 'roda_obrolan_deleted_ids_v1',
    FAVORITES: 'roda_obrolan_favorites_v1',
    HISTORY: 'roda_obrolan_history_v1',
    MUTED: 'roda_obrolan_muted_v1',
  };

  const CATEGORIES = [
    { id: 'all', label: 'Semua Kategori', shortLabel: 'Semua', color: '#1E293B' },
    { id: 'santai', label: 'Santai & Sehari-hari', shortLabel: 'Santai', color: '#2A9D8F' },
    { id: 'kenalan', label: 'Kenalan Baru (Icebreaker)', shortLabel: 'Kenalan Baru', color: '#F4A261' },
    { id: 'reflektif', label: 'Reflektif & Cerita', shortLabel: 'Reflektif', color: '#8E5572' },
    { id: 'imajinatif', label: 'Seru & Imajinatif', shortLabel: 'Imajinatif', color: '#E05D44' },
  ];

  // Curated harmonious palette with guaranteed text contrast
  const WHEEL_PALETTE = [
    { bg: '#E05D44', text: '#FFFFFF' }, // Coral
    { bg: '#F4A261', text: '#1E293B' }, // Warm Amber
    { bg: '#2A9D8F', text: '#FFFFFF' }, // Sage Teal
    { bg: '#E9C46A', text: '#1E293B' }, // Mustard
    { bg: '#457B9D', text: '#FFFFFF' }, // Slate Blue
    { bg: '#8E5572', text: '#FFFFFF' }, // Plum
    { bg: '#6B9080', text: '#FFFFFF' }, // Olive Sage
    { bg: '#E76F51', text: '#FFFFFF' }, // Terracotta
  ];

  const SEED_TOPICS = [
    // Santai & Sehari-hari
    {
      id: 'seed-santai-1',
      category: 'santai',
      question: 'Kalau lagi capek banget, comfort food apa yang paling ampuh bikin mood balik?',
      followup: 'Biasanya beli di tempat langganan atau bikin sendiri di rumah?',
    },
    {
      id: 'seed-santai-2',
      category: 'santai',
      question: 'Kebiasaan pagi apa yang kalau kelewat bikin harimu berasa ada yang kurang?',
      followup: 'Sejak kapan mulai punya kebiasaan itu?',
    },
    {
      id: 'seed-santai-3',
      category: 'santai',
      question: 'Tempat nongkrong atau kafe mana yang belakangan paling sering kamu kunjungi?',
      followup: 'Menu apa yang paling wajib dipesan kalau ke sana?',
    },
    {
      id: 'seed-santai-4',
      category: 'santai',
      question: 'Kalau punya waktu kosong 2 jam tanpa gangguan sama sekali, kamu paling sering ngapain?',
      followup: 'Lebih suka ngelakuin itu sendirian atau bareng orang lain?',
    },
    {
      id: 'seed-santai-5',
      category: 'santai',
      question: 'Lagu, podcast, atau tontonan apa yang lagi sering nemenin kamu pas lagi di jalan?',
      followup: 'Ada rekomendasi satu episode atau lagu yang paling nempel?',
    },
    {
      id: 'seed-santai-6',
      category: 'santai',
      question: 'Jajanan pinggir jalan atau camilan sore apa yang susah banget kamu tolak?',
      followup: 'Tim yang makannya pakai sambal/pedas atau yang gurih-manis aja?',
    },
    {
      id: 'seed-santai-7',
      category: 'santai',
      question: 'Weekend ideal versi kamu itu yang penuh jadwal keluar atau mager total di rumah?',
      followup: 'Weekend kemarin akhirnya jadi ngapain?',
    },
    {
      id: 'seed-santai-8',
      category: 'santai',
      question: 'Barang receh di bawah seratus ribu apa yang ternyata paling kepake di hidupmu sekarang?',
      followup: 'Awalnya nemu atau kepikiran beli barang itu dari mana?',
    },

    // Kenalan Baru (Icebreaker)
    {
      id: 'seed-kenalan-1',
      category: 'kenalan',
      question: 'Hal kecil apa tentang kamu yang biasanya bikin orang baru kenal jadi kaget atau nggak nyangka?',
      followup: 'Reaksi orang-orang waktu baru tahu biasanya gimana?',
    },
    {
      id: 'seed-kenalan-2',
      category: 'kenalan',
      question: 'Lagi ada hobi atau topik random apa yang belakangan bikin kamu betah ngulik berjam-jam?',
      followup: 'Awal mula ketertarikannya gara-gara apa?',
    },
    {
      id: 'seed-kenalan-3',
      category: 'kenalan',
      question: 'Kota atau tempat mana yang pernah kamu datangi dan pengin banget kamu kunjungi lagi?',
      followup: 'Momen atau sudut kota mana yang paling berkesan di sana?',
    },
    {
      id: 'seed-kenalan-4',
      category: 'kenalan',
      question: 'Kalau lagi kumpul bareng teman, kamu biasanya kebagian peran jadi apa? Tukang ngelawak, pendengar, atau pengatur acara?',
      followup: 'Nyaman nggak sama peran itu, atau pengin nyoba peran lain?',
    },
    {
      id: 'seed-kenalan-5',
      category: 'kenalan',
      question: 'Film atau serial apa yang bisa kamu tonton ulang berkali-kali tanpa bosan?',
      followup: 'Adegan atau karakter mana yang paling kamu suka dari sana?',
    },
    {
      id: 'seed-kenalan-6',
      category: 'kenalan',
      question: 'Kamu lebih gampang akrab sama orang lewat obrolan serius atau lewat bercandaan ringan dulu?',
      followup: 'Topik apa yang paling cepat bikin kamu nyambung sama orang baru?',
    },
    {
      id: 'seed-kenalan-7',
      category: 'kenalan',
      question: 'Dulu waktu kecil, cita-cita paling random yang pernah kamu penginin itu apa?',
      followup: 'Ada kaitannya nggak sama aktivitas atau pekerjaanmu sekarang?',
    },
    {
      id: 'seed-kenalan-8',
      category: 'kenalan',
      question: 'Kalau harus ngajarin satu hal simpel ke orang lain dalam 10 menit, kamu mau ngajarin apa?',
      followup: 'Kenapa milih skill itu dibanding yang lain?',
    },

    // Reflektif & Cerita
    {
      id: 'seed-reflektif-1',
      category: 'reflektif',
      question: 'Pelajaran hidup apa yang dulu terasa berat waktu dialami, tapi sekarang malah kamu syukuri?',
      followup: 'Apa yang paling berubah dari cara pandangmu setelah melewati momen itu?',
    },
    {
      id: 'seed-reflektif-2',
      category: 'reflektif',
      question: 'Kapan terakhir kali kamu merasa benar-benar bangga sama dirimu sendiri?',
      followup: 'Hal kecil apa yang bikin momen itu terasa spesial?',
    },
    {
      id: 'seed-reflektif-3',
      category: 'reflektif',
      question: 'Nasihat dari siapa yang sampai sekarang masih sering terngiang pas kamu lagi ambil keputusan?',
      followup: 'Pernah nggak nasihat itu nyelametin kamu dari salah langkah?',
    },
    {
      id: 'seed-reflektif-4',
      category: 'reflektif',
      question: 'Dalam setahun terakhir, kebiasaan baru apa yang paling banyak ngubah keseharianmu?',
      followup: 'Apa tantangan terbesarnya waktu baru mulai ngebangun kebiasaan itu?',
    },
    {
      id: 'seed-reflektif-5',
      category: 'reflektif',
      question: 'Kalau bisa ngobrol 5 menit sama dirimu 5 tahun lalu, hal apa yang paling pengin kamu bilang?',
      followup: 'Kira-kira dirimu yang dulu bakal percaya atau malah kaget?',
    },
    {
      id: 'seed-reflektif-6',
      category: 'reflektif',
      question: 'Momen sederhana apa bareng keluarga atau teman yang sampai sekarang masih sering bikin senyum sendiri?',
      followup: 'Masih sering ketemu atau ngobrol sama orang-orang di momen itu?',
    },
    {
      id: 'seed-reflektif-7',
      category: 'reflektif',
      question: 'Hal apa yang dulu mati-matian kamu kejar, tapi ternyata setelah dewasa rasanya nggak sepenting itu?',
      followup: 'Sekarang fokus utamamu bergeser ke hal apa?',
    },
    {
      id: 'seed-reflektif-8',
      category: 'reflektif',
      question: 'Bentuk perhatian kecil dari orang lain seperti apa yang paling cepat bikin hatimu hangat?',
      followup: 'Kamu sendiri tipe yang nunjukin perhatian lewat kata-kata atau tindakan?',
    },

    // Seru & Imajinatif
    {
      id: 'seed-imajinatif-1',
      category: 'imajinatif',
      question: 'Kalau kamu bisa punya satu keahlian instan tanpa perlu latihan bertahun-tahun, mau pilih apa?',
      followup: 'Hal pertama yang bakal kamu lakuin pakai keahlian itu apa?',
    },
    {
      id: 'seed-imajinatif-2',
      category: 'imajinatif',
      question: 'Seandainya hidupmu dijadiin film, kira-kira genrenya apa dan judulnya bakal kayak gimana?',
      followup: 'Siapa aktor atau aktris yang paling cocok meranin kamu?',
    },
    {
      id: 'seed-imajinatif-3',
      category: 'imajinatif',
      question: 'Kalau semua pekerjaan gajinya sama rata, kamu bakal tetap di bidang sekarang atau pindah ke profesi apa?',
      followup: 'Apa yang bikin profesi impian itu kelihatan seru buatmu?',
    },
    {
      id: 'seed-imajinatif-4',
      category: 'imajinatif',
      question: 'Kamu lebih pilih bisa ngerti semua bahasa manusia atau bisa ngobrol sama hewan?',
      followup: 'Kalau bisa ngobrol sama hewan, hewan apa yang paling pengin kamu ajak curhat?',
    },
    {
      id: 'seed-imajinatif-5',
      category: 'imajinatif',
      question: 'Seandainya ada tombol pause buat waktu di dunia nyata selama 1 jam sehari, bakal kamu pakai buat apa?',
      followup: 'Kira-kira bakal dipakai buat produktif atau buat tidur siang?',
    },
    {
      id: 'seed-imajinatif-6',
      category: 'imajinatif',
      question: 'Kalau kamu menang undian liburan gratis tapi harus berangkat besok pagi, destinasi mana yang langsung kamu pilih?',
      followup: 'Satu barang wajib yang nggak boleh ketinggalan di koper apa?',
    },
    {
      id: 'seed-imajinatif-7',
      category: 'imajinatif',
      question: 'Kalau rumahmu bisa punya satu ruangan rahasia yang nggak ada di rumah orang lain, isinya bakal apa?',
      followup: 'Siapa aja yang boleh tahu kode masuk ruangan itu?',
    },
    {
      id: 'seed-imajinatif-8',
      category: 'imajinatif',
      question: 'Lebih pilih nggak bisa makan makanan manis seumur hidup atau nggak bisa makan makanan pedas?',
      followup: 'Menu favorit apa yang paling bakal kamu kangenin?',
    },
  ];

  const MAX_WHEEL_SLICES = 18;
  const MAX_HISTORY = 30;

  // =========================================================================
  // 2. State
  // =========================================================================
  const state = {
    activeCategory: 'all',
    customTopics: [],
    deletedIds: [],
    favorites: [],
    history: [],
    muted: false,
    wheelTopics: [],
    rotation: 0, // radians
    isSpinning: false,
    currentResult: null,
    audioCtx: null,
    toastTimer: null,
  };

  // =========================================================================
  // 3. DOM Elements
  // =========================================================================
  const els = {
    canvas: document.getElementById('wheelCanvas'),
    wheelPointer: document.getElementById('wheelPointer'),
    spinBtn: document.getElementById('spinBtn'),
    centerSpinBtn: document.getElementById('centerSpinBtn'),
    activeCountText: document.getElementById('activeCountText'),
    categoryPills: document.getElementById('categoryPills'),

    soundToggleBtn: document.getElementById('soundToggleBtn'),
    soundIconOn: document.getElementById('soundIconOn'),
    soundIconOff: document.getElementById('soundIconOff'),
    soundLabel: document.getElementById('soundLabel'),

    openSavedBtn: document.getElementById('openSavedBtn'),
    savedCountBadge: document.getElementById('savedCountBadge'),
    openManageBtn: document.getElementById('openManageBtn'),

    resultPlaceholder: document.getElementById('resultPlaceholder'),
    resultCard: document.getElementById('resultCard'),
    resultCategoryBadge: document.getElementById('resultCategoryBadge'),
    resultQuestion: document.getElementById('resultQuestion'),
    resultFollowup: document.getElementById('resultFollowup'),
    respinBtn: document.getElementById('respinBtn'),
    copyBtn: document.getElementById('copyBtn'),
    favoriteBtn: document.getElementById('favoriteBtn'),
    favoriteIcon: document.getElementById('favoriteIcon'),
    favoriteText: document.getElementById('favoriteText'),

    manageModal: document.getElementById('manageModal'),
    addTopicForm: document.getElementById('addTopicForm'),
    newTopicCategory: document.getElementById('newTopicCategory'),
    newTopicQuestion: document.getElementById('newTopicQuestion'),
    newTopicFollowup: document.getElementById('newTopicFollowup'),
    manageCategoryFilter: document.getElementById('manageCategoryFilter'),
    manageTopicList: document.getElementById('manageTopicList'),
    resetTopicsBtn: document.getElementById('resetTopicsBtn'),

    savedModal: document.getElementById('savedModal'),
    tabFavorites: document.getElementById('tabFavorites'),
    tabHistory: document.getElementById('tabHistory'),
    favTabCount: document.getElementById('favTabCount'),
    histTabCount: document.getElementById('histTabCount'),
    favoritesPane: document.getElementById('favoritesPane'),
    historyPane: document.getElementById('historyPane'),
    favoritesList: document.getElementById('favoritesList'),
    historyList: document.getElementById('historyList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),

    toast: document.getElementById('toast'),
  };

  // =========================================================================
  // 4. Storage Helpers
  // =========================================================================
  function readStorage(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota errors gracefully
    }
  }

  function loadState() {
    state.customTopics = readStorage(STORAGE_KEYS.CUSTOM_TOPICS, []);
    state.deletedIds = readStorage(STORAGE_KEYS.DELETED_IDS, []);
    state.favorites = readStorage(STORAGE_KEYS.FAVORITES, []);
    state.history = readStorage(STORAGE_KEYS.HISTORY, []);
    state.muted = Boolean(readStorage(STORAGE_KEYS.MUTED, false));
  }

  // =========================================================================
  // 5. Topic Helpers
  // =========================================================================
  function getAllActiveTopics() {
    const deletedSet = new Set(state.deletedIds);
    const activeSeeds = SEED_TOPICS.filter((t) => !deletedSet.has(t.id)).map((t) => ({
      ...t,
      isCustom: false,
    }));
    const custom = state.customTopics.map((t) => ({
      ...t,
      isCustom: true,
    }));
    return [...custom, ...activeSeeds];
  }

  function getTopicsByCategory(categoryId) {
    const all = getAllActiveTopics();
    if (categoryId === 'all') return all;
    return all.filter((t) => t.category === categoryId);
  }

  function getCategoryMeta(categoryId) {
    return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  }

  function buildWheelTopics(prioritizeId = null) {
    const pool = getTopicsByCategory(state.activeCategory);
    if (pool.length <= MAX_WHEEL_SLICES) {
      state.wheelTopics = pool;
      return;
    }

    // Sample up to MAX_WHEEL_SLICES while keeping prioritized topic if present
    const copy = [...pool];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    let selected = copy.slice(0, MAX_WHEEL_SLICES);
    if (prioritizeId && !selected.some((t) => t.id === prioritizeId)) {
      const target = pool.find((t) => t.id === prioritizeId);
      if (target) {
        selected[0] = target;
      }
    }
    state.wheelTopics = selected;
  }

  // =========================================================================
  // 6. Web Audio API (Tick & Stop Chime)
  // =========================================================================
  function ensureAudioContext() {
    if (state.muted) return null;
    if (!state.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      state.audioCtx = new AudioCtx();
    }
    if (state.audioCtx.state === 'suspended') {
      state.audioCtx.resume().catch(() => {});
    }
    return state.audioCtx;
  }

  function playTickSound() {
    if (state.muted) return;
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(760, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.025);

    gain.gain.setValueAtTime(0.075, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  function playStopChime() {
    if (state.muted) return;
    const ctx = ensureAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25]; // C5 & E5 warm chime

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.09, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.45);
    });
  }

  function triggerPointerTick() {
    els.wheelPointer.classList.remove('tick');
    // Force reflow so rapid ticks retrigger cleanly
    void els.wheelPointer.offsetWidth;
    els.wheelPointer.classList.add('tick');
    setTimeout(() => {
      els.wheelPointer.classList.remove('tick');
    }, 65);
  }

  // =========================================================================
  // 7. Canvas Wheel Rendering
  // =========================================================================
  function truncateForWheel(text, maxChars) {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= maxChars) return clean;
    return clean.slice(0, maxChars - 1).trimEnd() + '…';
  }

  function drawWheel() {
    const canvas = els.canvas;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const displaySize = Math.max(260, Math.round(rect.width || 450));

    if (canvas.width !== displaySize * dpr || canvas.height !== displaySize * dpr) {
      canvas.width = displaySize * dpr;
      canvas.height = displaySize * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const cx = displaySize / 2;
    const cy = displaySize / 2;
    const radius = displaySize / 2 - 4;

    ctx.clearRect(0, 0, displaySize, displaySize);

    const topics = state.wheelTopics;
    if (topics.length === 0) {
      // Empty state wheel
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#F3EFE9';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E8E0D5';
      ctx.stroke();

      ctx.fillStyle = '#64748B';
      ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Belum ada topik di kategori ini', cx, cy - 42);
      ctx.restore();
      return;
    }

    const count = topics.length;
    const sliceAngle = (Math.PI * 2) / count;
    const fontSize = count <= 8 ? 13 : count <= 14 ? 11.5 : 10.5;
    const maxChars = count <= 8 ? 24 : count <= 14 ? 21 : 18;

    for (let i = 0; i < count; i++) {
      const startAngle = state.rotation + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      let paletteIndex = i % WHEEL_PALETTE.length;
      if (count > 1 && i === count - 1 && paletteIndex === 0) {
        paletteIndex = 2; // Avoid adjacent identical color with slice 0
      }
      const palette = WHEEL_PALETTE[paletteIndex];

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = palette.bg;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FAF8F5';
      ctx.stroke();

      // Draw label radially
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + sliceAngle / 2);

      ctx.fillStyle = palette.text;
      ctx.font = `600 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      const label = truncateForWheel(topics[i].question, maxChars);
      ctx.fillText(label, radius - 16, 0);
      ctx.restore();
    }

    // Outer subtle ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.12)';
    ctx.stroke();

    ctx.restore();
  }

  function getSelectedIndexAtRotation(rotation, count) {
    if (count <= 0) return -1;
    const sliceAngle = (Math.PI * 2) / count;
    const pointerAngle = -Math.PI / 2; // Top 12 o'clock
    const rel = (((pointerAngle - rotation) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    return Math.floor(rel / sliceAngle) % count;
  }

  // =========================================================================
  // 8. Spin Logic
  // =========================================================================
  function spinWheel() {
    if (state.isSpinning) return;
    if (state.wheelTopics.length === 0) {
      showToast('Tambahkan topik dulu atau pilih kategori lain.');
      return;
    }

    ensureAudioContext();
    state.isSpinning = true;
    updateSpinButtonsState();

    const count = state.wheelTopics.length;
    const startRotation = state.rotation;
    // Spin 5 to 8 full turns plus a random offset
    const extraTurns = (5 + Math.floor(Math.random() * 4)) * Math.PI * 2;
    const randomOffset = Math.random() * Math.PI * 2;
    const targetRotation = startRotation + extraTurns + randomOffset;
    const totalDelta = targetRotation - startRotation;

    const duration = 4200; // ms
    const startTime = performance.now();
    let lastTickIndex = getSelectedIndexAtRotation(startRotation, count);

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      state.rotation = startRotation + totalDelta * eased;
      drawWheel();

      const currentIdx = getSelectedIndexAtRotation(state.rotation, count);
      if (currentIdx !== lastTickIndex && progress < 0.995) {
        lastTickIndex = currentIdx;
        playTickSound();
        triggerPointerTick();
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        state.rotation = targetRotation % (Math.PI * 2);
        state.isSpinning = false;
        drawWheel();
        updateSpinButtonsState();

        const winnerIdx = getSelectedIndexAtRotation(state.rotation, count);
        const winnerTopic = state.wheelTopics[winnerIdx];
        if (winnerTopic) {
          playStopChime();
          onTopicSelected(winnerTopic, true);
        }
      }
    }

    requestAnimationFrame(frame);
  }

  function onTopicSelected(topic, recordHistory = true) {
    state.currentResult = topic;
    renderResultCard(topic);

    if (recordHistory) {
      const entry = {
        ...topic,
        spunAt: new Date().toISOString(),
      };
      state.history = [entry, ...state.history].slice(0, MAX_HISTORY);
      writeStorage(STORAGE_KEYS.HISTORY, state.history);
      updateSavedBadges();
    }
  }

  // =========================================================================
  // 9. UI Rendering
  // =========================================================================
  function renderCategoryPills() {
    els.categoryPills.innerHTML = '';

    CATEGORIES.forEach((cat) => {
      const count = getTopicsByCategory(cat.id).length;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `category-pill${state.activeCategory === cat.id ? ' active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(state.activeCategory === cat.id));

      const labelSpan = document.createElement('span');
      labelSpan.textContent = cat.label;

      const countSpan = document.createElement('span');
      countSpan.className = 'pill-count';
      countSpan.textContent = String(count);

      btn.append(labelSpan, countSpan);
      btn.addEventListener('click', () => {
        if (state.isSpinning) return;
        state.activeCategory = cat.id;
        buildWheelTopics();
        renderCategoryPills();
        updateSpinButtonsState();
        drawWheel();
      });

      els.categoryPills.appendChild(btn);
    });
  }

  function updateSpinButtonsState() {
    const activePool = getTopicsByCategory(state.activeCategory);
    const hasTopics = state.wheelTopics.length > 0;

    els.spinBtn.disabled = state.isSpinning || !hasTopics;
    els.centerSpinBtn.disabled = state.isSpinning || !hasTopics;
    els.spinBtn.innerHTML = state.isSpinning
      ? '<span>✨ Sedang Memutar...</span>'
      : '<span>🎯 Putar Roda</span>';

    if (state.activeCategory === 'all' && activePool.length > MAX_WHEEL_SLICES) {
      els.activeCountText.textContent = `${state.wheelTopics.length} dari ${activePool.length} topik di roda`;
    } else {
      els.activeCountText.textContent = `${activePool.length} topik aktif`;
    }
  }

  function renderResultCard(topic) {
    if (!topic) {
      els.resultPlaceholder.classList.remove('hidden');
      els.resultCard.classList.add('hidden');
      return;
    }

    const catMeta = getCategoryMeta(topic.category);
    els.resultPlaceholder.classList.add('hidden');
    els.resultCard.classList.remove('hidden');

    // Re-trigger subtle pop animation
    els.resultCard.style.animation = 'none';
    void els.resultCard.offsetWidth;
    els.resultCard.style.animation = '';

    els.resultCategoryBadge.textContent = catMeta.label;
    els.resultCategoryBadge.style.backgroundColor = `${catMeta.color}1A`;
    els.resultCategoryBadge.style.color = catMeta.color;

    els.resultQuestion.textContent = topic.question;
    els.resultFollowup.textContent =
      topic.followup && topic.followup.trim()
        ? topic.followup
        : 'Apa cerita atau alasan di balik jawabanmu itu?';

    updateFavoriteButtonState();
  }

  function updateFavoriteButtonState() {
    if (!state.currentResult) return;
    const isFav = state.favorites.some((f) => f.id === state.currentResult.id);
    els.favoriteBtn.setAttribute('aria-pressed', String(isFav));
    els.favoriteBtn.classList.toggle('is-active', isFav);
    els.favoriteIcon.textContent = isFav ? '❤️' : '🤍';
    els.favoriteText.textContent = isFav ? 'Tersimpan' : 'Simpan Favorit';
  }

  function updateSoundUI() {
    els.soundIconOn.classList.toggle('hidden', state.muted);
    els.soundIconOff.classList.toggle('hidden', !state.muted);
    els.soundLabel.textContent = state.muted ? 'Suara Mati' : 'Suara Aktif';
    els.soundToggleBtn.title = state.muted ? 'Suara efek (Mati)' : 'Suara efek (Aktif)';
  }

  function updateSavedBadges() {
    const total = state.favorites.length;
    els.savedCountBadge.textContent = String(total);
    els.savedCountBadge.classList.toggle('hidden', total === 0);
    els.favTabCount.textContent = String(state.favorites.length);
    els.histTabCount.textContent = String(state.history.length);
  }

  // =========================================================================
  // 10. Manage Topics Modal
  // =========================================================================
  function renderManageTopicList() {
    const filterCat = els.manageCategoryFilter.value;
    const list = getTopicsByCategory(filterCat);
    els.manageTopicList.innerHTML = '';

    if (list.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-list-state';
      empty.textContent = 'Belum ada topik di kategori ini. Tambah topik baru di atas!';
      els.manageTopicList.appendChild(empty);
      return;
    }

    list.forEach((topic) => {
      const li = document.createElement('li');
      li.className = 'topic-item';

      const main = document.createElement('div');
      main.className = 'topic-item-main';

      const meta = document.createElement('div');
      meta.className = 'topic-item-meta';

      const catBadge = document.createElement('span');
      catBadge.className = 'mini-badge';
      catBadge.textContent = getCategoryMeta(topic.category).shortLabel;
      meta.appendChild(catBadge);

      if (topic.isCustom) {
        const customBadge = document.createElement('span');
        customBadge.className = 'mini-badge custom';
        customBadge.textContent = 'Buatan Sendiri';
        meta.appendChild(customBadge);
      }

      const qEl = document.createElement('p');
      qEl.className = 'topic-item-q';
      qEl.textContent = topic.question;

      main.append(meta, qEl);

      if (topic.followup && topic.followup.trim()) {
        const fEl = document.createElement('p');
        fEl.className = 'topic-item-f';
        fEl.textContent = `Lanjutan: ${topic.followup}`;
        main.appendChild(fEl);
      }

      const actions = document.createElement('div');
      actions.className = 'topic-item-actions';

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'mini-icon-btn danger';
      delBtn.textContent = 'Hapus';
      delBtn.addEventListener('click', () => deleteTopic(topic));

      actions.appendChild(delBtn);
      li.append(main, actions);
      els.manageTopicList.appendChild(li);
    });
  }

  function deleteTopic(topic) {
    if (topic.isCustom) {
      state.customTopics = state.customTopics.filter((t) => t.id !== topic.id);
      writeStorage(STORAGE_KEYS.CUSTOM_TOPICS, state.customTopics);
    } else {
      if (!state.deletedIds.includes(topic.id)) {
        state.deletedIds.push(topic.id);
        writeStorage(STORAGE_KEYS.DELETED_IDS, state.deletedIds);
      }
    }

    buildWheelTopics();
    renderCategoryPills();
    updateSpinButtonsState();
    drawWheel();
    renderManageTopicList();
    showToast('Topik dihapus.');
  }

  function handleAddTopic(e) {
    e.preventDefault();
    const category = els.newTopicCategory.value;
    const question = els.newTopicQuestion.value.trim();
    const followup = els.newTopicFollowup.value.trim();

    if (!question) return;

    const newTopic = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      category,
      question,
      followup: followup || 'Apa yang bikin kamu kepikiran jawaban itu?',
    };

    state.customTopics.unshift(newTopic);
    writeStorage(STORAGE_KEYS.CUSTOM_TOPICS, state.customTopics);

    els.newTopicQuestion.value = '';
    els.newTopicFollowup.value = '';

    // Refresh wheel & prioritize the newly added topic so it's visible
    buildWheelTopics(newTopic.id);
    renderCategoryPills();
    updateSpinButtonsState();
    drawWheel();
    renderManageTopicList();
    showToast('Topik baru ditambahkan!');
  }

  function handleResetTopics() {
    const confirmed = window.confirm(
      'Kembalikan semua daftar topik ke bawaan awal? Topik buatan sendiri juga akan dihapus.'
    );
    if (!confirmed) return;

    state.customTopics = [];
    state.deletedIds = [];
    writeStorage(STORAGE_KEYS.CUSTOM_TOPICS, []);
    writeStorage(STORAGE_KEYS.DELETED_IDS, []);

    buildWheelTopics();
    renderCategoryPills();
    updateSpinButtonsState();
    drawWheel();
    renderManageTopicList();
    showToast('Daftar topik dikembalikan ke bawaan.');
  }

  // =========================================================================
  // 11. Favorites & History Modal
  // =========================================================================
  function renderSavedLists() {
    // Favorites
    els.favoritesList.innerHTML = '';
    if (state.favorites.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-list-state';
      empty.textContent = 'Belum ada topik favorit. Tekan "Simpan Favorit" pada hasil putaran.';
      els.favoritesList.appendChild(empty);
    } else {
      state.favorites.forEach((topic) => {
        els.favoritesList.appendChild(createSavedItemElement(topic, 'favorite'));
      });
    }

    // History
    els.historyList.innerHTML = '';
    if (state.history.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-list-state';
      empty.textContent = 'Belum ada riwayat putaran. Yuk putar rodanya!';
      els.historyList.appendChild(empty);
    } else {
      state.history.forEach((topic) => {
        els.historyList.appendChild(createSavedItemElement(topic, 'history'));
      });
    }

    updateSavedBadges();
  }

  function createSavedItemElement(topic, mode) {
    const li = document.createElement('li');
    li.className = 'topic-item';

    const main = document.createElement('div');
    main.className = 'topic-item-main';

    const meta = document.createElement('div');
    meta.className = 'topic-item-meta';

    const catBadge = document.createElement('span');
    catBadge.className = 'mini-badge';
    catBadge.textContent = getCategoryMeta(topic.category).shortLabel;
    meta.appendChild(catBadge);

    if (mode === 'history' && topic.spunAt) {
      const timeBadge = document.createElement('span');
      timeBadge.className = 'mini-badge';
      timeBadge.textContent = new Date(topic.spunAt).toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
      meta.appendChild(timeBadge);
    }

    const qEl = document.createElement('p');
    qEl.className = 'topic-item-q';
    qEl.textContent = topic.question;
    main.append(meta, qEl);

    if (topic.followup) {
      const fEl = document.createElement('p');
      fEl.className = 'topic-item-f';
      fEl.textContent = `Lanjutan: ${topic.followup}`;
      main.appendChild(fEl);
    }

    const actions = document.createElement('div');
    actions.className = 'topic-item-actions';

    const openBtn = document.createElement('button');
    openBtn.type = 'button';
    openBtn.className = 'mini-icon-btn';
    openBtn.textContent = 'Tampilkan';
    openBtn.addEventListener('click', () => {
      onTopicSelected(topic, false);
      closeModal(els.savedModal);
    });
    actions.appendChild(openBtn);

    if (mode === 'favorite') {
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'mini-icon-btn danger';
      removeBtn.textContent = 'Hapus';
      removeBtn.addEventListener('click', () => {
        state.favorites = state.favorites.filter((f) => f.id !== topic.id);
        writeStorage(STORAGE_KEYS.FAVORITES, state.favorites);
        renderSavedLists();
        updateFavoriteButtonState();
        showToast('Dihapus dari favorit.');
      });
      actions.appendChild(removeBtn);
    }

    li.append(main, actions);
    return li;
  }

  // =========================================================================
  // 12. Quick Actions (Copy, Favorite, Modal, Toast)
  // =========================================================================
  async function copyCurrentTopic() {
    if (!state.currentResult) return;
    const text = `${state.currentResult.question}\nLanjutan: ${
      state.currentResult.followup || 'Apa cerita di balik jawabanmu?'
    }`;

    try {
      await navigator.clipboard.writeText(text);
      showToast('Topik disalin ke clipboard!');
    } catch {
      // Fallback for non-HTTPS contexts
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Topik disalin ke clipboard!');
    }
  }

  function toggleCurrentFavorite() {
    if (!state.currentResult) return;
    const exists = state.favorites.some((f) => f.id === state.currentResult.id);

    if (exists) {
      state.favorites = state.favorites.filter((f) => f.id !== state.currentResult.id);
      showToast('Dihapus dari favorit.');
    } else {
      state.favorites.unshift({ ...state.currentResult });
      showToast('Disimpan ke favorit!');
    }

    writeStorage(STORAGE_KEYS.FAVORITES, state.favorites);
    updateFavoriteButtonState();
    updateSavedBadges();
  }

  function openModal(modalEl) {
    modalEl.classList.remove('hidden');
  }

  function closeModal(modalEl) {
    modalEl.classList.add('hidden');
  }

  function isAnyModalOpen() {
    return (
      !els.manageModal.classList.contains('hidden') ||
      !els.savedModal.classList.contains('hidden')
    );
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.remove('hidden');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => {
      els.toast.classList.add('hidden');
    }, 2200);
  }

  // =========================================================================
  // 13. Event Listeners & Init
  // =========================================================================
  function bindEvents() {
    els.spinBtn.addEventListener('click', spinWheel);
    els.centerSpinBtn.addEventListener('click', spinWheel);
    els.respinBtn.addEventListener('click', spinWheel);
    els.copyBtn.addEventListener('click', copyCurrentTopic);
    els.favoriteBtn.addEventListener('click', toggleCurrentFavorite);

    els.soundToggleBtn.addEventListener('click', () => {
      state.muted = !state.muted;
      writeStorage(STORAGE_KEYS.MUTED, state.muted);
      updateSoundUI();
      showToast(state.muted ? 'Suara dimatikan' : 'Suara diaktifkan');
    });

    // Manage Modal
    els.openManageBtn.addEventListener('click', () => {
      els.manageCategoryFilter.value =
        state.activeCategory === 'all' ? 'all' : state.activeCategory;
      if (state.activeCategory !== 'all') {
        els.newTopicCategory.value = state.activeCategory;
      }
      renderManageTopicList();
      openModal(els.manageModal);
    });

    els.manageCategoryFilter.addEventListener('change', renderManageTopicList);
    els.addTopicForm.addEventListener('submit', handleAddTopic);
    els.resetTopicsBtn.addEventListener('click', handleResetTopics);

    // Saved Modal
    els.openSavedBtn.addEventListener('click', () => {
      renderSavedLists();
      openModal(els.savedModal);
    });

    els.tabFavorites.addEventListener('click', () => {
      els.tabFavorites.classList.add('active');
      els.tabHistory.classList.remove('active');
      els.favoritesPane.classList.remove('hidden');
      els.historyPane.classList.add('hidden');
    });

    els.tabHistory.addEventListener('click', () => {
      els.tabHistory.classList.add('active');
      els.tabFavorites.classList.remove('active');
      els.historyPane.classList.remove('hidden');
      els.favoritesPane.classList.add('hidden');
    });

    els.clearHistoryBtn.addEventListener('click', () => {
      if (state.history.length === 0) return;
      state.history = [];
      writeStorage(STORAGE_KEYS.HISTORY, []);
      renderSavedLists();
      showToast('Riwayat putaran dibersihkan.');
    });

    // Close modal buttons & backdrop click
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-close-modal');
        closeModal(document.getElementById(id));
      });
    });

    [els.manageModal, els.savedModal].forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal(backdrop);
      });
    });

    // Keyboard shortcuts (Spacebar to spin, Escape to close modal)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isAnyModalOpen()) {
        closeModal(els.manageModal);
        closeModal(els.savedModal);
        return;
      }

      if (e.code === 'Space' && !isAnyModalOpen()) {
        const tag = (document.activeElement?.tagName || '').toLowerCase();
        const isTyping =
          tag === 'input' ||
          tag === 'textarea' ||
          tag === 'select' ||
          document.activeElement?.isContentEditable;
        if (!isTyping) {
          e.preventDefault();
          spinWheel();
        }
      }
    });

    window.addEventListener('resize', drawWheel);
  }

  function init() {
    loadState();
    buildWheelTopics();
    renderCategoryPills();
    updateSpinButtonsState();
    updateSoundUI();
    updateSavedBadges();
    drawWheel();
    bindEvents();
  }

  init();
})();
