export type PageId =
  | 'portal'
  | 'taklimat'
  | 'pusat-ilmu'
  | 'misi-alicia'
  | 'misi-bakar'
  | 'misi-rizwan'
  | 'misi-akhir';

export interface PageMeta {
  id: PageId;
  step: number;
  label: string;
  shortLabel: string;
  agent: string;
}

export const MISSION_PAGES: PageMeta[] = [
  { id: 'portal', step: 1, label: 'Halaman 1: Portal MATA', shortLabel: 'Portal', agent: 'Ali & Comot' },
  { id: 'taklimat', step: 2, label: 'Halaman 2: Taklimat Misi', shortLabel: 'Taklimat', agent: 'Ali' },
  { id: 'pusat-ilmu', step: 3, label: 'Halaman 3: Pusat Ilmu', shortLabel: 'Pusat Ilmu', agent: 'Ali' },
  { id: 'misi-alicia', step: 4, label: 'Halaman 4: Misi Alicia', shortLabel: 'Misi Alicia', agent: 'Alicia' },
  { id: 'misi-bakar', step: 5, label: 'Halaman 5: Misi Bakar', shortLabel: 'Misi Bakar', agent: 'Bakar' },
  { id: 'misi-rizwan', step: 6, label: 'Halaman 6: Misi Rizwan', shortLabel: 'Misi Rizwan', agent: 'Rizwan' },
  { id: 'misi-akhir', step: 7, label: 'Halaman 7: Misi Akhir', shortLabel: 'Kejayaan', agent: 'Pasukan MATA' },
];

export const SCENE_IMAGES = {
  hq: '/src/assets/images/bandar_niaga_hq_1795536985734.jpg',
  kedai: '/src/assets/images/scene_kedai_runcit_1795536985764.jpg',
  pasar: '/src/assets/images/scene_pasar_moden_1795536986525.jpg',
  online: '/src/assets/images/scene_perniagaan_online_1795536986482.jpg',
};

export interface HoloBriefingCard {
  id: string;
  title: string;
  summary: string;
  detail: string;
  example: string;
  accent: 'cyan' | 'orange';
}

export const BRIEFING_HOLO_CARDS: HoloBriefingCard[] = [
  {
    id: 'maksud',
    title: 'Maksud Jual Beli',
    summary: 'Pertukaran harta dengan harta mengikut cara yang dibenarkan syarak.',
    detail:
      'Dalam Islam, jual beli ialah akad pertukaran sesuatu barang atau perkhidmatan dengan bayaran (seperti wang) secara rela hati antara penjual dan pembeli mengikut hukum syarak.',
    example: 'Contoh: Ali membayar RM3.00 kepada peniaga kantin untuk membeli sebungkus nasi lemak.',
    accent: 'cyan',
  },
  {
    id: 'hukum',
    title: 'Hukum Jual Beli',
    summary: 'Harus dan digalakkan jika menepati syarat serta adab Islam.',
    detail:
      'Allah SWT menghalalkan jual beli dan mengharamkan riba (Surah al-Baqarah: 275). Jual beli yang jujur memberi rezeki yang berkat kepada peniaga dan kepuasan kepada pembeli.',
    example: 'Contoh: Menjual makanan halal dengan harga yang jelas dan dipersetujui bersama.',
    accent: 'orange',
  },
  {
    id: 'rukun',
    title: 'Rukun Jual Beli',
    summary: 'Penjual & Pembeli, Barang & Harga, serta Akad (Ijab dan Qabul).',
    detail:
      'Sesuatu jual beli menjadi sah apabila mempunyai pihak yang berakad (penjual dan pembeli), barang yang dijual beserta harga yang jelas, dan persetujuan bersama (ijab dan qabul).',
    example: 'Contoh: Penjual menyatakan harga buku RM10, dan murid menyerahkan RM10 tanda setuju membeli.',
    accent: 'cyan',
  },
  {
    id: 'hikmah',
    title: 'Kepentingan Adab Jual Beli',
    summary: 'Melahirkan masyarakat yang jujur, harmoni dan diberkati Allah.',
    detail:
      'Apabila peniaga dan pembeli menjaga adab jual beli di Bandar Niaga, tiada pihak yang tertipu, kepercayaan bertambah kukuh, dan urusan harian menjadi aman.',
    example: 'Contoh: Pelanggan yakin kembali ke kedai yang sentiasa menimbang dengan tepat.',
    accent: 'orange',
  },
];

