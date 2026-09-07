export const FAULT_GUIDES = [
  {
    slug: "ticari-buzdolabi-neden-sogutmuyor",
    title: "Ticari Buzdolabı Neden Soğutmuyor?",
    shortTitle: "Ticari Buzdolabı Soğutmuyor",
    metaDescription:
      "Ticari buzdolabı çalıştığı hâlde neden soğutmaz? Fan, kondenser, sensör, buzlanma, gaz kaçağı ve kompresör ihtimallerini güvenli biçimde kontrol edin.",
    eyebrow: "Soğutmama arızası",
    intro:
      "Ticari bir dolabın motor sesi duyulmasına rağmen ürün sıcaklığını koruyamaması tek bir arızaya işaret etmez. Hava dolaşımının engellenmesi, kirli kondenser, kapı kaçağı, sensör veya defrost sorunu ile soğutma devresindeki arızalar benzer belirti verebilir. Parça değiştirmeden önce dolabın hangi koşulda ve ne kadar sürede ısındığını doğru gözlemlemek gerekir.",
    urgentNote:
      "Ürün sıcaklığı güvenli aralığın dışına çıkıyorsa ürünleri çalışan başka bir soğutucuya alın. Dolabı peş peşe kapatıp açmak veya ayarı sürekli düşürmek arızayı çözmez.",
    causes: [
      {
        title: "Hava giriş ve çıkışları kapanmış olabilir",
        body: "Ürünlerin evaporatör hava kanalını kapatması, fan çalışsa bile soğuk havanın raflara ulaşmasını engeller. Özellikle dolabın bir bölümü soğuk, diğer bölümü sıcaksa yerleşim ve hava dolaşımı ilk kontroller arasındadır.",
      },
      {
        title: "Kondenser kirli veya havasız kalmış olabilir",
        body: "Tozla kaplanan kondenser ısıyı ortama atmakta zorlanır. Dolabın duvara çok yakın kurulması veya makine bölümünün havasız kalması da kompresörün daha uzun çalışmasına ve dolap sıcaklığının yükselmesine yol açabilir.",
      },
      {
        title: "Evaporatör buzlanmış olabilir",
        body: "Yoğun buz tabakası serpantin üzerinden hava geçişini azaltır. Defrost rezistansı, sensör, zamanlama, drenaj veya kapının uzun süre açık kalması kontrol edilmeden yalnızca buzu eritmek geçici sonuç verir.",
      },
      {
        title: "Kapı contası hava kaçırıyor olabilir",
        body: "Yıpranmış conta veya ayarsız menteşe, sıcak ve nemli havanın sürekli dolaba girmesine neden olur. Kompresör sık veya kesintisiz çalışırken kapı çevresinde terleme görülmesi bu ihtimali güçlendirir.",
      },
      {
        title: "Sensör veya kontrol cihazı yanlış ölçüyor olabilir",
        body: "Ekrandaki değer gerçek raf sıcaklığından farklıysa sensörün konumu, bağlantısı ve kalibrasyonu incelenmelidir. Kontrol cihazı kompresörü erken durdurabilir veya defrost döngüsünü yanlış zamanda başlatabilir.",
      },
      {
        title: "Soğutma devresinde arıza olabilir",
        body: "Gaz kaçağı, kılcal veya valf tıkanıklığı ve kompresör performans kaybı ancak basınç, akım ve sıcaklık ölçümleriyle ayrılır. Ölçüm yapılmadan gaz eklemek doğru teşhis değildir.",
      },
    ],
    safeChecks: [
      "Priz, sigorta ve kontrol panelinde enerji veya alarm olup olmadığını kontrol edin.",
      "Kapının tam kapandığından ve contanın araya ürün sıkışmadan yüzeye oturduğundan emin olun.",
      "Ürünleri hava kanallarından uzaklaştırın; fan giriş ve çıkışlarını kapatmayın.",
      "Dolabın görünen sıcaklığını ve mümkünse ayrı bir termometredeki ürün sıcaklığını not edin.",
      "Cihazın ne zaman soğutmayı bıraktığını, çıkardığı sesi ve varsa hata kodunu servise iletin.",
    ],
    avoid: [
      "Termostatı en düşük değere getirip sonucu saatlerce beklemek",
      "Cihazı kısa aralıklarla fişten çekip yeniden çalıştırmak",
      "Kaçak kontrolü yapılmadan yalnızca soğutucu gaz ekletmek",
      "Elektrik bölmesine veya basınçlı soğutma devresine müdahale etmek",
    ],
    serviceSlug: "sanayi-tipi-buzdolabi-tamiri",
    serviceTitle: "Sanayi Tipi Buzdolabı Tamiri",
    relatedSlugs: ["soguk-oda-buzlanmasi-neden-olur", "sogutma-kompresoru-arizasi-belirtileri"],
    faq: [
      {
        q: "Dolap çalışıyor ama soğutmuyorsa kesin gazı mı bitmiştir?",
        a: "Hayır. Fan, kondenser, sensör, defrost, kapı contası ve kompresör arızaları da aynı belirtiyi oluşturabilir. Gaz eksikliği ölçüm ve kaçak kontrolüyle doğrulanmalıdır.",
      },
      {
        q: "Ticari dolabı kapatıp dinlendirmek sorunu çözer mi?",
        a: "Buzlanma geçici olarak azalabilir ancak arızanın nedeni giderilmez. Yanık kokusu, sigorta atması veya olağan dışı ses varsa enerjiyi güvenli biçimde kesin ve servis çağırın.",
      },
      {
        q: "Dolabın sadece üst rafları sıcaksa ne kontrol edilir?",
        a: "Önce hava kanalları, ürün yerleşimi ve fan çalışması kontrol edilir. Evaporatör buzlanması veya sensör konumu da raflar arasında sıcaklık farkına neden olabilir.",
      },
    ],
  },
  {
    slug: "soguk-oda-buzlanmasi-neden-olur",
    title: "Soğuk Oda Buzlanması Neden Olur?",
    shortTitle: "Soğuk Oda Buzlanması",
    metaDescription:
      "Soğuk oda evaporatörü neden buzlanır? Defrost, fan, sensör, kapı, nem ve drenaj kaynaklı buzlanma belirtilerini ve güvenli ilk adımları öğrenin.",
    eyebrow: "Evaporatör ve defrost",
    intro:
      "Soğuk oda yüzeyinde ince kırağı oluşması ile evaporatörü ve hava geçişini kapatan yoğun buz tabakası aynı durum değildir. Kalınlaşan buz hava dolaşımını düşürür; oda istenen sıcaklığa ulaşamazken kompresör daha uzun çalışabilir. Buzun nerede ve ne hızda oluştuğu, arızanın kaynağını ayırmada önemli bir ipucudur.",
    urgentNote:
      "Evaporatördeki buzu kesici veya sivri bir cisimle kırmayın. Borunun delinmesi soğutucu akışkan kaçağına ve daha büyük bir onarıma yol açabilir.",
    causes: [
      {
        title: "Defrost çevrimi tamamlanmıyor olabilir",
        body: "Defrost rezistansı, zamanlama, röle veya kontrol çıkışı çalışmadığında önceki çevrimde oluşan kırağı erimez. Her çalışma döngüsünde büyüyen tabaka sonunda serpantini ve fan yolunu kapatır.",
      },
      {
        title: "Defrost veya oda sensörü hatalı olabilir",
        body: "Sensör yanlış sıcaklık okuyorsa kontrol cihazı defrostu erken bitirebilir ya da hiç başlatmayabilir. Ekranda makul bir değer görülmesi, sensörün doğru ölçtüğünü tek başına kanıtlamaz.",
      },
      {
        title: "Kapıdan yoğun nem giriyor olabilir",
        body: "Kapının uzun süre açık kalması, sık ürün girişi veya yıpranmış conta sıcak ve nemli havayı odaya taşır. Nem evaporatörün soğuk yüzeyinde yoğuşup donarak buz yükünü artırır.",
      },
      {
        title: "Fan veya hava dolaşımı sorunu olabilir",
        body: "Fan motorunun durması, ters dönmesi ya da ürünlerin hava yolunu kapatması serpantin çevresindeki hava akışını bozar. Buzlanma düzensiz olabilir ve odanın bazı noktaları daha sıcak kalabilir.",
      },
      {
        title: "Drenaj hattı tıkalı olabilir",
        body: "Defrost sırasında eriyen su tahliye edilemezse tava çevresinde birikir ve yeniden donar. Oda zemininde su, tahliye bölgesinde buz veya tekrarlayan taşma görülmesi drenaj kontrolünü gerektirir.",
      },
      {
        title: "Soğutma devresi dengesiz çalışıyor olabilir",
        body: "Soğutucu akışkan miktarı, genleşme elemanı veya basınç dengesindeki sorunlar serpantinde anormal karlanma oluşturabilir. Buzun yalnızca belirli bir bölgede başlaması ölçümlü devre kontrolü gerektirir.",
      },
    ],
    safeChecks: [
      "Kapının tamamen kapandığını, contanın yırtık veya ezilmiş olmadığını gözle kontrol edin.",
      "Evaporatör önündeki ve dönüş havası yolundaki ürünleri uzaklaştırın.",
      "Kontrol panelindeki sıcaklık, alarm ve defrost göstergelerini fotoğraflayın.",
      "Buzun evaporatörde mi, borunun tek bölümünde mi yoksa kapı çevresinde mi oluştuğunu not edin.",
      "Ürün sıcaklığı yükseliyorsa ürünleri güvenli çalışan başka bir soğuk alana taşıyın.",
    ],
    avoid: [
      "Buzu bıçak, tornavida veya çekiçle kırmak",
      "Kontrol cihazının defrost ayarlarını rastgele değiştirmek",
      "Fan koruyucusunu sökerek cihaz çalışırken müdahale etmek",
      "Tekrarlayan buzlanmayı yalnızca eritip sistemi yeniden devreye almak",
    ],
    serviceSlug: "soguk-oda-tamiri",
    serviceTitle: "Soğuk Oda Tamiri",
    relatedSlugs: ["ticari-buzdolabi-neden-sogutmuyor", "sogutma-kompresoru-arizasi-belirtileri"],
    faq: [
      {
        q: "Soğuk odada buzlanma normal midir?",
        a: "İnce ve geçici kırağı çalışma koşuluna göre görülebilir; evaporatörü, fan yolunu veya zemini kaplayan yoğun ve sürekli buzlanma normal değildir.",
      },
      {
        q: "Buzu eritince soğuk oda düzelir mi?",
        a: "Hava akışı geçici olarak geri dönebilir ancak defrost, sensör, fan, kapı veya drenaj kaynaklı neden giderilmezse buzlanma tekrarlar.",
      },
      {
        q: "Evaporatörün sadece bir tarafı buzlanıyorsa sebebi nedir?",
        a: "Hava akışı ve soğutma devresi birlikte değerlendirilmelidir. Akışkan dağılımı veya genleşme elemanı gibi ihtimaller basınç ve sıcaklık ölçümü gerektirir.",
      },
    ],
  },
  {
    slug: "sogutma-kompresoru-arizasi-belirtileri",
    title: "Soğutma Kompresörü Arızası Belirtileri",
    shortTitle: "Kompresör Arızası Belirtileri",
    metaDescription:
      "Ticari soğutma kompresörü arızası nasıl anlaşılır? Devreye girmeme, termik atma, ses, ısınma ve yetersiz soğutma belirtilerini inceleyin.",
    eyebrow: "Kompresör teşhisi",
    intro:
      "Kompresör soğutma çevriminin merkezindedir fakat cihazın soğutmaması, kompresörün kesin olarak bozuk olduğu anlamına gelmez. Besleme gerilimi, kontaktör, röle, kapasitör, basınç koruması veya kontrol sinyali kompresörün devreye girmesini engelleyebilir. Değişim kararı ancak elektriksel ve mekanik ölçümler birlikte değerlendirildikten sonra verilmelidir.",
    urgentNote:
      "Yanık kokusu, duman, kabloda aşırı ısınma veya sigortanın tekrar tekrar atması varsa cihazı yeniden çalıştırmayın. Enerjiyi güvenli noktadan kesin ve teknik servis çağırın.",
    causes: [
      {
        title: "Kompresör hiç devreye girmiyor",
        body: "Sistem çağrı verdiği hâlde kompresör sessiz kalıyorsa besleme, sigorta, kontaktör, röle, kapasitör, termik ve basınç korumaları kontrol edilir. Bu elemanlar elenmeden kompresör arızası denemez.",
      },
      {
        title: "Kısa süre çalışıp termiğe geçiyor",
        body: "Aşırı akım, düşük gerilim, yüksek basınç, yetersiz kondenser soğutması veya mekanik sıkışma kompresörü korumaya alabilir. Sadece termiği sıfırlayıp tekrar çalıştırmak arızayı büyütebilir.",
      },
      {
        title: "Olağan dışı ses ve titreşim oluşuyor",
        body: "Yeni başlayan vuruntu, metalik ses veya belirgin titreşim mekanik aşınmaya işaret edebilir. Bununla birlikte gevşek bağlantı, boru teması veya fan sesi kompresör sesiyle karıştırılabilir.",
      },
      {
        title: "Gövde aşırı ısınıyor",
        body: "Kirli kondenser, fan arızası, yüksek basınç, düşük emiş gazı soğutması veya elektriksel problem gövde sıcaklığını yükseltebilir. Yüzeye dokunarak karar vermek yerine akım, basınç ve sıcaklık ölçülmelidir.",
      },
      {
        title: "Çalışıyor fakat basınç farkı oluşturmuyor",
        body: "Kompresör sesi duyulsa bile iç mekanik aşınma nedeniyle yeterli sıkıştırma sağlanamayabilir. Emiş ve basma basınçları ile çekilen akım birlikte değerlendirilerek performans doğrulanır.",
      },
      {
        title: "Elektriksel sargı veya izolasyon sorunu var",
        body: "Sargı direnci dengesizliği, gövdeye kaçak veya izolasyon zayıflığı güvenlik riski oluşturur. Bu kontroller uygun ölçüm cihazlarıyla ve sistem enerjisizken yetkili teknisyen tarafından yapılmalıdır.",
      },
    ],
    safeChecks: [
      "Kontrol panelindeki hata kodunu ve arızanın oluştuğu saati kaydedin.",
      "Kompresör çalışmadan önce ve çalışırken duyulan sesi uzaktan kısa bir videoya alın.",
      "Kondenser fanının dönüp dönmediğini koruyucuyu sökmeden gözlemleyin.",
      "Sigortayı yalnızca bir kez kontrol edin; tekrar atıyorsa yeniden kaldırmayın.",
      "Servise cihaz etiketi, soğutucu akışkan bilgisi ve önceki işlem geçmişini iletin.",
    ],
    avoid: [
      "Kompresör gövdesine veya açık elektrik bağlantılarına dokunmak",
      "Termik veya basınç korumasını köprüleyerek cihazı zorla çalıştırmak",
      "Arızanın nedeni bulunmadan yeni kompresör taktırmak",
      "Kaçak onarılmadan ya da vakum yapılmadan gaz eklemek",
    ],
    serviceSlug: "kompresor-degisimi-gaz-dolumu",
    serviceTitle: "Kompresör Değişimi ve Gaz Dolumu",
    relatedSlugs: ["ticari-buzdolabi-neden-sogutmuyor", "soguk-oda-buzlanmasi-neden-olur"],
    faq: [
      {
        q: "Kompresör çalışmıyorsa mutlaka değişmesi gerekir mi?",
        a: "Hayır. Besleme, kontaktör, röle, kapasitör, termik, sensör ve basınç koruması gibi çevre elemanları da kompresörün çalışmasını engelleyebilir.",
      },
      {
        q: "Kompresör arızası ölçümle nasıl doğrulanır?",
        a: "Sargı ve izolasyon, çekilen akım, emiş-basma basınçları ve çalışma sıcaklıkları birlikte değerlendirilir. Tek bir belirti değişim kararı için yeterli değildir.",
      },
      {
        q: "Kompresör değişiminden sonra gaz dolumu gerekir mi?",
        a: "Kapalı soğutma devresi açıldığı için uygun onarım prosedürü, sızdırmazlık kontrolü, vakum ve cihaz etiketine uygun akışkan şarjı gerekir.",
      },
    ],
  },
];

export function getFaultGuide(slug) {
  return FAULT_GUIDES.find((guide) => guide.slug === slug);
}

export function getFaultGuidesForService(serviceSlug) {
  return FAULT_GUIDES.filter((guide) => guide.serviceSlug === serviceSlug);
}
