/* ==========================================================================
   TRAVU - GLOBAL DESTINATION DATA & AI READINESS SYNTHESIS ENGINE
   Full English, Origin-Destination Gap Analytics, Universal Global Support
   ========================================================================== */

const GLOBAL_DESTINATIONS = {
  KR: {
    name: "South Korea",
    code: "KR",
    flag: "🇰🇷",
    cities: ["Seoul", "Busan", "Jeju Island", "Incheon", "Daegu"],
    defaultCity: "Seoul + Busan",
    currency: "KRW (₩ - South Korean Won)",
    language: "Korean (한국어)",
    powerPlug: "Type C & F (220V, 60Hz - recessed round two-pin)",
    emergencyNumbers: {
      police: "112",
      ambulance: "119",
      touristHotline: "1330 (24/7 Multi-language Travel Hotline)",
      embassy: "+82-2-783-5675 (Consular Emergency: +82-10-5387-2647)"
    },
    quickFacts: {
      tapWater: "Safe to boil; filtered dispensers provided free at all restaurants.",
      tipping: "Strictly NO tipping. Seen as awkward or disrespectful.",
      weatherSummary: "Four distinct seasons with sub-zero freezing winters and hot summer monsoons.",
      simRule: "Foreigners can use eSIM or airport physical SIM without national ID verification."
    },
    readinessItems: [
      {
        id: "kr-doc-keta",
        category: "prepare",
        title: "K-ETA or Valid Visa Clearance",
        priority: "must",
        icon: "📄",
        summary: "Check visa requirements or submit your digital K-ETA approval prior to flight.",
        why: "Immigration rules require non-visa-waiver passport holders to obtain official electronic clearance before departure.",
        actionText: "Check Korea Visa Portal",
        actionUrl: "https://www.visa.go.kr",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-doc-qcode",
        category: "prepare",
        title: "Q-CODE & e-Arrival Health Card",
        priority: "must",
        icon: "📋",
        summary: "Complete electronic arrival and health declaration 48 hours before landing.",
        why: "Completing Q-Code online avoids manual paper processing and saves up to 35 minutes at Incheon Airport immigration.",
        actionText: "Fill Q-CODE Online",
        actionUrl: "https://qcode.kdca.go.kr",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-app-naver",
        category: "install",
        title: "Install Naver Map & KakaoMap (Crucial!)",
        priority: "must",
        icon: "🗺️",
        summary: "Google Maps walking and turn-by-turn navigation DOES NOT work in South Korea.",
        why: "South Korean national security laws restrict high-precision geospatial data exports to foreign servers. Naver Map and KakaoMap are the only accurate navigation tools with English transit support.",
        actionText: "Get Naver Map",
        actionUrl: "https://map.naver.com",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-app-papago",
        category: "install",
        title: "Install Naver Papago AI Translator",
        priority: "must",
        icon: "🗣️",
        summary: "The most natural Korean image, menu, and voice translator.",
        why: "Built by Naver, Papago handles Korean honorifics, street signage, and handwritten menu OCR far better than generic translation apps.",
        actionText: "Get Papago App",
        actionUrl: "https://papago.naver.com",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-con-esim",
        category: "connectivity",
        title: "Pre-order Korean eSIM or Airport Pocket WiFi",
        priority: "must",
        icon: "📶",
        summary: "Activate high-speed SK Telecom, KT, or LG U+ connectivity upon touchdown.",
        why: "Immediate internet access is required to access your Q-CODE QR, verify hotel check-in details, and navigate subway lines from the terminal.",
        actionText: "Browse Korea eSIMs",
        actionUrl: "https://www.klook.com",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-pay-wowpass",
        category: "payment",
        title: "WOWPASS Prepaid Card & T-Money Duo",
        priority: "must",
        icon: "💳",
        summary: "All-in-one tourist debit card with integrated subway transport chip.",
        why: "Many trendy cafes, automated kiosks, and stores in Seoul are strictly cashless. WOWPASS allows instant multi-currency kiosk top-up and works across all merchants and subway turnstiles.",
        actionText: "Find WOWPASS Kiosks",
        actionUrl: "https://www.wowpass.io",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-trans-tmoney",
        category: "transport",
        title: "T-Money or Seoul Climate Card",
        priority: "must",
        icon: "🚇",
        summary: "Essential contactless card for Seoul & Busan Subway and City Buses.",
        why: "Cash is no longer accepted on many Seoul city bus routes. T-Money grants automatic transit transfer discounts between buses and subways within 30 minutes.",
        actionText: "Transit Card Guide",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-pack-bidet",
        category: "pack",
        title: "Portable Travel Bidet",
        priority: "rec",
        icon: "🚽",
        summary: "Recommended for travelers accustomed to water hygiene.",
        why: "Most public restrooms in subway stations and traditional restaurants only provide dry toilet paper (no jet washers). A compact portable bidet ensures personal comfort.",
        actionText: "View Recommended Gear",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-pack-adapter",
        category: "pack",
        title: "Type F Recessed Travel Adapter",
        priority: "must",
        icon: "🔌",
        summary: "Korean wall sockets are deeply recessed with thick round two-prong pins.",
        why: "Standard flat or loose two-pin adapters will wobble or fail to make electrical contact in Korean wall outlets.",
        actionText: "Check Adapter Specs",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-app-kakaot",
        category: "install",
        title: "Install Kakao T (Korea's Leading Taxi App)",
        priority: "rec",
        icon: "🚕",
        summary: "Hailing cabs directly without language barriers or address misunderstandings.",
        why: "Standard Uber has limited presence (operating as UT). Kakao T is universally used across Korea and transmits destination coordinates directly to drivers.",
        actionText: "Get Kakao T",
        actionUrl: "https://www.kakaocorp.com",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-cult-priority-seat",
        category: "culture",
        title: "Subway Priority Seating Strict Etiquette",
        priority: "must",
        icon: "💺",
        summary: "Do NOT sit in end-row priority seats (Noyakjaseok), even when empty.",
        why: "Sitting in designated elderly, disabled, or pregnant seats as an able-bodied traveler is seen as a serious social transgression and may result in stern reprimands from elders.",
        actionText: "Read Subway Etiquette",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-cult-trash",
        category: "culture",
        title: "Strict Waste Sorting & Zero Public Street Bins",
        priority: "must",
        icon: "🗑️",
        summary: "Always carry a small personal plastic bag for waste in your daypack.",
        why: "Under the Jongnyangje volume-based system, street trash bins are rare in Seoul. Littering carries heavy municipal fines up to ₩100,000 recorded on public CCTV.",
        actionText: "Waste Sorting Rules",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "kr-long-alien",
        category: "prepare",
        title: "Alien Registration Card (ARC) & Local Banking",
        priority: "must",
        icon: "🏛️",
        summary: "Mandatory for stays over 90 days (Students, Workers, Long Stayers).",
        why: "An ARC is required for renting housing (Jeonse/Wolse), registering postpaid verified phone numbers (PASS authentication), and local banking.",
        actionText: "HiKorea Immigration Portal",
        actionUrl: "https://www.hikorea.go.kr",
        tags: ["study", "work", "longstay"]
      }
    ],
    cultureGaps: [
      {
        topic: "Dining & Table Etiquette",
        icon: "🍲",
        originDesc: "Rice bowls are often held in hand while eating; leaving food or sharing casually is standard.",
        destDesc: "Rice bowls must remain on the table—lifting bowls is considered beggar behavior. Elders initiate meals first, and drinks are poured for others using two hands.",
        rule: "Keep rice bowls resting on the table and pour drinks for companions with both hands."
      },
      {
        topic: "Restrooms & Personal Hygiene",
        icon: "🚽",
        originDesc: "Wet bathrooms with bidet sprayers / water hoses are common.",
        destDesc: "Restrooms are strictly dry. Most public places supply dry toilet paper only. If designated bins are present, dispose of paper accordingly.",
        rule: "Carry a pocket travel bidet and flush toilet paper only when marked permissible."
      },
      {
        topic: "Escalators & Walking Commute",
        icon: "🪜",
        originDesc: "Standing randomly on either side of escalators.",
        destDesc: "Strict rule: Stand on the RIGHT; leave the LEFT clear for rushed commuters catching connecting trains.",
        rule: "Keep luggage and personal stance strictly to the right side of escalators."
      },
      {
        topic: "Public Transit Volume & Behavior",
        icon: "🚇",
        originDesc: "Casual talking and phone conversations on public transit.",
        destDesc: "Subway cars are quiet zones. Loud chatter or taking prolonged phone calls is frowned upon.",
        rule: "Keep phones on vibrate and avoid sitting in designated pink/end-car priority seats."
      },
      {
        topic: "Tipping Culture",
        icon: "💵",
        originDesc: "Tipping or rounding up change is customary in hospitality.",
        destDesc: "NO tipping exists. Attempting to tip restaurant staff or taxi drivers will create confusion and is considered improper.",
        rule: "Pay the exact bill amount printed on the receipt."
      },
      {
        topic: "Greetings & Handling Transactions",
        icon: "🙇",
        originDesc: "One-handed handshakes or casual hand waves.",
        destDesc: "A slight 15-degree bow when greeting. Always hand over payment cards, money, and receipts using BOTH hands.",
        rule: "Present and receive your credit card using two hands at convenience stores."
      }
    ],
    hiddenFrictions: [
      {
        category: "Navigation",
        icon: "🗺️",
        title: "Google Maps Walking Routes are Disabled",
        detail: "Google Maps cannot provide walking or turn-by-turn guidance in South Korea due to national security regulations. You must use Naver Map.",
        severity: "critical"
      },
      {
        category: "Bathroom",
        icon: "🚽",
        title: "Subway Restrooms Have No Water Sprayers",
        detail: "Travelers used to wet hygiene are often shocked. Public subway restrooms provide only dry paper. Always carry a portable bidet or wet wipes.",
        severity: "high"
      },
      {
        category: "Solo Dining (Honbap)",
        icon: "🥩",
        title: "Korean BBQ Often Requires 2+ Person Minimum Orders",
        detail: "Many traditional K-BBQ and hotpot restaurants do not serve solo diners or require ordering at least 2 portions (2-inbun).",
        severity: "medium"
      },
      {
        category: "Cashless Outlets",
        icon: "💳",
        title: "Self-service Cafes Refuse Cash Banknotes",
        detail: "Franchise cafes (Mega Coffee, Compose, Starbucks) use automated touchscreen kiosks that accept cards only. Keep WOWPASS ready.",
        severity: "high"
      },
      {
        category: "Winter Shock",
        icon: "❄️",
        title: "Freezing Siberian Wind Chill Requires Thermal Base Layers",
        detail: "Sub-zero Seoul temperatures feel much colder due to dry winds. Regular jackets are inadequate; grab 'Hotpacks' at GS25 and wear Heattech.",
        severity: "high"
      },
      {
        category: "Pharmacy",
        icon: "💊",
        title: "Prescription Regulations for Everyday Remedies",
        detail: "Korean pharmacies require doctor prescriptions for many antibiotics and strong pain meds. Bring your essential personal medication kit.",
        severity: "medium"
      }
    ],
    appStack: [
      {
        name: "Naver Map (네이버 지도)",
        role: "Essential Navigation & Transit",
        badge: "Must-Have",
        icon: "🗺️",
        desc: "Accurate real-time bus arrivals, subway transfer car positions, walking directions, and English restaurant reviews.",
        warning: "Supports English UI. Can be linked with LINE or Apple ID."
      },
      {
        name: "Kakao T (카카오 T)",
        role: "Taxi & Mobility",
        badge: "Essential",
        icon: "🚕",
        desc: "Request standard, deluxe, or jumbo airport taxis without language friction.",
        warning: "Select 'Pay driver directly' if your foreign credit card does not link in-app."
      },
      {
        name: "Papago (파파고)",
        role: "AI Translation & Menu OCR",
        badge: "Must-Have",
        icon: "🗣️",
        desc: "Fast, accurate Korean-to-English translation with specialized OCR for food menus and subway signs.",
        warning: "Download the offline language pack before your departure."
      },
      {
        name: "WOWPASS App",
        role: "Tourist Prepaid Card & Balance",
        badge: "Fintech Essential",
        icon: "💳",
        desc: "Track real-time card balance, foreign exchange rates, and cashback perks at Olive Young, CU, and Duty Free.",
        warning: "Requires physical card scan from airport kiosk."
      },
      {
        name: "Emergency Ready (안전디딤돌)",
        role: "National Disaster Alerts",
        badge: "Emergency",
        icon: "🚨",
        desc: "Official Korean government broadcast for severe weather, earthquakes, and emergencies in English.",
        warning: "Recommended for hikers and seasonal travelers."
      },
      {
        name: "Catch Table Global",
        role: "Restaurant & Cafe Reservations",
        badge: "Foodie Useful",
        icon: "🍽️",
        desc: "Book popular dining spots in Seongsu, Gangnam, and Hongdae without requiring a Korean Resident Number.",
        warning: "Requires foreign credit card deposit for confirmation."
      }
    ],
    packingMatrix: {
      must: [
        { name: "Original Passport & Visa / K-ETA Approval", desc: "Valid for at least 6 months past return date." },
        { name: "Type F Recessed Travel Adapter", desc: "Dual round pin with earthing side clips (220V)." },
        { name: "Cabin Power Bank (Under 20,000 mAh)", desc: "Mandatory in cabin baggage; prohibited in checked luggage." },
        { name: "Personal Medication & Prescriptions", desc: "Pain relievers, stomach medication, allergy pills." },
        { name: "Comfortable Anti-Slip Walking Shoes", desc: "Seoul subway stations have extensive staircases and hilly terrain." }
      ],
      rec: [
        { name: "Portable Travel Bidet", desc: "Essential for comfort in public restrooms." },
        { name: "Thermal Base Layers / Heattech (Winter/Fall)", desc: "Protects against penetrating sub-zero winds." },
        { name: "Lip Balm & Heavy Facial Moisturizer", desc: "Air humidity drops significantly during Korean autumn and winter." },
        { name: "Compact Reusable Eco-bag", desc: "Korean stores charge extra for single-use shopping bags." }
      ],
      opt: [
        { name: "Compact UV Umbrella", desc: "Useful for monsoon summer showers (Jangma) or bright sun." },
        { name: "Instant Seasoning / Snacks", desc: "Helpful for travelers with strict dietary/halal preferences." },
        { name: "Travel Nail Clipper & Mini Toiletry Kit", desc: "Most hotels offer toiletries, but toothbrushes are often billed." }
      ]
    },
    scenarios: [
      {
        id: "kr-sim-1",
        title: "Ordering at a Local Hongdae Restaurant",
        situation: "You enter a bustling restaurant in Seoul. The server greets you loudly with 'Eoseo oseyo!', points to an open table, and leaves without handing you a physical paper menu.",
        question: "How should you proceed to place your order?",
        options: [
          {
            text: "A. Shout loudly across the room to summon the waiter.",
            correct: false,
            feedback: "Incorrect. Shouting across modern Korean restaurants is considered disruptive."
          },
          {
            text: "B. Check the corner of the table for a call button (Bell) or digital tablet kiosk.",
            correct: true,
            feedback: "Correct! Most Korean dining tables have a small round call bell mounted on the side or an interactive tablet. Press it once to call the server."
          },
          {
            text: "C. Walk into the kitchen area to point at food dishes.",
            correct: false,
            feedback: "Incorrect. Entering commercial kitchen spaces is prohibited."
          }
        ],
        culturalTip: "Cutlery (spoons & metal chopsticks) and napkins are usually stored in a sliding drawer beneath the tabletop!"
      },
      {
        id: "kr-sim-2",
        title: "Rush Hour on Subway Line 2",
        situation: "You board a crowded Seoul subway during evening rush hour carrying a heavy backpack. You notice three vacant seats at the end of the carriage with elderly icon signs.",
        question: "Are you allowed to sit in those empty seats?",
        options: [
          {
            text: "A. Yes, as long as I stand up when an elderly person enters.",
            correct: false,
            feedback: "Incorrect. In South Korea, priority seats (Noyakjaseok) remain vacant for the elderly/disabled even when the carriage is completely packed."
          },
          {
            text: "B. Remain standing and leave the priority seats open.",
            correct: true,
            feedback: "Spot on! Respecting priority seating is one of the strictest public transit rules in Korea. Able-bodied passengers avoid sitting there."
          },
          {
            text: "C. Sit down and pretend to fall asleep.",
            correct: false,
            feedback: "Very poor etiquette and can result in direct verbal rebukes from local passengers."
          }
        ],
        culturalTip: "On crowded trains, take your backpack off and hold it low by your feet or wear it in front."
      },
      {
        id: "kr-sim-3",
        title: "Disposing of an Iced Coffee Cup in Myeongdong",
        situation: "You finish your iced americano while strolling through Myeongdong shopping street. You walk for several blocks and find zero public trash bins on the sidewalk.",
        question: "How should you properly dispose of the cup?",
        options: [
          {
            text: "A. Leave it on a planter box or beside a utility pole.",
            correct: false,
            feedback: "Incorrect! Street littering carries municipal fines up to ₩100,000 tracked on public security cameras."
          },
          {
            text: "B. Keep it in your bag until you reach a subway station or convenience store with sorted recycling bins.",
            correct: true,
            feedback: "Exactly right! Korean civic culture expects individuals to carry their waste until reaching a designated disposal point."
          },
          {
            text: "C. Drop it into a roadside storm drain grate.",
            correct: false,
            feedback: "Strictly prohibited and harmful to municipal drainage."
          }
        ],
        culturalTip: "Disposal bins in Korea separate Plastic (Plasteuk), Paper (Jongi), Cans/Glass, and Food Waste (Eumsikmul)."
      }
    ],
    arrivalSteps: [
      {
        time: "Minutes 00 - 15",
        title: "Touchdown & Activate Connectivity",
        icon: "📶",
        desc: "Connect to Incheon Airport Free WiFi. Enable your travel eSIM data roaming in your phone settings and verify 5G/LTE connection."
      },
      {
        time: "Minutes 15 - 35",
        title: "Immigration & Q-CODE Verification",
        icon: "🛃",
        desc: "Scan your Q-CODE QR code at the quarantine checkpoint. Present your passport, visa/K-ETA, and hotel accommodation address to the border officer."
      },
      {
        time: "Minutes 35 - 50",
        title: "Baggage Claim & Customs Clearance",
        icon: "🧳",
        desc: "Retrieve your checked luggage from the carousel. Scan your Digital Customs QR code at the exit gates (declare any food or plant items)."
      },
      {
        time: "Minutes 50 - 75",
        title: "Obtain WOWPASS or T-Money Card",
        icon: "💳",
        desc: "Locate an orange WOWPASS Kiosk near the arrival hall or AREX train entrance. Insert your passport, exchange foreign currency or top-up KRW, and charge T-Money."
      },
      {
        time: "Minutes 75 - 110",
        title: "Board AREX Airport Express Train",
        icon: "🚄",
        desc: "Take the AREX Express Train (43 minutes non-stop to Seoul Station) or AREX All-Stop Train (tap directly with T-Money)."
      },
      {
        time: "Minutes 110 - 120",
        title: "Hotel Check-in & Save Emergency Hotlines",
        icon: "🏨",
        desc: "Open Naver Map to navigate to your hotel or Airbnb. Bookmark the nearest 24h convenience store (CU/GS25) and consular emergency numbers."
      }
    ]
  },

  JP: {
    name: "Japan",
    code: "JP",
    flag: "🇯🇵",
    cities: ["Tokyo", "Osaka", "Kyoto", "Fukuoka", "Sapporo"],
    defaultCity: "Tokyo + Kyoto",
    currency: "JPY (¥ - Japanese Yen)",
    language: "Japanese (日本語)",
    powerPlug: "Type A & B (100V, 50/60Hz - two flat pins)",
    emergencyNumbers: { police: "110", ambulance: "119", touristHotline: "050-3816-2720" },
    quickFacts: {
      tapWater: "100% safe to drink from the tap across the country.",
      tipping: "Zero tipping culture. Outstanding service is standard.",
      weatherSummary: "Mild spring/autumn, hot humid summers, and snowy winters in northern regions.",
      simRule: "Data eSIMs activate immediately without local identity registration."
    },
    readinessItems: [
      { id: "jp-doc-vjw", category: "prepare", title: "Visit Japan Web (Immigration & Customs QR)", priority: "must", icon: "📄", summary: "Fill out the online digital arrival card before your flight.", why: "Accelerates airport processing through automated biometric gates at Haneda, Narita, and Kansai.", actionText: "Visit Japan Web Portal", actionUrl: "https://vjw-lp.digital.go.jp/en/" },
      { id: "jp-app-suica", category: "transport", title: "Digital Welcome Suica / Pasmo IC Card", priority: "must", icon: "🚇", summary: "Contactless IC card for all subway lines, JR trains, buses, and vending machines.", why: "Can be added directly to Apple Wallet / Google Wallet without queuing for physical card counters.", actionText: "Suica Setup Guide", actionUrl: "#" },
      { id: "jp-pack-plug", category: "pack", title: "Type A Flat 2-Pin Adapter (100V)", priority: "must", icon: "🔌", summary: "Japan uses two parallel flat prongs.", why: "European or round two-pin plugs cannot be inserted into Japanese hotel sockets.", actionText: "Adapter Specs", actionUrl: "#" },
      { id: "jp-cult-escalator", category: "culture", title: "Tokyo (Left) vs Osaka (Right) Escalator Rules", priority: "rec", icon: "🪜", summary: "In Tokyo, stand on the LEFT. In Osaka, stand on the RIGHT.", why: "Ensures smooth flow for commuters rushing to transit connections.", actionText: "Commuter Etiquette", actionUrl: "#" }
    ],
    cultureGaps: [
      { topic: "Eating While Walking (Aruki-gui)", icon: "🍡", originDesc: "Snacking casually while walking along sidewalks.", destDesc: "Considered impolite. Enjoy street food directly beside the shop stall or take it to a bench.", rule: "Finish snacks near the vendor before walking away." },
      { topic: "Quiet Transit (Manner Mode)", icon: "🚅", originDesc: "Answering phone calls and chatting on trains.", destDesc: "Train cars are completely silent. Taking phone calls is strictly prohibited inside passenger cabins.", rule: "Set phones to silent manner mode and avoid voice calls on trains." }
    ],
    hiddenFrictions: [
      { category: "Cash Dependence", icon: "💴", title: "Many Ramen Ticket Machines & Shrines are Cash-Only", detail: "Always carry 1,000-yen notes and 100/500-yen coins for luggage lockers, gachapon, and neighborhood eateries.", severity: "high" }
    ],
    appStack: [
      { name: "Japan Travel by NAVITIME", role: "Transit & Train Timetables", badge: "Must-Have", icon: "🚆", desc: "Second-precision train routing, platform number guides, and JR Pass filters." },
      { name: "VoiceTra / Google Translate", role: "Voice Translation", badge: "Essential", icon: "🗣️", desc: "Instant two-way voice translation recognized across Japan." }
    ],
    arrivalSteps: [
      { time: "Minutes 00 - 30", title: "Scan Visit Japan Web QR Code", icon: "🛃", desc: "Pass through automated immigration and customs gates at Haneda or Narita." },
      { time: "Minutes 30 - 60", title: "Board Skyliner / Narita Express / Monorail", icon: "🚅", desc: "Tap your digital Suica card or board your express airport train directly into central Tokyo." }
    ],
    packingMatrix: {
      must: [
        { name: "Passport & Visit Japan Web QR", desc: "Keep offline screenshots of your QR codes." },
        { name: "Type A Two-Prong Flat Adapter", desc: "100V compatible chargers." },
        { name: "Coin Pouch / Wallet", desc: "Japan's 1, 5, 10, 50, 100, and 500 yen coins accumulate quickly." }
      ],
      rec: [
        { name: "Slip-on Shoes", desc: "Many traditional ryokans, temples, and izakayas require removing shoes." },
        { name: "Small Hand Towel (Tenugui)", desc: "Many public restrooms in Japan do not provide paper hand towels." }
      ],
      opt: [
        { name: "Universal Pocket WiFi", desc: "Helpful backup for remote regional travel." }
      ]
    },
    scenarios: [
      {
        id: "jp-sim-1",
        title: "Ordering Ramen with a Ticket Machine",
        situation: "You step inside a popular ramen shop in Shinjuku. Near the doorway sits an automated vending machine covered in Japanese buttons.",
        question: "How should you order your meal?",
        options: [
          { text: "A. Find an empty counter seat first and wait for the chef.", correct: false, feedback: "Incorrect. Traditional ramen shops require purchasing food tickets at the machine first." },
          { text: "B. Insert cash into the machine, press your ramen choice, collect the printed ticket, and hand it to the chef.", correct: true, feedback: "Spot on! The 'Shokkenki' ticket system is standard across ramen counters in Japan." },
          { text: "C. Wave a credit card at the open kitchen.", correct: false, feedback: "Most local ticket machines operate exclusively on cash." }
        ],
        culturalTip: "Slurping your ramen noodles loudly is considered a compliment to the chef indicating the dish is delicious!"
      }
    ]
  },

  SG: {
    name: "Singapore",
    code: "SG",
    flag: "🇸🇬",
    cities: ["Singapore Central", "Marina Bay", "Sentosa", "Jurong", "Changi"],
    defaultCity: "Singapore",
    currency: "SGD (S$ - Singapore Dollar)",
    language: "English, Mandarin, Malay, Tamil",
    powerPlug: "Type G (230V - 3 rectangular pins)",
    emergencyNumbers: { police: "999", ambulance: "995", touristHotline: "1800-736-2000" },
    quickFacts: {
      tapWater: "100% safe to drink directly from tap water systems.",
      tipping: "Not required; 10% service charge is usually included on restaurant bills.",
      weatherSummary: "Tropical, warm, and humid year-round with frequent brief rain showers.",
      simRule: "Local SIMs require passport registration; eSIMs activate instantly."
    },
    readinessItems: [
      { id: "sg-doc-sgac", category: "prepare", title: "SG Arrival Card (SGAC)", priority: "must", icon: "📄", summary: "Submit online within 3 days prior to arrival at Changi Airport.", why: "Mandatory free digital declaration required for all international travelers entering Singapore.", actionText: "ICA Official SGAC Portal", actionUrl: "https://eservices.ica.gov.sg/sgarrivalcard/" },
      { id: "sg-pay-contactless", category: "payment", title: "Contactless Visa/Mastercard (SimplyGo)", priority: "must", icon: "💳", summary: "Directly tap your foreign debit/credit card at MRT and bus gates.", why: "No need to purchase a physical EZ-Link transit card.", actionText: "SimplyGo Guide", actionUrl: "#" },
      { id: "sg-cult-chope", category: "culture", title: "'Chope' Table Etiquette at Hawker Centers", priority: "rec", icon: "🧻", summary: "A tissue pack or umbrella left on a hawker center table means it is RESERVED.", why: "Do not sit at a table that has a tissue packet on it to avoid conflicts with locals.", actionText: "Hawker Etiquette", actionUrl: "#" }
    ],
    cultureGaps: [
      { topic: "Chewing Gum & Strict Public Fines", icon: "🚫", originDesc: "Chewing gum is freely sold and consumed anywhere.", destDesc: "Importing or selling chewing gum is banned. Strict fines apply for littering or eating on the MRT.", rule: "Never bring commercial quantities of chewing gum and never eat on the MRT." }
    ],
    hiddenFrictions: [
      { category: "Type G Plug", icon: "🔌", title: "British 3-Pin Rectangular Wall Sockets", detail: "Bring a Type G universal adapter for your laptop and phone chargers.", severity: "high" }
    ],
    appStack: [
      { name: "MyTransport.SG", role: "Real-time MRT & Bus Tracking", badge: "Essential", icon: "🚇", desc: "Live train arrival predictions and bus occupancy." },
      { name: "Grab / CDG Zig", role: "Ride Hailing & Taxi", badge: "Useful", icon: "🚗", desc: "Fast rides across the island." }
    ],
    arrivalSteps: [
      { time: "Minutes 00 - 30", title: "Biometric Changi Immigration", icon: "🛃", desc: "Clear automated passport gates in under 5 minutes." },
      { time: "Minutes 30 - 60", title: "Board MRT to Downtown", icon: "🚇", desc: "Tap your contactless credit card directly at Changi Airport MRT station." }
    ],
    packingMatrix: {
      must: [
        { name: "Passport & SGAC Confirmation", desc: "Submitted within 72 hours before flight." },
        { name: "Type G UK 3-Pin Adapter", desc: "Standard 230V square pins." },
        { name: "Contactless Credit / Debit Card", desc: "For seamless MRT and bus tapping." }
      ],
      rec: [
        { name: "Compact Umbrella", desc: "Daily afternoon tropical rain showers." },
        { name: "Lightweight Breathable Attire", desc: "High heat and humidity year-round." }
      ],
      opt: [
        { name: "Light Cardigan", desc: "Malls, cinemas, and MRTs are heavily air-conditioned." }
      ]
    },
    scenarios: [
      {
        id: "sg-sim-1",
        title: "Hawker Center Lunch Rush",
        situation: "You hold a hot tray of Hainanese Chicken Rice at Lau Pa Sat. You spot an empty table with a small tissue packet sitting in the center.",
        question: "What should you do?",
        options: [
          { text: "A. Sit down and toss the tissue packet into the trash.", correct: false, feedback: "Incorrect and considered rude." },
          { text: "B. The table has been 'choped' (reserved). Look for another completely empty table.", correct: true, feedback: "Correct! The 'tissue chope' is a recognized informal reservation tradition in Singapore." },
          { text: "C. Sit down and use the tissue packet to wipe your hands.", correct: false, feedback: "That belongs to a patron who is currently queuing for food." }
        ],
        culturalTip: "Always return your food trays and crockery to the designated Tray Return stations after finishing your meal."
      }
    ]
  }
};