export const LEARNING_OBJECTIVES: string[] = [
  'Menyatakan maksud jual beli dalam Islam dengan jelas.',
  'Mengenal pasti lapan adab jual beli yang wajib diamalkan.',
  'Membezakan amalan jual beli yang betul dan salah dalam situasi harian.',
  'Mengamalkan adab jual beli yang jujur dan amanah dalam kehidupan seharian.',
];

export interface AdabItem {
  id: string;
  number: number;
  title: string;
  meaning: string;
  explanation: string;
  situation: string;
  setting: 'kedai' | 'pasar' | 'online';
  settingLabel: string;
  image: string;
  doTip: string;
  avoidTip: string;
}

export const ADAB_LIST: AdabItem[] = [
  {
    id: 'jujur',
    number: 1,
    title: 'Bersikap jujur ketika berniaga',
    meaning: 'Bercakap benar tentang harga, kualiti dan keadaan barang.',
    explanation:
      'Peniaga dan pembeli hendaklah sentiasa berkata benar dan tidak menipu tentang mutu, asal usul atau tarikh luput sesuatu barang.',
    situation: 'Di Kedai Runcit Bandar Niaga, peniaga memberitahu harga sebenar roti dan memaklumkan roti itu dibuat pagi tadi.',
    setting: 'kedai',
    settingLabel: 'Kedai Runcit',
    image: SCENE_IMAGES.kedai,
    doTip: 'Nyatakan harga dan maklumat produk dengan tepat.',
    avoidTip: 'Jangan menipu kononnya barang lama itu stok baharu.',
  },
  {
    id: 'timbangan',
    number: 2,
    title: 'Tidak menipu sukatan dan timbangan',
    meaning: 'Memberikan berat atau ukuran barang yang cukup dan tepat.',
    explanation:
      'Penjual dilarang mengurangkan timbangan atau mengubah alat penimbang untuk mendapat untung berlebihan kerana perbuatan itu menzalimi pembeli.',
    situation: 'Di Pasar Moden, peniaga buah memastikan penimbang digital menunjukkan tepat 2.00 kg sebelum membungkus mangga untuk pembeli.',
    setting: 'pasar',
    settingLabel: 'Pasar Segar',
    image: SCENE_IMAGES.pasar,
    doTip: 'Gunakan penimbang yang disahkan dan tunjukkan bacaan kepada pembeli.',
    avoidTip: 'Jangan meletakkan pemberat tersembunyi atau menimbang kurang.',
  },
  {
    id: 'kecacatan',
    number: 3,
    title: 'Tidak menyembunyikan kecacatan barang',
    meaning: 'Berterus terang jika barang mempunyai kerosakan atau kekurangan.',
    explanation:
      'Jika barang ada kesan calar, rosak atau hampir luput, peniaga mesti memberitahu pembeli supaya pembeli boleh membuat pilihan secara adil.',
    situation: 'Dalam Perniagaan Dalam Talian, penjual memaklumkan kotak gajet sedikit kemek sebelum pembeli membuat bayaran.',
    setting: 'online',
    settingLabel: 'Perniagaan Dalam Talian',
    image: SCENE_IMAGES.online,
    doTip: 'Tunjukkan gambar sebenar barang termasuk bahagian yang kurang sempurna.',
    avoidTip: 'Jangan membungkus barang rosak bersama barang elok untuk mengaburi mata.',
  },
  {
    id: 'sumpah',
    number: 4,
    title: 'Tidak bersumpah palsu untuk melariskan barang',
    meaning: 'Tidak menggunakan nama Allah atau sumpah bohong demi menarik pelanggan.',
    explanation:
      'Bersumpah palsu seperti berkata "Demi Allah barang ini asli" sedangkan ia tiruan adalah dosa besar dan menghilangkan keberkatan rezeki.',
    situation: 'Di Kedai Aksesori, peniaga tidak bersumpah palsu tetapi menerangkan ciri sebenar sarung telefon kepada Ali.',
    setting: 'kedai',
    settingLabel: 'Kedai Runcit',
    image: SCENE_IMAGES.kedai,
    doTip: 'Promosikan kelebihan sebenar produk dengan sopan dan benar.',
    avoidTip: 'Jangan bersumpah palsu atau memuji barang secara melampau hingga menipu.',
  },
  {
    id: 'amanah',
    number: 5,
    title: 'Bersikap amanah',
    meaning: 'Menjaga kepercayaan pembeli dan penjual dengan penuh tanggungjawab.',
    explanation:
      'Amanah bermaksud memulangkan baki wang dengan betul, menghantar tempahan tepat pada waktunya dan membayar harga barang seperti dijanjikan.',
    situation: 'Dalam Perniagaan Dalam Talian, penjual membungkus barang yang tepat seperti ditempah dan menghantar nombor penjejakan yang sah.',
    setting: 'online',
    settingLabel: 'Perniagaan Dalam Talian',
    image: SCENE_IMAGES.online,
    doTip: 'Pulangkan baki wang dengan tepat dan tunaikan pesanan mengikut janji.',
    avoidTip: 'Jangan melewat-lewatkan penghantaran atau menghantar barang yang salah.',
  },
  {
    id: 'tolak-ansur',
    number: 6,
    title: 'Mengamalkan sikap bertolak ansur',
    meaning: 'Berlemah lembut, sabar dan memudahkan urusan antara satu sama lain.',
    explanation:
      'Islam menggalakkan penjual dan pembeli bermurah hati, bercakap sopan, serta bertolak ansur jika berlaku kesilapan kecil seperti tersalah pilih saiz.',
    situation: 'Di Pasar Moden, peniaga sayur tersenyum mesra dan membenarkan pelanggan menukar ikatan sawi yang tersalah ambil.',
    setting: 'pasar',
    settingLabel: 'Pasar Segar',
    image: SCENE_IMAGES.pasar,
    doTip: 'Layan pelanggan dengan senyuman dan bantu jika ada kesilapan kecil.',
    avoidTip: 'Jangan memarahi pembeli atau berkasar ketika tawar-menawar.',
  },
  {
    id: 'riba',
    number: 7,
    title: 'Tidak melakukan riba',
    meaning: 'Tidak mengenakan faedah atau bayaran tambahan yang menindas.',
    explanation:
      'Riba ialah pertambahan bayaran yang tidak adil dalam pinjaman atau pertukaran wang. Hukum riba adalah haram dan merugikan masyarakat.',
    situation: 'Di Kedai Runcit, peniaga menjual barang secara tunai atau ansuran harga tetap tanpa caj faedah berganda jika lewat sehari.',
    setting: 'kedai',
    settingLabel: 'Kedai Runcit',
    image: SCENE_IMAGES.kedai,
    doTip: 'Tetapkan harga yang jelas dan bebas daripada unsur faedah riba.',
    avoidTip: 'Jangan mengenakan denda bayaran berganda yang menindas pembeli.',
  },
  {
    id: 'barang-haram',
    number: 8,
    title: 'Tidak menjual barang yang haram',
    meaning: 'Hanya memperniagakan barang yang halal, suci dan bermanfaat.',
    explanation:
      'Peniaga Islam wajib memastikan barang jualannya halal dan tidak memudaratkan, seperti mengelakkan jualan arak, dadah, barang curi atau makanan tidak halal.',
    situation: 'Dalam Perniagaan Dalam Talian dan Pasar, peniaga hanya menjual makanan bertanda halal serta produk yang selamat digunakan.',
    setting: 'online',
    settingLabel: 'Perniagaan Dalam Talian',
    image: SCENE_IMAGES.online,
    doTip: 'Semak status halal, kebersihan dan keselamatan barang sebelum menjual.',
    avoidTip: 'Jangan menjual barang curi, makanan memabukkan atau bahan merbahaya.',
  },
];

export interface SituationTask {
  id: string;
  location: string;
  scenario: string;
  isCorrect: boolean;
  adabRelated: string;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export const ALICIA_SITUATIONS: SituationTask[] = [
  {
    id: 'sit-1',
    location: 'Pasar Segar Bandar Niaga',
    scenario: 'Peniaga memberikan berat barang yang tepat iaitu 1 kilogram seperti yang diminta pembeli.',
    isCorrect: true,
    adabRelated: 'Tidak menipu sukatan dan timbangan',
    feedbackCorrect: 'Tepat sekali, Ejen! Memberi timbangan yang cukup menunjukkan peniaga menjaga adab sukatan dan timbangan.',
    feedbackWrong: 'Kurang tepat. Peniaga menimbang 1 kilogram dengan betul tanpa mengurangkannya, jadi ini amalan yang BETUL.',
  },
  {
    id: 'sit-2',
    location: 'Kedai Gajet Dalam Talian',
    scenario: 'Penjual menyembunyikan kerosakan skrin telefon supaya pembeli terus membelinya dengan harga penuh.',
    isCorrect: false,
    adabRelated: 'Tidak menyembunyikan kecacatan barang',
    feedbackCorrect: 'Bagus! Penjual wajib berterus terang tentang kerosakan barang dan dilarang menyorokkan kecacatan.',
    feedbackWrong: 'Awas, Ejen! Menyembunyikan kerosakan barang adalah perbuatan menipu dan SALAH dalam Islam.',
  },
  {
    id: 'sit-3',
    location: 'Kedai Buku MATA',
    scenario: 'Pembeli membayar harga yang dipersetujui iaitu RM12.00 dengan wang yang cukup kepada juruwang.',
    isCorrect: true,
    adabRelated: 'Bersikap amanah',
    feedbackCorrect: 'Syabas! Pembeli yang membayar harga yang dipersetujui mengamalkan sifat amanah dalam jual beli.',
    feedbackWrong: 'Perhatikan semula. Membayar harga yang dipersetujui dengan jujur adalah amalan jual beli yang BETUL.',
  },
  {
    id: 'sit-4',
    location: 'Gerai Ikan Bandar Niaga',
    scenario: 'Peniaga menipu sukatan timbangan dengan meletakkan magnet kecil di bawah alat penimbang.',
    isCorrect: false,
    adabRelated: 'Tidak menipu sukatan dan timbangan',
    feedbackCorrect: 'Tepat! Mengubah alat penimbang untuk mengurangkan berat barang adalah dosa dan zalim kepada pembeli.',
    feedbackWrong: 'Berhati-hati! Menipu timbangan melanggar adab jual beli, jadi situasi ini adalah SALAH.',
  },
  {
    id: 'sit-5',
    location: 'Gerai Pakaian Pasar Malam',
    scenario: 'Peniaga bersumpah palsu dengan nama Allah kononnya beg itu jenama asli sedangkan ia tiruan.',
    isCorrect: false,
    adabRelated: 'Tidak bersumpah palsu untuk melariskan barang',
    feedbackCorrect: 'Tindakan analisis tepat! Bersumpah palsu demi melariskan jualan adalah haram dan menghilangkan berkat.',
    feedbackWrong: 'Salah tu, Ejen. Bersumpah bohong untuk melariskan barang merupakan kesalahan besar dalam adab berniaga.',
  },
  {
    id: 'sit-6',
    location: 'Kedai Runcit Cyber',
    scenario: 'Peniaga segera memulangkan baki RM5.00 yang tercicir apabila menyedari pembeli terlebih bayar.',
    isCorrect: true,
    adabRelated: 'Bersikap amanah & jujur',
    feedbackCorrect: 'Hebat! Memulangkan wang lebihan pelanggan membuktikan peniaga seorang yang jujur dan amanah.',
    feedbackWrong: 'Sebaliknya, memulangkan baki hak pembeli ialah contoh adab amanah yang sangat mulia dan BETUL.',
  },
  {
    id: 'sit-7',
    location: 'Butik Pakaian Bandar Niaga',
    scenario: 'Penjual melayan pembeli dengan senyuman dan membenarkan pembeli menukar saiz baju yang masih elok.',
    isCorrect: true,
    adabRelated: 'Mengamalkan sikap bertolak ansur',
    feedbackCorrect: 'Betul! Sikap bertolak ansur dan memudahkan urusan pelanggan amat digalakkan dalam Islam.',
    feedbackWrong: 'Ini amalan yang BETUL kerana penjual bersikap bertolak ansur serta mesra melayan pembeli.',
  },
  {
    id: 'sit-8',
    location: 'Pusat Jualan Online',
    scenario: 'Penjual membuang label tarikh luput pada tin biskut lama dan menjualnya sebagai stok baharu.',
    isCorrect: false,
    adabRelated: 'Bersikap jujur & tidak menyembunyikan kecacatan',
    feedbackCorrect: 'Analisis tepat, Ejen! Menukar tarikh luput membahayakan kesihatan pembeli dan melanggar adab jujur.',
    feedbackWrong: 'Situasi ini SALAH kerana penjual menipu keadaan barang dan membahayakan pembeli.',
  },
];

export interface MatchSet {
  id: string;
  round: 1 | 2;
  adab: string;
  meaning: string;
  situation: string;
}

export const BAKAR_MATCH_SETS: MatchSet[] = [
  {
    id: 'm1',
    round: 1,
    adab: 'Bersikap jujur',
    meaning: 'Bercakap benar tentang harga dan kualiti barang',
    situation: 'Penjual memberitahu tarikh tamat tempoh sebenar makanan kepada pembeli',
  },
  {
    id: 'm2',
    round: 1,
    adab: 'Tepat timbangan',
    meaning: 'Tidak mengurangkan berat atau ukuran barang',
    situation: 'Peniaga memastikan jarum penimbang tepat 1 kg sebelum membungkus gula',
  },
  {
    id: 'm3',
    round: 1,
    adab: 'Dedah kecacatan',
    meaning: 'Berterus terang jika barang ada kerosakan',
    situation: 'Penjual menunjukkan kesan calar kecil pada basikal sebelum dijual',
  },
  {
    id: 'm4',
    round: 1,
    adab: 'Elak sumpah palsu',
    meaning: 'Tidak berbohong menggunakan sumpah demi melariskan jualan',
    situation: 'Peniaga menerangkan kualiti kain secara benar tanpa bersumpah palsu',
  },
  {
    id: 'm5',
    round: 2,
    adab: 'Bersikap amanah',
    meaning: 'Menjaga hak dan kepercayaan dalam urusan niaga',
    situation: 'Juruwang memulangkan baki wang pembeli dengan jumlah yang tepat',
  },
  {
    id: 'm6',
    round: 2,
    adab: 'Bertolak ansur',
    meaning: 'Berlemah lembut dan memudahkan urusan jual beli',
    situation: 'Penjual membenarkan pembeli menukar saiz kasut dengan mesra',
  },
  {
    id: 'm7',
    round: 2,
    adab: 'Jauhi riba',
    meaning: 'Tidak mengenakan faedah tambahan yang menindas',
    situation: 'Kedai menjual barang dengan harga jelas tanpa caj bunga berganda',
  },
  {
    id: 'm8',
    round: 2,
    adab: 'Barang halal sahaja',
    meaning: 'Menjual barangan yang suci, halal dan bermanfaat',
    situation: 'Peniaga hanya menjual makanan bertanda halal dan selamat dimakan',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export const RIZWAN_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apakah maksud jual beli menurut Islam?',
    options: [
      'Memberi barang secara percuma kepada kawan',
      'Pertukaran harta dengan harta mengikut cara yang dibenarkan syarak',
      'Mengambil barang di kedai tanpa pengetahuan penjual',
      'Meminjam barang untuk kegunaan sementara sahaja',
    ],
    correctIndex: 1,
    explanation: 'Jual beli ialah pertukaran harta dengan harta (seperti barang dengan wang) secara rela hati mengikut hukum syarak.',
  },
  {
    id: 2,
    question: 'Manakah antara berikut BUKAN rukun jual beli?',
    options: [
      'Penjual dan pembeli',
      'Barang dan harga',
      'Akad (ijab dan qabul)',
      'Sumpah untuk melariskan barang',
    ],
    correctIndex: 3,
    explanation: 'Rukun jual beli terdiri daripada penjual, pembeli, barang, harga dan akad (ijab dan qabul). Bersumpah bukan rukun jual beli.',
  },
  {
    id: 3,
    question: 'Ali ingin membeli 2 kg ikan di Pasar Bandar Niaga. Apakah sikap yang wajib ditunjukkan oleh penjual ikan?',
    options: [
      'Menimbang tepat 2 kg menggunakan penimbang yang betul',
      'Mengurangkan sedikit berat ikan supaya mendapat untung lebih',
      'Memasukkan ais yang banyak ke dalam beg penimbang',
      'Menyorokkan paparan angka pada penimbang digital',
    ],
    correctIndex: 0,
    explanation: 'Peniaga wajib menimbang dengan tepat dan tidak menipu sukatan atau timbangan.',
  },
  {
    id: 4,
    question: 'Mengapakah peniaga dilarang menyembunyikan kecacatan barang yang dijual?',
    options: [
      'Supaya kedai kelihatan sentiasa penuh',
      'Kerana perbuatan itu menipu dan menzalimi pembeli',
      'Supaya harga barang dapat dinaikkan sesuka hati',
      'Kerana pembeli tidak suka melihat barang baharu',
    ],
    correctIndex: 1,
    explanation: 'Menyembunyikan kecacatan barang ialah satu penipuan yang merugikan pembeli dan melanggar adab jujur.',
  },
  {
    id: 5,
    question: 'Apakah hukum bersumpah palsu semata-mata untuk melariskan jualan?',
    options: [
      'Harus jika barang itu murah',
      'Sunat untuk menarik perhatian pelanggan',
      'Haram dan menghilangkan keberkatan rezeki',
      'Makruh jika dilakukan pada waktu pagi',
    ],
    correctIndex: 2,
    explanation: 'Bersumpah palsu adalah haram kerana menyalahgunakan sumpah demi menipu pembeli dan menghilangkan berkat.',
  },
  {
    id: 6,
    question: 'Situasi manakah menunjukkan sikap amanah dalam jual beli dalam talian?',
    options: [
      'Menghantar barang tiruan walaupun iklan menunjukkan barang asli',
      'Menghantar pesanan yang tepat seperti gambar dan penerangan produk',
      'Mengabaikan mesej pembeli selepas bayaran diterima',
      'Menggunakan gambar kedai lain untuk menipu pelanggan',
    ],
    correctIndex: 1,
    explanation: 'Penjual yang amanah sentiasa menghantar barang yang tepat mengikut spesifikasi yang dijanjikan.',
  },
  {
    id: 7,
    question: 'Pembeli tersalah memilih saiz baju dan meminta izin peniaga untuk menukarnya. Apakah tindakan beradab peniaga?',
    options: [
      'Memarahi pembeli di hadapan orang ramai',
      'Mengenakan denda berganda kepada pembeli',
      'Melayan dengan mesra dan bertolak ansur menukarnya jika masih elok',
      'Menghalau pembeli keluar dari kedai dengan segera',
    ],
    correctIndex: 2,
    explanation: 'Mengamalkan sikap bertolak ansur dan berlemah lembut sangat digalakkan oleh Islam dalam urusan jual beli.',
  },
  {
    id: 8,
    question: 'Apakah yang dimaksudkan dengan "Tidak melakukan riba" dalam perniagaan?',
    options: [
      'Tidak mengenakan faedah atau bayaran tambahan yang menindas',
      'Tidak menjual barang pada hari cuti umum',
      'Tidak memberi diskaun kepada pelanggan tetap',
      'Tidak menggunakan wang kertas ketika membayar',
    ],
    correctIndex: 0,
    explanation: 'Riba ialah pertambahan bayaran atau faedah yang menindas. Islam mengharamkan riba dalam semua urusan jual beli.',
  },
  {
    id: 9,
    question: 'Antara barangan berikut, manakah yang HARAM dijual oleh seorang peniaga Muslim?',
    options: [
      'Buah-buahan segar dan sayur-sayuran',
      'Buku latihan sekolah dan alat tulis',
      'Makanan yang dicampur bahan tidak halal atau memabukkan',
      'Pakaian sekolah yang bersih dan kemas',
    ],
    correctIndex: 2,
    explanation: 'Peniaga wajib memastikan barang jualannya halal, suci dan selamat, serta menjauhi barangan haram atau memudaratkan.',
  },
  {
    id: 10,
    question: 'Apakah kesan positif jika semua peniaga dan pembeli di Bandar Niaga mengamalkan adab jual beli Islam?',
    options: [
      'Berlaku pergaduhan dan rasa curiga antara pelanggan',
      'Rezeki diberkati Allah dan masyarakat hidup aman serta saling percaya',
      'Barang rosak menjadi semakin banyak di pasaran',
      'Pembeli tidak berani lagi membeli barang keperluan',
    ],
    correctIndex: 1,
    explanation: 'Jual beli yang beradab melahirkan kepercayaan, keharmonian masyarakat dan rezeki yang diberkati Allah SWT.',
  },
];

export interface BriefingSlide {
  id: number;
  title: string;
  subtitle: string;
  narration: string;
  keyPoint: string;
  image: string;
}

export const VIDEO_BRIEFING_SLIDES: BriefingSlide[] = [
  {
    id: 1,
    title: 'Pengenalan Operasi Bandar Niaga',
    subtitle: 'Apakah maksud jual beli?',
    narration:
      'Selamat datang, Ejen Pelatih! Dalam Islam, jual beli ialah pertukaran barang atau perkhidmatan dengan bayaran yang sah secara rela hati.',
    keyPoint: 'Rukun Jual Beli: Penjual · Pembeli · Barang · Harga · Akad (Ijab & Qabul)',
    image: SCENE_IMAGES.hq,
  },
  {
    id: 2,
    title: 'Adab di Kedai Runcit',
    subtitle: 'Jujur, Amanah & Bebas Riba',
    narration:
      'Semasa membeli di kedai, peniaga mesti memaparkan harga jelas, memulangkan baki tepat dan tidak mengenakan caj faedah riba.',
    keyPoint: 'Kata Kunci: Jujur menyatakan harga dan memulangkan baki yang betul.',
    image: SCENE_IMAGES.kedai,
  },
  {
    id: 3,
    title: 'Adab di Pasar Segar',
    subtitle: 'Timbangan Tepat & Bertolak Ansur',
    narration:
      'Di pasar segar, peniaga wajib menggunakan timbangan yang tepat tanpa mengurangkan berat dan melayan pelanggan dengan sopan serta bertolak ansur.',
    keyPoint: 'Kata Kunci: Dilarang menipu timbangan atau bersumpah palsu melariskan barang.',
    image: SCENE_IMAGES.pasar,
  },
  {
    id: 4,
    title: 'Adab Perniagaan Dalam Talian',
    subtitle: 'Dedah Kecacatan & Barang Halal',
    narration:
      'Untuk jualan dalam talian, penjual mesti berterus terang jika barang ada kecacatan dan hanya menjual barang yang halal serta selamat.',
    keyPoint: 'Kata Kunci: Amanah membungkus barang yang tepat seperti yang diiklankan.',
    image: SCENE_IMAGES.online,
  },
];