// Universal AI Generator for any custom or non-listed country
function synthesizeAIReadinessPlan(origin, destCode, destName, city, duration, purpose, group) {
  const existing = GLOBAL_DESTINATIONS[destCode];
  if (existing) {
    return existing;
  }

  // Dynamic Synthesis Engine for ANY country on Earth
  const countryName = destName || destCode;
  return {
    name: countryName,
    code: destCode,
    flag: "🌍",
    cities: [city || `${countryName} Central`],
    defaultCity: city || countryName,
    currency: `Local Currency of ${countryName}`,
    language: `Official Language of ${countryName}`,
    powerPlug: "Universal Travel Adapter Recommended",
    emergencyNumbers: {
      police: "112 / 911",
      ambulance: "112 / 911",
      touristHotline: "Local Tourist Information Services",
      embassy: `Consular Assistance Desk for ${countryName}`
    },
    quickFacts: {
      tapWater: "Verify with accommodation whether local tap water is safe or bottled water is preferred.",
      tipping: "Check local dining standards for service charge inclusions.",
      weatherSummary: `Check the seasonal forecast for ${countryName} prior to departure.`,
      simRule: "International travel eSIMs recommended for immediate data."
    },
    readinessItems: [
      {
        id: "gen-doc-visa",
        category: "prepare",
        title: `Visa & Entry Passport Validity (${countryName})`,
        priority: "must",
        icon: "📄",
        summary: `Ensure your passport has at least 6 months validity from return date and verify visa/entry permits for ${countryName}.`,
        why: `Immigration authorities in ${countryName} enforce strict passport validity and entry regulations.`,
        actionText: "Verify Entry Rules",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "gen-con-esim",
        category: "connectivity",
        title: `Pre-activated Travel eSIM for ${countryName}`,
        priority: "must",
        icon: "📶",
        summary: "Set up international data roaming or purchase a regional eSIM prior to departure.",
        why: "Instant internet access upon arrival is essential for GPS navigation, ride-hailing, and accommodation verification.",
        actionText: "Browse Global eSIMs",
        actionUrl: "https://www.klook.com",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "gen-pay-card",
        category: "payment",
        title: "Multi-Currency Debit Card & Backup Cash",
        priority: "must",
        icon: "💳",
        summary: `Prepare a zero-FX fee debit/credit card along with a modest amount of local currency cash for ${countryName}.`,
        why: "Do not rely on a single payment method. Many small merchants and transit systems require local currency or contactless chip cards.",
        actionText: "Payment Tips",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "gen-pack-adapter",
        category: "pack",
        title: "Universal Multi-Plug Travel Adapter",
        priority: "must",
        icon: "🔌",
        summary: `Wall outlet standards in ${countryName} may differ from your origin country.`,
        why: "A universal surge-protected adapter ensures you can charge your smartphone, laptop, and power bank safely.",
        actionText: "Recommended Gear",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "gen-app-nav",
        category: "install",
        title: `Download Local Transit & Offline Maps for ${countryName}`,
        priority: "must",
        icon: "🗺️",
        summary: "Download offline map areas in Google Maps or the top-rated local navigation app.",
        why: "Saves mobile data and ensures reliable turn-by-turn navigation even in areas with weak cellular coverage.",
        actionText: "Download Offline Maps",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      },
      {
        id: "gen-cult-etiquette",
        category: "culture",
        title: `Local Etiquette & Social Norms in ${countryName}`,
        priority: "rec",
        icon: "🧠",
        summary: "Familiarize yourself with local tipping customs, public transit noise etiquette, and religious considerations.",
        why: `Showing cultural awareness avoids uncomfortable misunderstandings and fosters positive interactions with locals in ${countryName}.`,
        actionText: "Read Culture Notes",
        actionUrl: "#",
        tags: ["tourism", "study", "work", "nomad", "longstay"]
      }
    ],
    cultureGaps: [
      {
        topic: "Dining & Hospitality Customs",
        icon: "🍽️",
        originDesc: `Standard dining and service customs in your home country (${origin}).`,
        destDesc: `Local dining etiquette in ${countryName}. Pay attention to tipping expectations, table manners, and bill settlement.`,
        rule: `Observe how local patrons interact with staff in ${countryName} restaurants.`
      },
      {
        topic: "Public Conduct & Commute",
        icon: "🚇",
        originDesc: `Everyday commuter behavior in ${origin}.`,
        destDesc: `Public transport rules and quiet zones in ${countryName}.`,
        rule: "Keep noise levels modest on shared public transportation."
      }
    ],
    hiddenFrictions: [
      {
        category: "Payment Methods",
        icon: "💳",
        title: `Payment Infrastructure in ${countryName}`,
        detail: `Verify whether ${countryName} leans heavily cashless or requires physical cash notes for daily transactions.`,
        severity: "high"
      },
      {
        category: "Power Sockets",
        icon: "🔌",
        title: "Voltage & Socket Configuration",
        detail: "Ensure your electronic devices support the local voltage (110V vs 230V) to avoid damage.",
        severity: "high"
      }
    ],
    appStack: [
      {
        name: "Google Maps / Citymapper",
        role: "Navigation & Transit Routes",
        badge: "Essential",
        icon: "🗺️",
        desc: `Comprehensive urban routing for walking, subways, and bus systems in ${countryName}.`
      },
      {
        name: "Google Translate / DeepL",
        role: "Real-time AI Translation",
        badge: "Must-Have",
        icon: "🗣️",
        desc: "Instant camera menu translation and speech conversation tool."
      }
    ],
    packingMatrix: {
      must: [
        { name: "Original Passport & Visa Confirmations", desc: "Minimum 6 months validity." },
        { name: "Universal Travel Adapter", desc: "Compatible with all global wall sockets." },
        { name: "Power Bank (Cabin Luggage Only)", desc: "Keep mobile devices charged on long travel days." }
      ],
      rec: [
        { name: "Personal Medication Kit", desc: "Pack sufficient supply for the entire duration." },
        { name: "Weather-Appropriate Clothing", desc: `Pack according to current season in ${countryName}.` }
      ],
      opt: [
        { name: "Compact Daypack & Reusable Bottle", desc: "Convenient for city exploration." }
      ]
    },
    scenarios: [
      {
        id: "gen-sim-1",
        title: `Navigating Local Services in ${countryName}`,
        situation: `You arrive at a central station in ${countryName} and need to purchase a single-trip transit ticket.`,
        question: "What is the recommended approach?",
        options: [
          { text: "A. Use an automated ticket vending machine with English language mode or tap a contactless card.", correct: true, feedback: "Correct! Most modern stations offer multilingual touchscreens or contactless card tapping." },
          { text: "B. Attempt to board without a valid ticket or pass.", correct: false, feedback: "Never board without a valid ticket to avoid heavy transit fines." }
        ],
        culturalTip: `Always retain your ticket or transit card until you have exited the destination gate in ${countryName}.`
      }
    ],
    arrivalSteps: [
      {
        time: "Minutes 00 - 30",
        title: "Immigration & Customs Clearance",
        icon: "🛃",
        desc: `Present your travel documents and arrival declaration to the border officers in ${countryName}.`
      },
      {
        time: "Minutes 30 - 60",
        title: "Activate Connectivity & Transit to City",
        icon: "📶",
        desc: "Turn on your travel eSIM and board the airport express train or official taxi to your accommodation."
      }
    ]
  };
}
