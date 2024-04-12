import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
export const useSimulationStore = defineStore(
  'simulationStore',
  () => {
    const uuid = ref('41e9325b-9807-436e-bfc3-0fa89eb80f8e')
    const initPrice = ref(93357586)
    const simStarted = ref(false)
    const simDialog = ref(true)

    const selectBrand = ref({
      brandId: 1,
      brandName: '이디야커피',
      brandType: '초대형 고급 커피 프랜차이즈',
      depositAmount: 18200,
      depositAmountYn: false,
      debtGranteeContractYn: false,
      extendedContractYear: 2,
      firstContractYear: 3,
      insuranceYn: true,
      interiorAmount: 41800,
      guaranteedAmount: 5000,
      educationAmount: 3300,
      etcAmount: 110930,
      franchiseAmount: 9900,
      totalAmount: 129130,
      standardStoreArea: 20,
      areaUnitInteriorAmount: 2090,
      merchantStoreCount: 3005,
      exitContractCount: 88,
      cancelContractCount: 0,
      areaUnitAverageSale: 6264,
      nameChangeCount: 198,
      newFranchiseRegistCount: 218,
      averageSale: 180331,
      laborPersonnelExpense: 20,
      laborRawMaterialCost: 32,
      laborEtcCost: 7,
      bestMenuPrice: 3200,
      cafeLogo: 'https://dagak.s3.ap-northeast-2.amazonaws.com/cafe/%EC%9D%B4%EB%94%94%EC%95%BC.png'
    })
    const facilityList = ref([
      {
        facilityId: 23832,
        facilityName: '강남에이스안과의원',
        districtId: 3120197,
        lat: 37.5009805027604,
        lng: 127.036135772428,
        distance: 221.82089339470326,
        facilityTypeId: 5
      },
      {
        facilityId: 23178,
        facilityName: '박내과의원',
        districtId: 3120197,
        lat: 37.499003964932136,
        lng: 127.0368183856642,
        distance: 226.20708797105434,
        facilityTypeId: 5
      },
      {
        facilityId: 33193,
        facilityName: '선한목자병원',
        districtId: 3120197,
        lat: 37.50144845495191,
        lng: 127.03623461399503,
        distance: 227.52507282893473,
        facilityTypeId: 5
      },
      {
        facilityId: 23397,
        facilityName: '강남숲정신건강의학과의원',
        districtId: 3120197,
        lat: 37.4989811402062,
        lng: 127.036816730065,
        distance: 228.3058894944819,
        facilityTypeId: 5
      },
      {
        facilityId: 37908,
        facilityName: '위효선한의원',
        districtId: 3120197,
        lat: 37.4989804193,
        lng: 127.0368169559,
        distance: 228.35312256289808,
        facilityTypeId: 5
      },
      {
        facilityId: 59182,
        facilityName: '역삼역',
        districtId: 3120197,
        lat: 37.50165706,
        lng: 127.0362962,
        distance: 232.27374128065728,
        facilityTypeId: 11
      },
      {
        facilityId: 23332,
        facilityName: '강남푸른치과의원',
        districtId: 3120197,
        lat: 37.4985317342571,
        lng: 127.038463288155,
        distance: 232.58267343095693,
        facilityTypeId: 5
      },
      {
        facilityId: 31608,
        facilityName: '황경희산부인과의원',
        districtId: 3120197,
        lat: 37.4985317342571,
        lng: 127.038463288155,
        distance: 232.58267343095693,
        facilityTypeId: 5
      },
      {
        facilityId: 15353,
        facilityName: '성지프라자약국',
        districtId: 3120197,
        lat: 37.5015847,
        lng: 127.0361824,
        distance: 239.41769169920497,
        facilityTypeId: 2
      },
      {
        facilityId: 16398,
        facilityName: '참좋은선약국',
        districtId: 3120197,
        lat: 37.5015847,
        lng: 127.0361824,
        distance: 239.41769169920497,
        facilityTypeId: 2
      },
      {
        facilityId: 26573,
        facilityName: '노박치과의원',
        districtId: 3120197,
        lat: 37.5015791243,
        lng: 127.0361577746,
        distance: 241.5667811304252,
        facilityTypeId: 5
      },
      {
        facilityId: 27397,
        facilityName: '더맑은신경정신과의원',
        districtId: 3120197,
        lat: 37.5015791243,
        lng: 127.0361577746,
        distance: 241.5667811304252,
        facilityTypeId: 5
      },
      {
        facilityId: 23878,
        facilityName: '강남연세산부인과의원',
        districtId: 3120197,
        lat: 37.50157912434391,
        lng: 127.03615777458234,
        distance: 241.56678510195192,
        facilityTypeId: 5
      },
      {
        facilityId: 21295,
        facilityName: '수협은행',
        districtId: 3120197,
        lat: 37.5015784938059,
        lng: 127.036157208818,
        distance: 241.5909005595001,
        facilityTypeId: 3
      },
      {
        facilityId: 21334,
        facilityName: '수협은행',
        districtId: 3120197,
        lat: 37.5015784938059,
        lng: 127.036157208818,
        distance: 241.5909005595001,
        facilityTypeId: 3
      },
      {
        facilityId: 24151,
        facilityName: '강남박치과의원',
        districtId: 3120197,
        lat: 37.5015784938059,
        lng: 127.036157208818,
        distance: 241.5909005595001,
        facilityTypeId: 5
      },
      {
        facilityId: 24180,
        facilityName: '유안과의원',
        districtId: 3120197,
        lat: 37.5015784938059,
        lng: 127.036157208818,
        distance: 241.5909005595001,
        facilityTypeId: 5
      },
      {
        facilityId: 35060,
        facilityName: '알앤비성형외과의원',
        districtId: 3120197,
        lat: 37.5014432260166,
        lng: 127.040146004168,
        distance: 247.29767290778702,
        facilityTypeId: 5
      },
      {
        facilityId: 38437,
        facilityName: '이-믿음치과의원',
        districtId: 3120197,
        lat: 37.5014432260166,
        lng: 127.040146004168,
        distance: 247.29767290778702,
        facilityTypeId: 5
      },
      {
        facilityId: 18974,
        facilityName: '수온누리약국',
        districtId: 3120197,
        lat: 37.501434,
        lng: 127.0401789,
        distance: 250.29331767080674,
        facilityTypeId: 2
      },
      {
        facilityId: 24238,
        facilityName: '자연주의의원',
        districtId: 3120197,
        lat: 37.4990093624,
        lng: 127.0364596116,
        distance: 252.68598032452653,
        facilityTypeId: 5
      },
      {
        facilityId: 29358,
        facilityName: '미녀사랑산부인과의원',
        districtId: 3120197,
        lat: 37.4990093624,
        lng: 127.0364596116,
        distance: 252.68598032452653,
        facilityTypeId: 5
      },
      {
        facilityId: 31157,
        facilityName: '살롬치과의원',
        districtId: 3120197,
        lat: 37.5012978108444,
        lng: 127.03592625357,
        distance: 253.35882295382447,
        facilityTypeId: 5
      },
      {
        facilityId: 27046,
        facilityName: '닥터세비앙의원',
        districtId: 3110969,
        lat: 37.4995523823,
        lng: 127.0401239573,
        distance: 253.6979090323868,
        facilityTypeId: 5
      },
      {
        facilityId: 26724,
        facilityName: '뉴연세의원',
        districtId: 3120197,
        lat: 37.4988193799338,
        lng: 127.036622252659,
        distance: 255.89965424863053,
        facilityTypeId: 5
      },
      {
        facilityId: 17588,
        facilityName: '역삼생생약국',
        districtId: 3120197,
        lat: 37.4988038,
        lng: 127.0366283,
        distance: 256.8083467289112,
        facilityTypeId: 2
      },
      {
        facilityId: 32597,
        facilityName: '서울유러치과의원',
        districtId: 3120197,
        lat: 37.49913748568422,
        lng: 127.03623491749195,
        distance: 262.182289195606,
        facilityTypeId: 5
      },
      {
        facilityId: 27577,
        facilityName: '대들보의원',
        districtId: 3120197,
        lat: 37.4991067336713,
        lng: 127.03625610009288,
        distance: 262.4665587385094,
        facilityTypeId: 5
      },
      {
        facilityId: 18457,
        facilityName: '팜스약국',
        districtId: 3120197,
        lat: 37.5019299,
        lng: 127.036116,
        distance: 265.4690049009873,
        facilityTypeId: 2
      },
      {
        facilityId: 39397,
        facilityName: '초아재식치한의원',
        districtId: 3120197,
        lat: 37.501930623903554,
        lng: 127.036091453386,
        distance: 267.77739508897963,
        facilityTypeId: 5
      },
      {
        facilityId: 32109,
        facilityName: '서울배내과의원',
        districtId: 3120197,
        lat: 37.5019323393,
        lng: 127.0360900894,
        distance: 268.00957751793055,
        facilityTypeId: 5
      },
      {
        facilityId: 22950,
        facilityName: '강남재활의학과의원',
        districtId: 3120197,
        lat: 37.5019323393195,
        lng: 127.03609008939355,
        distance: 268.0095793214916,
        facilityTypeId: 5
      },
      {
        facilityId: 35669,
        facilityName: '연세강남비뇨기과의원',
        districtId: 3120197,
        lat: 37.501931889086,
        lng: 127.036089184436,
        distance: 268.06530187130545,
        facilityTypeId: 5
      },
      {
        facilityId: 41420,
        facilityName: '본디한의원',
        districtId: 3120197,
        lat: 37.501931889086,
        lng: 127.036089184436,
        distance: 268.06530187130545,
        facilityTypeId: 5
      },
      {
        facilityId: 42945,
        facilityName: '헵시바치과의원',
        districtId: 3120197,
        lat: 37.501931889086,
        lng: 127.036089184436,
        distance: 268.06530187130545,
        facilityTypeId: 5
      },
      {
        facilityId: 16252,
        facilityName: '역삼오늘약국',
        districtId: 3120197,
        lat: 37.4996461,
        lng: 127.0358567,
        distance: 269.8246508073251,
        facilityTypeId: 2
      },
      {
        facilityId: 21369,
        facilityName: '신한은행',
        districtId: 3120197,
        lat: 37.5008485547307,
        lng: 127.035677012169,
        distance: 270.0779002772271,
        facilityTypeId: 3
      },
      {
        facilityId: 21370,
        facilityName: '신한은행',
        districtId: 3120197,
        lat: 37.5008485547307,
        lng: 127.035677012169,
        distance: 270.0779002772271,
        facilityTypeId: 3
      },
      {
        facilityId: 59189,
        facilityName: '영동중앙교회',
        districtId: 3120197,
        lat: 37.49815395,
        lng: 127.0379751,
        distance: 271.2110345952068,
        facilityTypeId: 11
      },
      {
        facilityId: 24283,
        facilityName: 'SKY(스카이)치과의원',
        districtId: 3120197,
        lat: 37.4996347605088,
        lng: 127.035838830564,
        distance: 272.14593533294953,
        facilityTypeId: 5
      },
      {
        facilityId: 29711,
        facilityName: '민이비인후과의원',
        districtId: 3120197,
        lat: 37.4996347605088,
        lng: 127.035838830564,
        distance: 272.14593533294953,
        facilityTypeId: 5
      },
      {
        facilityId: 36003,
        facilityName: '연세베러의원',
        districtId: 3120197,
        lat: 37.4996347605088,
        lng: 127.035838830564,
        distance: 272.14593533294953,
        facilityTypeId: 5
      },
      {
        facilityId: 27085,
        facilityName: '네오비뇨기과의원',
        districtId: 3120197,
        lat: 37.49963855733324,
        lng: 127.03583707912962,
        distance: 272.1608168311563,
        facilityTypeId: 5
      },
      {
        facilityId: 37218,
        facilityName: '오에프피구강내과치과의원',
        districtId: 3120197,
        lat: 37.4981079801273,
        lng: 127.03793959219,
        distance: 276.53090180441643,
        facilityTypeId: 5
      },
      {
        facilityId: 24804,
        facilityName: '경희시은한의원',
        districtId: 3110967,
        lat: 37.5030753167917,
        lng: 127.037656203305,
        distance: 280.55120790901043,
        facilityTypeId: 5
      },
      {
        facilityId: 35623,
        facilityName: '역삼생생본의원?한의원',
        districtId: 3120197,
        lat: 37.5018629312153,
        lng: 127.035894971552,
        distance: 282.3393706541204,
        facilityTypeId: 5
      },
      {
        facilityId: 36564,
        facilityName: '연세케이치과의원',
        districtId: 3120197,
        lat: 37.50163099585,
        lng: 127.03565182565,
        distance: 294.995848283635,
        facilityTypeId: 5
      },
      {
        facilityId: 18216,
        facilityName: '다정온누리약국',
        districtId: 3120197,
        lat: 37.5022404,
        lng: 127.0360084,
        distance: 295.5563461865024,
        facilityTypeId: 2
      },
      {
        facilityId: 21368,
        facilityName: '신한은행',
        districtId: 3120197,
        lat: 37.5000192358695,
        lng: 127.035487192435,
        distance: 296.5290139426586,
        facilityTypeId: 3
      },
      {
        facilityId: 41656,
        facilityName: '투데이치과의원',
        districtId: 3120197,
        lat: 37.5000192358695,
        lng: 127.035487192435,
        distance: 296.5290139426586,
        facilityTypeId: 5
      },
      {
        facilityId: 43247,
        facilityName: '화이팅정형외과의원',
        districtId: 3120197,
        lat: 37.5000192358695,
        lng: 127.035487192435,
        distance: 296.5290139426586,
        facilityTypeId: 5
      },
      {
        facilityId: 16012,
        facilityName: '역삼우주약국',
        districtId: 3120197,
        lat: 37.5009284,
        lng: 127.0407513,
        distance: 298.07154703054294,
        facilityTypeId: 2
      },
      {
        facilityId: 32408,
        facilityName: '서울알파정신건강의학과의원',
        districtId: 3120197,
        lat: 37.5022305219782,
        lng: 127.03595938434,
        distance: 299.1772152228789,
        facilityTypeId: 5
      },
      {
        facilityId: 35896,
        facilityName: '연세맑은이비인후과의원',
        districtId: 3120197,
        lat: 37.5022305219782,
        lng: 127.03595938434,
        distance: 299.1772152228789,
        facilityTypeId: 5
      },
      {
        facilityId: 42909,
        facilityName: '허브한의원',
        districtId: 3120197,
        lat: 37.5021681398693,
        lng: 127.035769697653,
        distance: 312.20750046490167,
        facilityTypeId: 5
      },
      {
        facilityId: 35858,
        facilityName: '연세라인업의원',
        districtId: 3120197,
        lat: 37.5016580838661,
        lng: 127.040765750902,
        distance: 320.1331877060082,
        facilityTypeId: 5
      },
      {
        facilityId: 18846,
        facilityName: '행복한약국',
        districtId: 3120197,
        lat: 37.5016641,
        lng: 127.040788,
        distance: 322.67896247436386,
        facilityTypeId: 2
      },
      {
        facilityId: 59204,
        facilityName: '영동중앙교회',
        districtId: 3120198,
        lat: 37.49771852,
        lng: 127.0385755,
        distance: 323.80895813624574,
        facilityTypeId: 11
      },
      {
        facilityId: 22853,
        facilityName: '강남선이고은한의원',
        districtId: 3120197,
        lat: 37.502117926786,
        lng: 127.035560904371,
        distance: 328.74817160752644,
        facilityTypeId: 5
      },
      {
        facilityId: 38708,
        facilityName: '이손치과의원',
        districtId: 3120197,
        lat: 37.502117926786,
        lng: 127.035560904371,
        distance: 328.74817160752644,
        facilityTypeId: 5
      },
      {
        facilityId: 59183,
        facilityName: '역삼역',
        districtId: 3120197,
        lat: 37.50044184,
        lng: 127.0350786,
        distance: 335.49197245188236,
        facilityTypeId: 11
      },
      {
        facilityId: 30119,
        facilityName: '배독생기한의원',
        districtId: 3120197,
        lat: 37.501152443128895,
        lng: 127.0351139931288,
        distance: 337.0004362612948,
        facilityTypeId: 5
      },
      {
        facilityId: 22108,
        facilityName: '중소기업은행',
        districtId: 3120198,
        lat: 37.4976383700968,
        lng: 127.038788857039,
        distance: 337.24859013233663,
        facilityTypeId: 3
      },
      {
        facilityId: 33564,
        facilityName: '세이프플란트치과의원',
        districtId: 3120197,
        lat: 37.5009488414146,
        lng: 127.035059356588,
        distance: 339.5756989270001,
        facilityTypeId: 5
      },
      {
        facilityId: 39136,
        facilityName: '이현택성형외과의원',
        districtId: 3120197,
        lat: 37.5025423512988,
        lng: 127.035691163133,
        distance: 344.0832664387571,
        facilityTypeId: 5
      },
      {
        facilityId: 29757,
        facilityName: '바노바기성형외과의원',
        districtId: 3120197,
        lat: 37.5026720963033,
        lng: 127.035690546332,
        distance: 353.4138909230966,
        facilityTypeId: 5
      },
      {
        facilityId: 27315,
        facilityName: '대화당한의원',
        districtId: 3120197,
        lat: 37.5014292675569,
        lng: 127.035026332238,
        distance: 353.4351281326451,
        facilityTypeId: 5
      },
      {
        facilityId: 22344,
        facilityName: '하나은행',
        districtId: 3120198,
        lat: 37.4973502733284,
        lng: 127.038096510953,
        distance: 360.2639801238747,
        facilityTypeId: 3
      },
      {
        facilityId: 59477,
        facilityName: '역삼역',
        districtId: 3120197,
        lat: 37.50037703,
        lng: 127.0348445,
        distance: 361.89398370941575,
        facilityTypeId: 11
      },
      {
        facilityId: 59476,
        facilityName: '역삼역',
        districtId: 3120197,
        lat: 37.4998688,
        lng: 127.0348816,
        distance: 365.89285775138893,
        facilityTypeId: 11
      },
      {
        facilityId: 34060,
        facilityName: '수피부과의원',
        districtId: 3120197,
        lat: 37.50289114659643,
        lng: 127.03563817499725,
        distance: 374.05348737848533,
        facilityTypeId: 5
      },
      {
        facilityId: 40838,
        facilityName: '청구경희한의원',
        districtId: 3120197,
        lat: 37.5025524582,
        lng: 127.0353394473,
        distance: 375.8909785963951,
        facilityTypeId: 5
      },
      {
        facilityId: 34197,
        facilityName: '스타치과의원',
        districtId: 3120197,
        lat: 37.4976435422673,
        lng: 127.03640964207,
        distance: 377.30114314581436,
        facilityTypeId: 5
      },
      {
        facilityId: 29758,
        facilityName: '바노바기일레븐치과의원',
        districtId: 3120197,
        lat: 37.5027829855249,
        lng: 127.03547300662,
        distance: 379.8242569531102,
        facilityTypeId: 5
      },
      {
        facilityId: 15734,
        facilityName: '역삼다인약국',
        districtId: 3120197,
        lat: 37.502783,
        lng: 127.035473,
        distance: 379.825854616703,
        facilityTypeId: 2
      },
      {
        facilityId: 40586,
        facilityName: '진심정신건강의학과의원',
        districtId: 3120197,
        lat: 37.50054881854711,
        lng: 127.03467353114183,
        distance: 380.1556129841331,
        facilityTypeId: 5
      },
      {
        facilityId: 40486,
        facilityName: '지세븐의원',
        districtId: 3120197,
        lat: 37.5005328741212,
        lng: 127.034661988546,
        distance: 381.46450521046194,
        facilityTypeId: 5
      },
      {
        facilityId: 41658,
        facilityName: '투명피부과의원',
        districtId: 3120197,
        lat: 37.5005328741212,
        lng: 127.034661988546,
        distance: 381.46450521046194,
        facilityTypeId: 5
      },
      {
        facilityId: 40487,
        facilityName: '지세븐한의원',
        districtId: 3120197,
        lat: 37.50053440643554,
        lng: 127.03465995362689,
        distance: 381.6879389942003,
        facilityTypeId: 5
      },
      {
        facilityId: 29284,
        facilityName: '문동언마취통증의학과의원',
        districtId: 3120197,
        lat: 37.503445606475,
        lng: 127.035997853857,
        distance: 393.7498485880762,
        facilityTypeId: 5
      },
      {
        facilityId: 17542,
        facilityName: '바로여기약국',
        districtId: 3120197,
        lat: 37.5034456,
        lng: 127.0359978,
        distance: 393.75280981564754,
        facilityTypeId: 2
      },
      {
        facilityId: 23169,
        facilityName: '바노바기피부과의원',
        districtId: 3120197,
        lat: 37.5030750007,
        lng: 127.0354754067,
        distance: 401.24786770205066,
        facilityTypeId: 5
      },
      {
        facilityId: 34158,
        facilityName: '스마트정형외과의원',
        districtId: 3120197,
        lat: 37.5004396757708,
        lng: 127.034471388344,
        distance: 402.95279818701556,
        facilityTypeId: 5
      },
      {
        facilityId: 34228,
        facilityName: '시그니처피부과의원',
        districtId: 3120197,
        lat: 37.5004396757708,
        lng: 127.034471388344,
        distance: 402.95279818701556,
        facilityTypeId: 5
      },
      {
        facilityId: 22772,
        facilityName: '강남이조은안과의원',
        districtId: 3120197,
        lat: 37.500440757413976,
        lng: 127.03446991866818,
        distance: 403.11110192355227,
        facilityTypeId: 5
      },
      {
        facilityId: 35468,
        facilityName: '에이펙스성형외과의원',
        districtId: 3120197,
        lat: 37.500440757413976,
        lng: 127.03446991866818,
        distance: 403.11110192355227,
        facilityTypeId: 5
      },
      {
        facilityId: 28288,
        facilityName: '루미나산부인과의원',
        districtId: 3120197,
        lat: 37.500448873889006,
        lng: 127.03444447708333,
        distance: 405.90174794583925,
        facilityTypeId: 5
      },
      {
        facilityId: 15777,
        facilityName: '강남제일약국',
        districtId: 3120197,
        lat: 37.5004008,
        lng: 127.0343432,
        distance: 417.3905961239612,
        facilityTypeId: 2
      },
      {
        facilityId: 42335,
        facilityName: '하임치과의원',
        districtId: 3110967,
        lat: 37.5044320180235,
        lng: 127.038318724253,
        distance: 427.93355339778026,
        facilityTypeId: 5
      },
      {
        facilityId: 15868,
        facilityName: '올리브온누리약국',
        districtId: 3120197,
        lat: 37.4990028,
        lng: 127.0345782,
        distance: 428.74767560152657,
        facilityTypeId: 2
      },
      {
        facilityId: 33980,
        facilityName: '신원형정형외과의원',
        districtId: 3120198,
        lat: 37.496898489122685,
        lng: 127.0392192994341,
        distance: 429.2084907861139,
        facilityTypeId: 5
      },
      {
        facilityId: 17276,
        facilityName: '경희자연한약국',
        districtId: 3120197,
        lat: 37.5010881,
        lng: 127.0342169,
        distance: 434.4449903579165,
        facilityTypeId: 2
      },
      {
        facilityId: 40005,
        facilityName: '제이준성형외과의원',
        districtId: 3120197,
        lat: 37.50382451977303,
        lng: 127.035864809421,
        distance: 436.6672773013966,
        facilityTypeId: 5
      },
      {
        facilityId: 43610,
        facilityName: '일반극장/영화관',
        districtId: 3120206,
        lat: 37.4997941579709,
        lng: 127.041964676732,
        distance: 439.6146527031258,
        facilityTypeId: 7
      },
      {
        facilityId: 29686,
        facilityName: '미형치과의원',
        districtId: 3120197,
        lat: 37.5031273933305,
        lng: 127.0350254291,
        distance: 442.57594151012285,
        facilityTypeId: 5
      },
      {
        facilityId: 34212,
        facilityName: '스토리피부과의원',
        districtId: 3120204,
        lat: 37.5028813541774,
        lng: 127.041356540268,
        distance: 443.4709448205498,
        facilityTypeId: 5
      },
      {
        facilityId: 18844,
        facilityName: '역삼센터약국',
        districtId: 3120204,
        lat: 37.5028813,
        lng: 127.0413566,
        distance: 443.4729206183587,
        facilityTypeId: 2
      },
      {
        facilityId: 16883,
        facilityName: '신혜성약국',
        districtId: 3120198,
        lat: 37.4965317,
        lng: 127.0386103,
        distance: 454.9486521285206,
        facilityTypeId: 2
      },
      {
        facilityId: 21116,
        facilityName: '농협은행',
        districtId: 3120197,
        lat: 37.5003740376418,
        lng: 127.034004521906,
        distance: 455.1533518796582,
        facilityTypeId: 3
      },
      {
        facilityId: 29265,
        facilityName: '무지개의원',
        districtId: 3120198,
        lat: 37.4965219054,
        lng: 127.0385979586,
        distance: 455.85764910239385,
        facilityTypeId: 5
      },
      {
        facilityId: 35491,
        facilityName: '엔슬림의원',
        districtId: 3120197,
        lat: 37.499069601677135,
        lng: 127.03415860313068,
        distance: 468.9294583506054,
        facilityTypeId: 5
      },
      {
        facilityId: 35813,
        facilityName: '연세더맑은내과의원',
        districtId: 3120197,
        lat: 37.499085739,
        lng: 127.0341436017,
        distance: 469.8438341278989,
        facilityTypeId: 5
      },
      {
        facilityId: 32701,
        facilityName: '서울정석정형외과의원',
        districtId: 3120197,
        lat: 37.4990862800943,
        lng: 127.034141792509,
        distance: 470.0104183795101,
        facilityTypeId: 5
      },
      {
        facilityId: 35814,
        facilityName: '연세더맑은내과의원',
        districtId: 3120197,
        lat: 37.4990862800943,
        lng: 127.034141792509,
        distance: 470.0104183795101,
        facilityTypeId: 5
      },
      {
        facilityId: 60684,
        facilityName: '역삼경남',
        districtId: null,
        lat: 37.5005747,
        lng: 127.0423208,
        distance: 470.2134552140061,
        facilityTypeId: 12
      },
      {
        facilityId: 40746,
        facilityName: '참진한의원',
        districtId: 3120197,
        lat: 37.4980332123,
        lng: 127.034663321,
        distance: 475.60678555381514,
        facilityTypeId: 5
      },
      {
        facilityId: 48677,
        facilityName: '르네상스서울호텔',
        districtId: 3120204,
        lat: 37.50258425,
        lng: 127.0418761,
        distance: 475.60912363190596,
        facilityTypeId: 11
      },
      {
        facilityId: 21010,
        facilityName: '국민은행',
        districtId: 3120197,
        lat: 37.5037561676647,
        lng: 127.035151484787,
        distance: 480.4675229180261,
        facilityTypeId: 3
      },
      {
        facilityId: 24415,
        facilityName: '조규홍비뇨기과의원',
        districtId: 3120198,
        lat: 37.4962263345506,
        lng: 127.038722085697,
        distance: 490.2703893404005,
        facilityTypeId: 5
      },
      {
        facilityId: 59188,
        facilityName: '역삼역.포스코타워역삼',
        districtId: 3120197,
        lat: 37.49957175,
        lng: 127.03379,
        distance: 491.59389749129855,
        facilityTypeId: 11
      },
      {
        facilityId: 21335,
        facilityName: '수협은행',
        districtId: 3120197,
        lat: 37.4993753300832,
        lng: 127.033803449711,
        distance: 495.64078578479433,
        facilityTypeId: 3
      },
      {
        facilityId: 31804,
        facilityName: '서울광혜내과의원',
        districtId: 3120197,
        lat: 37.5043691746251,
        lng: 127.035576561541,
        distance: 504.78835148623904,
        facilityTypeId: 5
      },
      {
        facilityId: 41170,
        facilityName: '청연한의원',
        districtId: 3120198,
        lat: 37.4962152898,
        lng: 127.039425575,
        distance: 508.5636142595731,
        facilityTypeId: 5
      },
      {
        facilityId: 35116,
        facilityName: '압구정탑라인의원',
        districtId: 3120204,
        lat: 37.5021271846012,
        lng: 127.042450975898,
        distance: 513.9341089754801,
        facilityTypeId: 5
      },
      {
        facilityId: 38962,
        facilityName: '이종복치과의원',
        districtId: 3120204,
        lat: 37.5014764820153,
        lng: 127.042690475293,
        distance: 520.7269228080816,
        facilityTypeId: 5
      },
      {
        facilityId: 34195,
        facilityName: '스타일치과의원',
        districtId: 3120198,
        lat: 37.495927321591,
        lng: 127.038901507867,
        distance: 526.242319194931,
        facilityTypeId: 5
      },
      {
        facilityId: 23829,
        facilityName: '강남대중한의원',
        districtId: 3120198,
        lat: 37.49592714165755,
        lng: 127.03890071618925,
        distance: 526.2469841391523,
        facilityTypeId: 5
      },
      {
        facilityId: 59203,
        facilityName: '총지사',
        districtId: 3120198,
        lat: 37.4966905,
        lng: 127.0408425,
        distance: 530.62692358572,
        facilityTypeId: 11
      },
      {
        facilityId: 34426,
        facilityName: '신소애여성의원',
        districtId: 3120197,
        lat: 37.5042573629887,
        lng: 127.034962510098,
        distance: 536.0754350753309,
        facilityTypeId: 5
      },
      {
        facilityId: 17552,
        facilityName: '537약국',
        districtId: 3120197,
        lat: 37.5042574,
        lng: 127.0349625,
        distance: 536.079294443915,
        facilityTypeId: 2
      },
      {
        facilityId: 21011,
        facilityName: '국민은행',
        districtId: 3120198,
        lat: 37.4957639992118,
        lng: 127.038257414174,
        distance: 536.9641299659897,
        facilityTypeId: 3
      },
      {
        facilityId: 61671,
        facilityName: '대우디오빌역삼',
        districtId: 3120204,
        lat: 37.5015202,
        lng: 127.0429002,
        distance: 544.5459451472656,
        facilityTypeId: 12
      },
      {
        facilityId: 25813,
        facilityName: '김민정한의원',
        districtId: 3120197,
        lat: 37.49883363603188,
        lng: 127.03351924191664,
        distance: 544.7028467381595,
        facilityTypeId: 5
      },
      {
        facilityId: 59202,
        facilityName: '총지사',
        districtId: 3120198,
        lat: 37.49619328,
        lng: 127.0402858,
        distance: 546.3876685272215,
        facilityTypeId: 11
      },
      {
        facilityId: 33132,
        facilityName: '석현재한의원',
        districtId: 3120198,
        lat: 37.4961762230558,
        lng: 127.040383148468,
        distance: 552.9880126044244,
        facilityTypeId: 5
      },
      {
        facilityId: 34160,
        facilityName: '스마트페이스한의원',
        districtId: 3120198,
        lat: 37.49633649553133,
        lng: 127.040674107557,
        distance: 553.3084287137035,
        facilityTypeId: 5
      },
      {
        facilityId: 22156,
        facilityName: '중소기업은행',
        districtId: 3120197,
        lat: 37.4993192768461,
        lng: 127.033205638158,
        distance: 561.4274530493694,
        facilityTypeId: 3
      },
      {
        facilityId: 35221,
        facilityName: '에스엠지신라메디컬갤러리의원',
        districtId: 3120204,
        lat: 37.5042815416175,
        lng: 127.04154245088,
        distance: 561.8475956631361,
        facilityTypeId: 5
      },
      {
        facilityId: 834,
        facilityName: '서울역삼한라우편취급국',
        districtId: 3120194,
        lat: 37.50500369996239,
        lng: 127.03562890043776,
        distance: 562.017129125133,
        facilityTypeId: 1
      },
      {
        facilityId: 33545,
        facilityName: '세연내과의원',
        districtId: 3120198,
        lat: 37.4957744487635,
        lng: 127.039630476234,
        distance: 562.1461152992484,
        facilityTypeId: 5
      },
      {
        facilityId: 16354,
        facilityName: '역삼이화약국',
        districtId: 3120198,
        lat: 37.495772,
        lng: 127.0396503,
        distance: 563.0798694004907,
        facilityTypeId: 2
      },
      {
        facilityId: 35625,
        facilityName: '역삼연치과의원',
        districtId: 3120198,
        lat: 37.4957647169,
        lng: 127.0396334113,
        distance: 563.2762440944088,
        facilityTypeId: 5
      },
      {
        facilityId: 38331,
        facilityName: '은혜산부인과의원',
        districtId: 3120198,
        lat: 37.4957647169,
        lng: 127.0396334113,
        distance: 563.2762440944088,
        facilityTypeId: 5
      },
      {
        facilityId: 33006,
        facilityName: '서울혜치과의원',
        districtId: 3120197,
        lat: 37.5000818732753,
        lng: 127.032937953168,
        distance: 575.8959159824984,
        facilityTypeId: 5
      },
      {
        facilityId: 835,
        facilityName: '서울역삼1동우체국',
        districtId: 3120197,
        lat: 37.5000799002642,
        lng: 127.03293269963808,
        distance: 576.4988169566351,
        facilityTypeId: 1
      },
      {
        facilityId: 43494,
        facilityName: '비디오/DVD감상실',
        districtId: 3120194,
        lat: 37.5046956565348,
        lng: 127.034791349597,
        distance: 585.7531238196964,
        facilityTypeId: 7
      },
      {
        facilityId: 827,
        facilityName: '서울역삼2동우체국',
        districtId: 3120206,
        lat: 37.49770719967174,
        lng: 127.04253079959776,
        distance: 588.5330343621242,
        facilityTypeId: 1
      },
      {
        facilityId: 59556,
        facilityName: '역삼아르누보&조선팰리스강남',
        districtId: 3120204,
        lat: 37.50327145,
        lng: 127.042679,
        distance: 590.787240859552,
        facilityTypeId: 11
      },
      {
        facilityId: 59179,
        facilityName: 'KT강남지사',
        districtId: 3120204,
        lat: 37.50475785,
        lng: 127.0414645,
        distance: 596.1378338496703,
        facilityTypeId: 11
      },
      {
        facilityId: 39650,
        facilityName: '재단법인한국희귀의약품센터',
        districtId: 3120204,
        lat: 37.50374331550802,
        lng: 127.04254361720744,
        distance: 606.580118100621,
        facilityTypeId: 5
      },
      {
        facilityId: 33765,
        facilityName: '소화의원',
        districtId: 3120206,
        lat: 37.49787036103787,
        lng: 127.04282947703274,
        distance: 607.4165180692016,
        facilityTypeId: 5
      },
      {
        facilityId: 19274,
        facilityName: '아로마약국',
        districtId: 3120206,
        lat: 37.497866,
        lng: 127.0428326,
        distance: 607.9591672747374,
        facilityTypeId: 2
      },
      {
        facilityId: 42363,
        facilityName: '한가람신경외과의원',
        districtId: 3120194,
        lat: 37.5052563169378,
        lng: 127.035234410054,
        distance: 608.4209893192462,
        facilityTypeId: 5
      },
      {
        facilityId: 30202,
        facilityName: '발머스한의원',
        districtId: 3120197,
        lat: 37.4989960052,
        lng: 127.0328498329,
        distance: 609.2717063230396,
        facilityTypeId: 5
      },
      {
        facilityId: 28812,
        facilityName: '만수무강한의원',
        districtId: 3120197,
        lat: 37.5003206503484,
        lng: 127.032575265012,
        distance: 614.1762520896364,
        facilityTypeId: 5
      },
      {
        facilityId: 28938,
        facilityName: '메티스정신과의원',
        districtId: 3120206,
        lat: 37.4998324451943,
        lng: 127.043598551589,
        distance: 618.060195366112,
        facilityTypeId: 5
      },
      {
        facilityId: 33650,
        facilityName: '셀피아의료생활협동조합셀피아의원',
        districtId: 3120206,
        lat: 37.4998324451943,
        lng: 127.043598551589,
        distance: 618.060195366112,
        facilityTypeId: 5
      },
      {
        facilityId: 42172,
        facilityName: '하나이비인후과병원',
        districtId: 3120206,
        lat: 37.49791875702645,
        lng: 127.04297286239044,
        distance: 618.6925080219243,
        facilityTypeId: 5
      },
      {
        facilityId: 32558,
        facilityName: '선이고은한의원',
        districtId: 3120206,
        lat: 37.49970250190122,
        lng: 127.0436478960029,
        distance: 625.6127272957913,
        facilityTypeId: 5
      },
      {
        facilityId: 62865,
        facilityName: '역삼자이아파트',
        districtId: 3110965,
        lat: 37.505881731,
        lng: 127.040128519,
        distance: 630.4599870738273,
        facilityTypeId: 12
      },
      {
        facilityId: 22790,
        facilityName: '네오의원',
        districtId: 3110958,
        lat: 37.50436035425509,
        lng: 127.0338351918636,
        distance: 632.3010570762517,
        facilityTypeId: 5
      },
      {
        facilityId: 34625,
        facilityName: '씨앤씨치과의원',
        districtId: 3130306,
        lat: 37.5043791085869,
        lng: 127.042337345165,
        distance: 632.717477651751,
        facilityTypeId: 5
      },
      {
        facilityId: 24095,
        facilityName: '강남미의원',
        districtId: 3120197,
        lat: 37.4991294255,
        lng: 127.03259205,
        distance: 632.7807634749835,
        facilityTypeId: 5
      },
      {
        facilityId: 24119,
        facilityName: '강남미의원',
        districtId: 3120197,
        lat: 37.4991297862601,
        lng: 127.032590806228,
        distance: 632.9041377810405,
        facilityTypeId: 5
      },
      {
        facilityId: 59178,
        facilityName: 'KT강남지사',
        districtId: 3130306,
        lat: 37.50475497,
        lng: 127.0419791,
        distance: 633.461023293694,
        facilityTypeId: 11
      },
      {
        facilityId: 35728,
        facilityName: '연세기쁜내과의원',
        districtId: 3120206,
        lat: 37.497951665782,
        lng: 127.043159587099,
        distance: 635.2854444446452,
        facilityTypeId: 5
      },
      {
        facilityId: 19549,
        facilityName: '밝은약국',
        districtId: 3120206,
        lat: 37.4979648,
        lng: 127.0431669,
        distance: 635.3344093957825,
        facilityTypeId: 2
      },
      {
        facilityId: 59199,
        facilityName: '역삼동성당.역삼자이아파트',
        districtId: 3120206,
        lat: 37.49987934,
        lng: 127.0437951,
        distance: 639.0523883443601,
        facilityTypeId: 11
      },
      {
        facilityId: 29760,
        facilityName: '바닐라치과의원',
        districtId: 3130306,
        lat: 37.5046365753833,
        lng: 127.042198834116,
        distance: 641.0699755843107,
        facilityTypeId: 5
      },
      {
        facilityId: 41275,
        facilityName: '친한의사의원',
        districtId: 3120199,
        lat: 37.5057136517872,
        lng: 127.040875851757,
        distance: 648.3634666807267,
        facilityTypeId: 5
      },
      {
        facilityId: 21082,
        facilityName: '국민은행',
        districtId: 3120204,
        lat: 37.5039660612952,
        lng: 127.042909941112,
        distance: 654.1445296693789,
        facilityTypeId: 3
      },
      {
        facilityId: 31964,
        facilityName: '서울리더스치과의원',
        districtId: 3120204,
        lat: 37.5039660612952,
        lng: 127.042909941112,
        distance: 654.1445296693789,
        facilityTypeId: 5
      },
      {
        facilityId: 830,
        facilityName: '서울상록회관우체국',
        districtId: 3120204,
        lat: 37.50397270005708,
        lng: 127.042925799608,
        distance: 656.0124149515657,
        facilityTypeId: 1
      },
      {
        facilityId: 59391,
        facilityName: '총지사',
        districtId: 3120198,
        lat: 37.4948581,
        lng: 127.0395195,
        distance: 656.8457329345041,
        facilityTypeId: 11
      },
      {
        facilityId: 19085,
        facilityName: '상록약국',
        districtId: 3120204,
        lat: 37.5039782,
        lng: 127.0429336,
        distance: 657.073697320409,
        facilityTypeId: 2
      },
      {
        facilityId: 59213,
        facilityName: '총지사',
        districtId: 3120198,
        lat: 37.49494269,
        lng: 127.0398633,
        distance: 658.1346273211938,
        facilityTypeId: 11
      },
      {
        facilityId: 28442,
        facilityName: '리더스헬스케어영상의학과의원',
        districtId: 3120204,
        lat: 37.50410165239997,
        lng: 127.04287362428062,
        distance: 659.6523055887446,
        facilityTypeId: 5
      },
      {
        facilityId: 22177,
        facilityName: '하나은행',
        districtId: 3120197,
        lat: 37.4990121815329,
        lng: 127.032348181084,
        distance: 662.3596610712287,
        facilityTypeId: 3
      },
      {
        facilityId: 23758,
        facilityName: '강남약손한의원',
        districtId: 3120206,
        lat: 37.4991834101,
        lng: 127.0439506707,
        distance: 669.9617184973204,
        facilityTypeId: 5
      },
      {
        facilityId: 59392,
        facilityName: '신한은행데이터센터',
        districtId: 3120206,
        lat: 37.49807901,
        lng: 127.0436142,
        distance: 674.5391851344339,
        facilityTypeId: 11
      },
      {
        facilityId: 35364,
        facilityName: '에스앤유피부과의원',
        districtId: 3110958,
        lat: 37.5028163887,
        lng: 127.03242175,
        distance: 677.3663657481957,
        facilityTypeId: 5
      },
      {
        facilityId: 20805,
        facilityName: '국민은행',
        districtId: 3120197,
        lat: 37.4996994615351,
        lng: 127.032045172427,
        distance: 679.6438890606133,
        facilityTypeId: 3
      },
      {
        facilityId: 59168,
        facilityName: '차병원',
        districtId: 3120194,
        lat: 37.50553234,
        lng: 127.0344861,
        distance: 680.2733779638223,
        facilityTypeId: 11
      },
      {
        facilityId: 59198,
        facilityName: '역삼자이아파트',
        districtId: 3120206,
        lat: 37.49980414,
        lng: 127.0442567,
        distance: 691.0228773185756,
        facilityTypeId: 11
      },
      {
        facilityId: 33643,
        facilityName: '센트럴흉부외과의원',
        districtId: 3120198,
        lat: 37.49489386799999,
        lng: 127.03546249,
        distance: 697.6371730710582,
        facilityTypeId: 5
      },
      {
        facilityId: 17874,
        facilityName: '아름다운우리약국',
        districtId: 3120198,
        lat: 37.4944701,
        lng: 127.0396202,
        distance: 701.4167345780246,
        facilityTypeId: 2
      },
      {
        facilityId: 35624,
        facilityName: '역삼성모내과의원',
        districtId: 3120198,
        lat: 37.4944617806227,
        lng: 127.03960456549,
        distance: 701.8957108334313,
        facilityTypeId: 5
      },
      {
        facilityId: 42827,
        facilityName: '행복드림치과의원',
        districtId: 3120198,
        lat: 37.4944617806227,
        lng: 127.03960456549,
        distance: 701.8957108334313,
        facilityTypeId: 5
      },
      {
        facilityId: 62509,
        facilityName: '한화진넥스빌',
        districtId: null,
        lat: 37.501959,
        lng: 127.0442572,
        distance: 702.2214848072911,
        facilityTypeId: 12
      },
      {
        facilityId: 22160,
        facilityName: '중소기업은행',
        districtId: 3120204,
        lat: 37.5033406241505,
        lng: 127.043780751267,
        distance: 702.6044726056477,
        facilityTypeId: 3
      },
      {
        facilityId: 34613,
        facilityName: '쎌치과의원',
        districtId: 3120198,
        lat: 37.494436154745,
        lng: 127.036649061064,
        distance: 702.8600184149415,
        facilityTypeId: 5
      },
      {
        facilityId: 41789,
        facilityName: '파크에비뉴치과의원',
        districtId: 3120194,
        lat: 37.5061114959102,
        lng: 127.03481272712,
        distance: 714.0675470677462,
        facilityTypeId: 5
      },
      {
        facilityId: 42921,
        facilityName: '허정민치과교정과치과의원',
        districtId: 3120194,
        lat: 37.5061114959102,
        lng: 127.03481272712,
        distance: 714.0675470677462,
        facilityTypeId: 5
      },
      {
        facilityId: 18848,
        facilityName: '라라약국',
        districtId: 3120197,
        lat: 37.4996098,
        lng: 127.0316927,
        distance: 719.8835451401364,
        facilityTypeId: 2
      },
      {
        facilityId: 22940,
        facilityName: '디에이치과의원',
        districtId: 3120197,
        lat: 37.49960540529676,
        lng: 127.03167849762428,
        distance: 721.5186081712591,
        facilityTypeId: 5
      },
      {
        facilityId: 28002,
        facilityName: '디에이성형외과의원',
        districtId: 3120197,
        lat: 37.499603693833,
        lng: 127.031676800566,
        distance: 721.7340268329291,
        facilityTypeId: 5
      },
      {
        facilityId: 59169,
        facilityName: '차병원',
        districtId: 3120194,
        lat: 37.50609008,
        lng: 127.0346209,
        distance: 723.1771755709939,
        facilityTypeId: 11
      },
      {
        facilityId: 59177,
        facilityName: '서울상록회관.한국기술센터',
        districtId: 3120204,
        lat: 37.503232,
        lng: 127.044057,
        distance: 725.4068914394694,
        facilityTypeId: 11
      },
      {
        facilityId: 59389,
        facilityName: '예림당아트홀.신한은행전산센터',
        districtId: 3120206,
        lat: 37.49808603,
        lng: 127.0441265,
        distance: 726.477457570348,
        facilityTypeId: 11
      },
      {
        facilityId: 59206,
        facilityName: '한국자산신탁.센터필드',
        districtId: 3120204,
        lat: 37.502783,
        lng: 127.044247,
        distance: 726.5311957094623,
        facilityTypeId: 11
      },
      {
        facilityId: 59475,
        facilityName: 'LG데이콤(르네상스호텔)',
        districtId: 3120204,
        lat: 37.50324755,
        lng: 127.0441002,
        distance: 730.4993132875883,
        facilityTypeId: 11
      },
      {
        facilityId: 37085,
        facilityName: '예젤유의원',
        districtId: 3120199,
        lat: 37.5063934350021,
        lng: 127.041207603224,
        distance: 732.402028525912,
        facilityTypeId: 5
      },
      {
        facilityId: 37086,
        facilityName: '예젤의원',
        districtId: 3120199,
        lat: 37.5063934350021,
        lng: 127.041207603224,
        distance: 732.402028525912,
        facilityTypeId: 5
      },
      {
        facilityId: 37087,
        facilityName: '예젤의원',
        districtId: 3120199,
        lat: 37.5063934350021,
        lng: 127.041207603224,
        distance: 732.402028525912,
        facilityTypeId: 5
      },
      {
        facilityId: 63153,
        facilityName: '현대까르띠에710아파트',
        districtId: null,
        lat: 37.50172,
        lng: 127.044591,
        distance: 733.483801047633,
        facilityTypeId: 12
      },
      {
        facilityId: 59474,
        facilityName: '토마토저축은행.르네상스호텔',
        districtId: 3120204,
        lat: 37.50277258,
        lng: 127.0443408,
        distance: 735.9818399549924,
        facilityTypeId: 11
      },
      {
        facilityId: 17897,
        facilityName: '삼주약국',
        districtId: 3120197,
        lat: 37.4987952,
        lng: 127.0317205,
        distance: 736.0681639334452,
        facilityTypeId: 2
      },
      {
        facilityId: 25724,
        facilityName: '김경현치과의원',
        districtId: null,
        lat: 37.4994515501667,
        lng: 127.044669620197,
        distance: 742.2655246126844,
        facilityTypeId: 5
      },
      {
        facilityId: 18018,
        facilityName: '역삼태평양약국',
        districtId: 3120194,
        lat: 37.5063354,
        lng: 127.0346621,
        distance: 744.0285290729952,
        facilityTypeId: 2
      },
      {
        facilityId: 35309,
        facilityName: '언주한의원',
        districtId: 3120194,
        lat: 37.50632968,
        lng: 127.0346400129,
        distance: 744.7453618709873,
        facilityTypeId: 5
      },
      {
        facilityId: 21210,
        facilityName: '농협은행',
        districtId: 3120197,
        lat: 37.4995539438207,
        lng: 127.031393491745,
        distance: 753.7116620786621,
        facilityTypeId: 3
      },
      {
        facilityId: 29108,
        facilityName: '모락한의원',
        districtId: 3120197,
        lat: 37.4995539438207,
        lng: 127.031393491745,
        distance: 753.7116620786621,
        facilityTypeId: 5
      },
      {
        facilityId: 20737,
        facilityName: 'SC제일은행',
        districtId: 3120206,
        lat: 37.4979241922115,
        lng: 127.044356591703,
        distance: 757.0367095013366,
        facilityTypeId: 3
      },
      {
        facilityId: 34967,
        facilityName: '아트인휴먼피부과의원',
        districtId: 3120206,
        lat: 37.4979241922115,
        lng: 127.044356591703,
        distance: 757.0367095013366,
        facilityTypeId: 5
      },
      {
        facilityId: 16891,
        facilityName: '비타약국',
        districtId: 3120194,
        lat: 37.5061371,
        lng: 127.0340773,
        distance: 761.3952780281973,
        facilityTypeId: 2
      },
      {
        facilityId: 35792,
        facilityName: '연세다엘마취통증의학과내과의원',
        districtId: 3120194,
        lat: 37.5061371187148,
        lng: 127.034077257047,
        distance: 761.3997641787072,
        facilityTypeId: 5
      },
      {
        facilityId: 27332,
        facilityName: '더건강의원',
        districtId: 3120194,
        lat: 37.50743522949446,
        lng: 127.03753590503096,
        distance: 763.6415827431299,
        facilityTypeId: 5
      },
      {
        facilityId: 41032,
        facilityName: '청춘의원',
        districtId: 3120194,
        lat: 37.5074352295,
        lng: 127.037535905,
        distance: 763.6415836354462,
        facilityTypeId: 5
      },
      {
        facilityId: 27194,
        facilityName: '당봄한의원',
        districtId: 3120204,
        lat: 37.5037692454084,
        lng: 127.044229763693,
        distance: 768.5919159283179,
        facilityTypeId: 5
      },
      {
        facilityId: 26888,
        facilityName: '다모아치과의원',
        districtId: 3120206,
        lat: 37.49775806637072,
        lng: 127.04443070338353,
        distance: 771.9758321685939,
        facilityTypeId: 5
      },
      {
        facilityId: 40498,
        facilityName: '지앤미치과의원',
        districtId: 3120204,
        lat: 37.502802777777774,
        lng: 127.04471388888888,
        distance: 776.3257805025255,
        facilityTypeId: 5
      },
      {
        facilityId: 22395,
        facilityName: '하나은행',
        districtId: 3120204,
        lat: 37.5028515551762,
        lng: 127.044750924563,
        distance: 781.9599862520531,
        facilityTypeId: 3
      },
      {
        facilityId: 33144,
        facilityName: '선릉다나아이비인후과의원',
        districtId: 3120204,
        lat: 37.5028515551762,
        lng: 127.044750924563,
        distance: 781.9599862520531,
        facilityTypeId: 5
      },
      {
        facilityId: 22340,
        facilityName: '하나은행',
        districtId: 3120194,
        lat: 37.5063288679695,
        lng: 127.034023961402,
        distance: 782.1844043568573,
        facilityTypeId: 3
      },
      {
        facilityId: 18843,
        facilityName: '누리약국',
        districtId: 3120204,
        lat: 37.5028561,
        lng: 127.0447712,
        distance: 784.2573151207405,
        facilityTypeId: 2
      },
      {
        facilityId: 42395,
        facilityName: '한국영상의원',
        districtId: 3120194,
        lat: 37.5060839039314,
        lng: 127.033642141801,
        distance: 786.133007513381,
        facilityTypeId: 5
      },
      {
        facilityId: 59450,
        facilityName: '동영문화센터',
        districtId: 3120206,
        lat: 37.49791462,
        lng: 127.0446557,
        distance: 788.1488210189025,
        facilityTypeId: 11
      },
      {
        facilityId: 40626,
        facilityName: '차의과학대학교 강남차병원',
        districtId: 3120194,
        lat: 37.50680002585087,
        lng: 127.03466865188072,
        distance: 788.4810252855204,
        facilityTypeId: 5
      },
      {
        facilityId: 23385,
        facilityName: '강남피카소의원',
        districtId: 3120197,
        lat: 37.4994145554,
        lng: 127.0310632143,
        distance: 792.434070899635,
        facilityTypeId: 5
      },
      {
        facilityId: 23299,
        facilityName: '비디엠아이성형외과의원',
        districtId: 3120197,
        lat: 37.49941455538105,
        lng: 127.03106321428643,
        distance: 792.4340727356408,
        facilityTypeId: 5
      },
      {
        facilityId: 28031,
        facilityName: '디케이의원',
        districtId: 3120197,
        lat: 37.4994161773038,
        lng: 127.031062762603,
        distance: 792.4538795865036,
        facilityTypeId: 5
      },
      {
        facilityId: 34140,
        facilityName: '스마일존치과의원',
        districtId: 3120197,
        lat: 37.4994161773038,
        lng: 127.031062762603,
        distance: 792.4538795865036,
        facilityTypeId: 5
      },
      {
        facilityId: 34385,
        facilityName: '신사마취통증의학과의원',
        districtId: 3120197,
        lat: 37.4994161773038,
        lng: 127.031062762603,
        distance: 792.4538795865036,
        facilityTypeId: 5
      },
      {
        facilityId: 37991,
        facilityName: '유로진여성의원',
        districtId: 3120197,
        lat: 37.4994161773038,
        lng: 127.031062762603,
        distance: 792.4538795865036,
        facilityTypeId: 5
      },
      {
        facilityId: 38990,
        facilityName: '이즈의원',
        districtId: 3120197,
        lat: 37.4994161773038,
        lng: 127.031062762603,
        distance: 792.4538795865036,
        facilityTypeId: 5
      },
      {
        facilityId: 829,
        facilityName: '역삼1동주민센터',
        districtId: 3120198,
        lat: 37.4953071996894,
        lng: 127.03327689991984,
        distance: 794.8400611573071,
        facilityTypeId: 1
      },
      {
        facilityId: 59172,
        facilityName: '라움아트센터.시티프라디움더강남',
        districtId: 3120199,
        lat: 37.50752569,
        lng: 127.0398644,
        distance: 795.9734591652885,
        facilityTypeId: 11
      },
      {
        facilityId: 60667,
        facilityName: '역삼휴먼터치빌',
        districtId: 3120194,
        lat: 37.5064114,
        lng: 127.0338294,
        distance: 802.2777484989817,
        facilityTypeId: 12
      },
      {
        facilityId: 28176,
        facilityName: '런던치과의원',
        districtId: 3120197,
        lat: 37.49938333333333,
        lng: 127.03096666666669,
        distance: 803.5970205344715,
        facilityTypeId: 5
      },
      {
        facilityId: 23826,
        facilityName: '강남담온한의원',
        districtId: 3120189,
        lat: 37.49741778401071,
        lng: 127.03159615178788,
        distance: 803.852691646734,
        facilityTypeId: 5
      },
      {
        facilityId: 61710,
        facilityName: '역삼아이파크',
        districtId: null,
        lat: 37.4991341,
        lng: 127.0452013,
        distance: 806.9183866925196,
        facilityTypeId: 12
      },
      {
        facilityId: 63341,
        facilityName: '원에디션강남',
        districtId: 3120199,
        lat: 37.5078841,
        lng: 127.0382664,
        distance: 811.2767516815659,
        facilityTypeId: 12
      },
      {
        facilityId: 21348,
        facilityName: '수협은행',
        districtId: null,
        lat: 37.500722082344,
        lng: 127.030768815378,
        distance: 814.4446680535638,
        facilityTypeId: 3
      },
      {
        facilityId: 15471,
        facilityName: '루이약국',
        districtId: 3110971,
        lat: 37.5073652,
        lng: 127.0408984,
        distance: 815.4161023688536,
        facilityTypeId: 2
      },
      {
        facilityId: 37577,
        facilityName: '우리성형외과의원',
        districtId: 3120204,
        lat: 37.502938570166,
        lng: 127.045046265048,
        distance: 816.1686788191579,
        facilityTypeId: 5
      },
      {
        facilityId: 35628,
        facilityName: '역삼한의원',
        districtId: 3120201,
        lat: 37.49328541220931,
        lng: 127.0388314983302,
        distance: 816.4063402466082,
        facilityTypeId: 5
      },
      {
        facilityId: 34753,
        facilityName: '아미스킨의원',
        districtId: 3120194,
        lat: 37.5078835028906,
        lng: 127.037176805999,
        distance: 817.3402083146345,
        facilityTypeId: 5
      },
      {
        facilityId: 59529,
        facilityName: '동영문화센터',
        districtId: null,
        lat: 37.49821633,
        lng: 127.0450699,
        distance: 819.5678872026499,
        facilityTypeId: 11
      },
      {
        facilityId: 59193,
        facilityName: '역삼초등학교',
        districtId: 3120198,
        lat: 37.49433084,
        lng: 127.0341054,
        distance: 825.1940039241849,
        facilityTypeId: 11
      },
      {
        facilityId: 59290,
        facilityName: '글래드라이브강남호텔',
        districtId: 3120194,
        lat: 37.50780517,
        lng: 127.03634,
        distance: 825.5855958355296,
        facilityTypeId: 11
      },
      {
        facilityId: 38121,
        facilityName: '유진성형외과의원',
        districtId: 3120189,
        lat: 37.495998522778,
        lng: 127.03224691528,
        distance: 826.5138944756034,
        facilityTypeId: 5
      },
      {
        facilityId: 59171,
        facilityName: '시티프라디움더강남.라움아트센터',
        districtId: 3120199,
        lat: 37.50798829,
        lng: 127.0388432,
        distance: 826.8594097833726,
        facilityTypeId: 11
      },
      {
        facilityId: 28836,
        facilityName: '맥스웰피부과의원',
        districtId: 3120189,
        lat: 37.4985885669089,
        lng: 127.030856939816,
        distance: 834.7336730613563,
        facilityTypeId: 5
      },
      {
        facilityId: 34465,
        facilityName: '신유외과의원',
        districtId: 3120189,
        lat: 37.4985885669089,
        lng: 127.030856939816,
        distance: 834.7336730613563,
        facilityTypeId: 5
      },
      {
        facilityId: 36289,
        facilityName: '연세우노비뇨기과의원',
        districtId: 3120189,
        lat: 37.4985885669089,
        lng: 127.030856939816,
        distance: 834.7336730613563,
        facilityTypeId: 5
      },
      {
        facilityId: 39967,
        facilityName: '제이마취통증의학과의원',
        districtId: 3120189,
        lat: 37.4985885669089,
        lng: 127.030856939816,
        distance: 834.7336730613563,
        facilityTypeId: 5
      },
      {
        facilityId: 17173,
        facilityName: '별빛약국',
        districtId: 3120194,
        lat: 37.5071776,
        lng: 127.0344917,
        distance: 834.7532324821528,
        facilityTypeId: 2
      },
      {
        facilityId: 23531,
        facilityName: '서울슬림외과의원',
        districtId: 3120189,
        lat: 37.49858928828226,
        lng: 127.03085479145024,
        distance: 834.9425361530112,
        facilityTypeId: 5
      },
      {
        facilityId: 29371,
        facilityName: '미드라인성형외과의원',
        districtId: 3120189,
        lat: 37.49858928828226,
        lng: 127.03085479145024,
        distance: 834.9425361530112,
        facilityTypeId: 5
      },
      {
        facilityId: 39200,
        facilityName: '인샤인피부과의원',
        districtId: 3120194,
        lat: 37.5071708171619,
        lng: 127.034472786737,
        distance: 835.1029569446605,
        facilityTypeId: 5
      },
      {
        facilityId: 40305,
        facilityName: '좋은아침외과의원',
        districtId: 3120194,
        lat: 37.5071708171619,
        lng: 127.034472786737,
        distance: 835.1029569446605,
        facilityTypeId: 5
      },
      {
        facilityId: 37534,
        facilityName: '윤뉴방여성외과의원',
        districtId: 3120189,
        lat: 37.49931198038506,
        lng: 127.03067560833117,
        distance: 836.8352347240024,
        facilityTypeId: 5
      },
      {
        facilityId: 59170,
        facilityName: '언주역5번출구.차병원사거리',
        districtId: 3120194,
        lat: 37.50739481,
        lng: 127.0348624,
        distance: 837.5403401937622,
        facilityTypeId: 11
      },
      {
        facilityId: 20789,
        facilityName: 'SC제일은행',
        districtId: 3120204,
        lat: 37.5029822853407,
        lng: 127.04523911677,
        distance: 838.0439031131124,
        facilityTypeId: 3
      },
      {
        facilityId: 36901,
        facilityName: '영이비인후과의원',
        districtId: 3120189,
        lat: 37.49932905876089,
        lng: 127.03065834217844,
        distance: 838.4075907203248,
        facilityTypeId: 5
      },
      {
        facilityId: 24166,
        facilityName: '강남영치과의원',
        districtId: 3120189,
        lat: 37.4993151014022,
        lng: 127.030652774616,
        distance: 839.2787536265113,
        facilityTypeId: 5
      },
      {
        facilityId: 41536,
        facilityName: '킴스비뇨의학과의원',
        districtId: 3120189,
        lat: 37.4993151014022,
        lng: 127.030652774616,
        distance: 839.2787536265113,
        facilityTypeId: 5
      },
      {
        facilityId: 42059,
        facilityName: '핑의원',
        districtId: 3120189,
        lat: 37.4993151014022,
        lng: 127.030652774616,
        distance: 839.2787536265113,
        facilityTypeId: 5
      },
      {
        facilityId: 22838,
        facilityName: '강남정신건강의학과의원',
        districtId: 3120189,
        lat: 37.4993137502,
        lng: 127.0306515301,
        distance: 839.4405400014416,
        facilityTypeId: 5
      },
      {
        facilityId: 35384,
        facilityName: '에스여성의원',
        districtId: 3120189,
        lat: 37.4993137502,
        lng: 127.0306515301,
        distance: 839.4405400014416,
        facilityTypeId: 5
      },
      {
        facilityId: 16889,
        facilityName: '옵티마미소약국',
        districtId: 3120194,
        lat: 37.5071359,
        lng: 127.0342994,
        distance: 841.2014691913347,
        facilityTypeId: 2
      },
      {
        facilityId: 32164,
        facilityName: '서울비29이비인후과의원',
        districtId: 3120194,
        lat: 37.5071296978174,
        lng: 127.034278348291,
        distance: 841.7816508749197,
        facilityTypeId: 5
      },
      {
        facilityId: 27002,
        facilityName: '다편한정형외과의원',
        districtId: 3120206,
        lat: 37.497221653749,
        lng: 127.044896498317,
        distance: 844.254511107588,
        facilityTypeId: 5
      },
      {
        facilityId: 60713,
        facilityName: '대우디오빌플러스',
        districtId: 3120189,
        lat: 37.4975858,
        lng: 127.0311179,
        distance: 844.3932247429898,
        facilityTypeId: 12
      },
      {
        facilityId: 59192,
        facilityName: '역삼초등학교',
        districtId: 3120198,
        lat: 37.49409748,
        lng: 127.034025,
        distance: 851.9069452112125,
        facilityTypeId: 11
      },
      {
        facilityId: 63280,
        facilityName: '강남센트럴아이파크',
        districtId: null,
        lat: 37.500586,
        lng: 127.04579317,
        distance: 856.3206060006648,
        facilityTypeId: 12
      },
      {
        facilityId: 61900,
        facilityName: '역삼개나리',
        districtId: null,
        lat: 37.5007799,
        lng: 127.0458064,
        distance: 858.0509035733946,
        facilityTypeId: 12
      },
      {
        facilityId: 32386,
        facilityName: '서울안강병원',
        districtId: 3120206,
        lat: 37.4970871925109,
        lng: 127.044978178433,
        distance: 859.0786212476372,
        facilityTypeId: 5
      },
      {
        facilityId: 38254,
        facilityName: '윤후여성한의원',
        districtId: 3120189,
        lat: 37.49817847538067,
        lng: 127.03067820690448,
        distance: 866.9090991448651,
        facilityTypeId: 5
      },
      {
        facilityId: 59040,
        facilityName: '언주역4번출구.차병원사거리',
        districtId: 3120194,
        lat: 37.50777953,
        lng: 127.0350085,
        distance: 869.8481081000984,
        facilityTypeId: 11
      },
      {
        facilityId: 34757,
        facilityName: '아미치과의원',
        districtId: 3120206,
        lat: 37.4969230190411,
        lng: 127.045004654938,
        distance: 870.1080295066296,
        facilityTypeId: 5
      },
      {
        facilityId: 28383,
        facilityName: '리리유의원',
        districtId: 3120194,
        lat: 37.5068033590132,
        lng: 127.03331537981,
        distance: 871.4482093861012,
        facilityTypeId: 5
      },
      {
        facilityId: 38014,
        facilityName: '유상호정형외과의원',
        districtId: 3120194,
        lat: 37.5068033590132,
        lng: 127.03331537981,
        distance: 871.4482093861012,
        facilityTypeId: 5
      },
      {
        facilityId: 25079,
        facilityName: '고정인정신건강의학과의원',
        districtId: 3120204,
        lat: 37.503814090561335,
        lng: 127.04524719605294,
        distance: 872.6425326926015,
        facilityTypeId: 5
      },
      {
        facilityId: 37003,
        facilityName: '예손치과의원',
        districtId: 3120189,
        lat: 37.4984820624077,
        lng: 127.030531543748,
        distance: 872.765687092264,
        facilityTypeId: 5
      },
      {
        facilityId: 25451,
        facilityName: '굿본재활의학과의원',
        districtId: 3120204,
        lat: 37.5030781277393,
        lng: 127.045537630336,
        distance: 872.9034591251955,
        facilityTypeId: 5
      },
      {
        facilityId: 32176,
        facilityName: '서울빛정신건강의학과의원',
        districtId: 3120204,
        lat: 37.5038016513092,
        lng: 127.045261212369,
        distance: 873.4973575836907,
        facilityTypeId: 5
      },
      {
        facilityId: 33152,
        facilityName: '선릉애플치과의원',
        districtId: 3120204,
        lat: 37.5038016513092,
        lng: 127.045261212369,
        distance: 873.4973575836907,
        facilityTypeId: 5
      },
      {
        facilityId: 39611,
        facilityName: '장은진정신건강의학과의원',
        districtId: 3120204,
        lat: 37.5038016513092,
        lng: 127.045261212369,
        distance: 873.4973575836907,
        facilityTypeId: 5
      },
      {
        facilityId: 37943,
        facilityName: '윤제한의원',
        districtId: 3120204,
        lat: 37.50380327329909,
        lng: 127.04526076096666,
        distance: 873.5253019435622,
        facilityTypeId: 5
      },
      {
        facilityId: 39836,
        facilityName: '정은정피부과의원',
        districtId: 3120201,
        lat: 37.4930152634881,
        lng: 127.040257398774,
        distance: 876.0315984151871,
        facilityTypeId: 5
      },
      {
        facilityId: 17214,
        facilityName: '역삼약국',
        districtId: 3120198,
        lat: 37.4939945,
        lng: 127.0337328,
        distance: 879.1211647726504,
        facilityTypeId: 2
      },
      {
        facilityId: 29759,
        facilityName: '바노바기피부과의원',
        districtId: 3120194,
        lat: 37.5082248905181,
        lng: 127.036023673983,
        distance: 879.5439134933055,
        facilityTypeId: 5
      },
      {
        facilityId: 47227,
        facilityName: '언주',
        districtId: 3120194,
        lat: 37.507287,
        lng: 127.033868,
        distance: 880.409899716738,
        facilityTypeId: 10
      },
      {
        facilityId: 29519,
        facilityName: '미소안피부과의원',
        districtId: 3120194,
        lat: 37.50804497608806,
        lng: 127.03537370486454,
        distance: 882.3262546963181,
        facilityTypeId: 5
      },
      {
        facilityId: 27039,
        facilityName: '닥터봄춘의원',
        districtId: 3120194,
        lat: 37.5079803352646,
        lng: 127.03520187295,
        distance: 882.35535285229,
        facilityTypeId: 5
      },
      {
        facilityId: 37127,
        facilityName: '오늘그린정신건강의학과의원',
        districtId: 3120194,
        lat: 37.5080500239766,
        lng: 127.035366129428,
        distance: 883.1423686753582,
        facilityTypeId: 5
      },
      {
        facilityId: 43293,
        facilityName: '힘찬큐한방병원',
        districtId: 3120194,
        lat: 37.5080500239766,
        lng: 127.035366129428,
        distance: 883.1423686753582,
        facilityTypeId: 5
      },
      {
        facilityId: 18449,
        facilityName: '센트럴약국',
        districtId: 3120194,
        lat: 37.5079982,
        lng: 127.0352111,
        distance: 883.8332668945925,
        facilityTypeId: 2
      },
      {
        facilityId: 31279,
        facilityName: '삼성아이비의원',
        districtId: 3120194,
        lat: 37.5079322777816,
        lng: 127.035012857641,
        distance: 885.2954548116219,
        facilityTypeId: 5
      },
      {
        facilityId: 34619,
        facilityName: '씨비케이성형외과의원',
        districtId: 3120194,
        lat: 37.5079322777816,
        lng: 127.035012857641,
        distance: 885.2954548116219,
        facilityTypeId: 5
      },
      {
        facilityId: 37811,
        facilityName: '웰가의원',
        districtId: 3120194,
        lat: 37.5079322777816,
        lng: 127.035012857641,
        distance: 885.2954548116219,
        facilityTypeId: 5
      },
      {
        facilityId: 38031,
        facilityName: '유씨강남치과의원',
        districtId: 3120194,
        lat: 37.5079322777816,
        lng: 127.035012857641,
        distance: 885.2954548116219,
        facilityTypeId: 5
      },
      {
        facilityId: 35334,
        facilityName: '에버성형외과의원',
        districtId: 3120194,
        lat: 37.50794731433789,
        lng: 127.03504736065342,
        distance: 885.3633942974941,
        facilityTypeId: 5
      },
      {
        facilityId: 28250,
        facilityName: '로즈성형외과의원',
        districtId: 3120194,
        lat: 37.50793335932951,
        lng: 127.03501172713058,
        distance: 885.4549798927856,
        facilityTypeId: 5
      },
      {
        facilityId: 25128,
        facilityName: '고운미소치과의원',
        districtId: 3120201,
        lat: 37.4931346979701,
        lng: 127.040895795312,
        distance: 885.6960460477621,
        facilityTypeId: 5
      },
      {
        facilityId: 27811,
        facilityName: '동양정형외과의원',
        districtId: 3120201,
        lat: 37.4931346979701,
        lng: 127.040895795312,
        distance: 885.6960460477621,
        facilityTypeId: 5
      },
      {
        facilityId: 29722,
        facilityName: '민제한의원',
        districtId: 3120201,
        lat: 37.4931346979701,
        lng: 127.040895795312,
        distance: 885.6960460477621,
        facilityTypeId: 5
      },
      {
        facilityId: 32225,
        facilityName: '서울삼정치과의원',
        districtId: 3120194,
        lat: 37.50769386613158,
        lng: 127.03448808662807,
        distance: 885.7362986461135,
        facilityTypeId: 5
      },
      {
        facilityId: 62764,
        facilityName: '테헤란 IPARK',
        districtId: null,
        lat: 37.5022736,
        lng: 127.045892,
        distance: 887.2794944350245,
        facilityTypeId: 12
      },
      {
        facilityId: 61533,
        facilityName: '역삼개나리래미안',
        districtId: null,
        lat: 37.4983263,
        lng: 127.0457475,
        distance: 887.6843337725549,
        facilityTypeId: 12
      },
      {
        facilityId: 59039,
        facilityName: '국민은행논현동지점',
        districtId: 3120199,
        lat: 37.5085798,
        lng: 127.0376592,
        distance: 889.7066997683731,
        facilityTypeId: 11
      },
      {
        facilityId: 32342,
        facilityName: '서울시카고치과의원',
        districtId: 3120198,
        lat: 37.49394125637771,
        lng: 127.03363620519988,
        distance: 890.0008467812697,
        facilityTypeId: 5
      },
      {
        facilityId: 19622,
        facilityName: '유진약국',
        districtId: 3120206,
        lat: 37.4967404,
        lng: 127.045112,
        distance: 890.2543922894097,
        facilityTypeId: 2
      },
      {
        facilityId: 25571,
        facilityName: '글로리의원',
        districtId: 3120194,
        lat: 37.5078448024619,
        lng: 127.034665821539,
        distance: 892.118260943007,
        facilityTypeId: 5
      },
      {
        facilityId: 33518,
        facilityName: '세민성형외과의원',
        districtId: 3120194,
        lat: 37.5078448024619,
        lng: 127.034665821539,
        distance: 892.118260943007,
        facilityTypeId: 5
      },
      {
        facilityId: 25863,
        facilityName: '김성민이비인후과의원',
        districtId: 3120194,
        lat: 37.5077659311428,
        lng: 127.034472042487,
        distance: 893.6919575393407,
        facilityTypeId: 5
      },
      {
        facilityId: 34636,
        facilityName: '씨엔비안과의원',
        districtId: 3120201,
        lat: 37.493034297937,
        lng: 127.040976139817,
        distance: 899.3011487152127,
        facilityTypeId: 5
      },
      {
        facilityId: 16888,
        facilityName: '논현천사약국',
        districtId: 3120194,
        lat: 37.5076529,
        lng: 127.0340669,
        distance: 903.9268979829357,
        facilityTypeId: 2
      },
      {
        facilityId: 29241,
        facilityName: '몸바로한의원',
        districtId: 3120194,
        lat: 37.5076483851132,
        lng: 127.034040281333,
        distance: 904.9607080186964,
        facilityTypeId: 5
      },
      {
        facilityId: 34128,
        facilityName: '스마일라인치과의원',
        districtId: 3120194,
        lat: 37.5076483851132,
        lng: 127.034040281333,
        distance: 904.9607080186964,
        facilityTypeId: 5
      },
      {
        facilityId: 29240,
        facilityName: '몸바로한의원',
        districtId: 3120194,
        lat: 37.5076489261,
        lng: 127.0340389244,
        distance: 905.0880025018963,
        facilityTypeId: 5
      },
      {
        facilityId: 23789,
        facilityName: '연세베라의원',
        districtId: 3120194,
        lat: 37.50765795287396,
        lng: 127.03403114578468,
        distance: 906.3891791187797,
        facilityTypeId: 5
      },
      {
        facilityId: 16756,
        facilityName: '동의온누리약국',
        districtId: 3120201,
        lat: 37.493567,
        lng: 127.0422731,
        distance: 908.8523120255378,
        facilityTypeId: 2
      },
      {
        facilityId: 23891,
        facilityName: '역삼의원',
        districtId: 3120201,
        lat: 37.4935558004055,
        lng: 127.042256262991,
        distance: 908.9674778464855,
        facilityTypeId: 5
      },
      {
        facilityId: 38743,
        facilityName: '이스턴치과의원',
        districtId: 3120206,
        lat: 37.4965421731837,
        lng: 127.045215441878,
        distance: 911.0428358389335,
        facilityTypeId: 5
      },
      {
        facilityId: 28035,
        facilityName: '드보라의원',
        districtId: 3120189,
        lat: 37.4941544920079,
        lng: 127.033008626274,
        distance: 911.9348815727468,
        facilityTypeId: 5
      },
      {
        facilityId: 40984,
        facilityName: '청담이지함피부과의원',
        districtId: 3110971,
        lat: 37.5086904420291,
        lng: 127.039402841592,
        distance: 912.4223227430546,
        facilityTypeId: 5
      },
      {
        facilityId: 22688,
        facilityName: '가톨릭정형외과의원',
        districtId: 3120199,
        lat: 37.5088631539282,
        lng: 127.037780922475,
        distance: 920.5616274338928,
        facilityTypeId: 5
      },
      {
        facilityId: 19081,
        facilityName: '늘푸른약국',
        districtId: 3120199,
        lat: 37.5088657,
        lng: 127.0377994,
        distance: 920.7696236212635,
        facilityTypeId: 2
      },
      {
        facilityId: 59478,
        facilityName: '강남역',
        districtId: 3120189,
        lat: 37.49836707,
        lng: 127.0301126,
        distance: 921.0727414419308,
        facilityTypeId: 11
      },
      {
        facilityId: 19796,
        facilityName: '호원약국',
        districtId: 3120207,
        lat: 37.5085412,
        lng: 127.0405205,
        distance: 924.4279606188002,
        facilityTypeId: 2
      },
      {
        facilityId: 22102,
        facilityName: '중소기업은행',
        districtId: 3120194,
        lat: 37.5074604391987,
        lng: 127.033395973437,
        distance: 925.3521454786297,
        facilityTypeId: 3
      },
      {
        facilityId: 17942,
        facilityName: '정다운이화약국',
        districtId: null,
        lat: 37.4984403,
        lng: 127.0461337,
        distance: 925.5900157752168,
        facilityTypeId: 2
      },
      {
        facilityId: 37989,
        facilityName: '유로스메디컬의원',
        districtId: 3120189,
        lat: 37.49906120912831,
        lng: 127.029905723263,
        distance: 926.0252383782143,
        facilityTypeId: 5
      },
      {
        facilityId: 22717,
        facilityName: '강남루덴플러스치과의원',
        districtId: 3120189,
        lat: 37.4990612091283,
        lng: 127.029905723263,
        distance: 926.0252383783595,
        facilityTypeId: 5
      },
      {
        facilityId: 26772,
        facilityName: '뉴헤어모발성형외과의원',
        districtId: 3120189,
        lat: 37.4990612091283,
        lng: 127.029905723263,
        distance: 926.0252383783595,
        facilityTypeId: 5
      },
      {
        facilityId: 27360,
        facilityName: '더도어성형외과의원',
        districtId: 3120189,
        lat: 37.4990612091283,
        lng: 127.029905723263,
        distance: 926.0252383783595,
        facilityTypeId: 5
      },
      {
        facilityId: 28947,
        facilityName: '멜론성형외과의원',
        districtId: 3120189,
        lat: 37.4990612091283,
        lng: 127.029905723263,
        distance: 926.0252383783595,
        facilityTypeId: 5
      },
      {
        facilityId: 31225,
        facilityName: '삼성미라클안과의원',
        districtId: 3120189,
        lat: 37.4990612091283,
        lng: 127.029905723263,
        distance: 926.0252383783595,
        facilityTypeId: 5
      },
      {
        facilityId: 40052,
        facilityName: '키스유성형외과의원',
        districtId: 3120189,
        lat: 37.4990616598,
        lng: 127.0299050449,
        distance: 926.0901883616174,
        facilityTypeId: 5
      },
      {
        facilityId: 15677,
        facilityName: '다솜약국',
        districtId: 3120201,
        lat: 37.4929277,
        lng: 127.0413818,
        distance: 927.2358456226349,
        facilityTypeId: 2
      },
      {
        facilityId: 40469,
        facilityName: '지디스내과의원',
        districtId: 3120201,
        lat: 37.4929198247521,
        lng: 127.041364616509,
        distance: 927.2891052263806,
        facilityTypeId: 5
      },
      {
        facilityId: 34843,
        facilityName: '아이러브강남의원',
        districtId: 3120194,
        lat: 37.5078638298168,
        lng: 127.033990162107,
        distance: 928.5387407053729,
        facilityTypeId: 5
      },
      {
        facilityId: 35276,
        facilityName: '양치과의원',
        districtId: 3120192,
        lat: 37.49371068245596,
        lng: 127.03333305413808,
        distance: 930.1664740440262,
        facilityTypeId: 5
      },
      {
        facilityId: 35497,
        facilityName: '엔젤미치과의원',
        districtId: 3120206,
        lat: 37.49636454314508,
        lng: 127.0453241217166,
        distance: 931.3755459232195,
        facilityTypeId: 5
      },
      {
        facilityId: 37652,
        facilityName: '우보천리한의원',
        districtId: 3120206,
        lat: 37.49636454314508,
        lng: 127.0453241217166,
        distance: 931.3755459232195,
        facilityTypeId: 5
      },
      {
        facilityId: 22757,
        facilityName: '강남본한의원',
        districtId: 3120201,
        lat: 37.4924754833972,
        lng: 127.040218323216,
        distance: 932.7759492462453,
        facilityTypeId: 5
      },
      {
        facilityId: 39240,
        facilityName: '최문규한의원',
        districtId: 3120201,
        lat: 37.492474041331214,
        lng: 127.0402196793824,
        distance: 932.9692915624837,
        facilityTypeId: 5
      },
      {
        facilityId: 36920,
        facilityName: '예그린치과의원',
        districtId: 3120201,
        lat: 37.4924191439926,
        lng: 127.040030922458,
        distance: 933.8075649428483,
        facilityTypeId: 5
      },
      {
        facilityId: 23957,
        facilityName: '강남루덴플러스치과의원',
        districtId: 3120189,
        lat: 37.49902203383928,
        lng: 127.02983265269944,
        distance: 934.8161389484997,
        facilityTypeId: 5
      },
      {
        facilityId: 16183,
        facilityName: '일번지약국',
        districtId: 3120189,
        lat: 37.4971584,
        lng: 127.0304025,
        distance: 936.3332060313627,
        facilityTypeId: 2
      },
      {
        facilityId: 59184,
        facilityName: '강남역12번출구',
        districtId: 3120189,
        lat: 37.4988294,
        lng: 127.0298391,
        distance: 938.3463060448975,
        facilityTypeId: 11
      },
      {
        facilityId: 26205,
        facilityName: '김태영치과의원',
        districtId: 3120201,
        lat: 37.49224926937298,
        lng: 127.03941145499316,
        distance: 939.0009323183154,
        facilityTypeId: 5
      },
      {
        facilityId: 28101,
        facilityName: '라윤영치과의원',
        districtId: 3120189,
        lat: 37.49712977996965,
        lng: 127.03038375615196,
        distance: 939.5357134196947,
        facilityTypeId: 5
      },
      {
        facilityId: 22993,
        facilityName: '강남큐브안과의원',
        districtId: 3120189,
        lat: 37.4979246534828,
        lng: 127.030009309581,
        distance: 946.377497623421,
        facilityTypeId: 5
      },
      {
        facilityId: 37179,
        facilityName: '오브제성형외과의원',
        districtId: 3120189,
        lat: 37.4979246534828,
        lng: 127.030009309581,
        distance: 946.377497623421,
        facilityTypeId: 5
      },
      {
        facilityId: 41825,
        facilityName: '퍼펙트치과의원',
        districtId: 3120189,
        lat: 37.4979246534828,
        lng: 127.030009309581,
        distance: 946.377497623421,
        facilityTypeId: 5
      },
      {
        facilityId: 38540,
        facilityName: '이원철한방내과한의원',
        districtId: 3120201,
        lat: 37.49307525843866,
        lng: 127.0421016391924,
        distance: 947.1226353368927,
        facilityTypeId: 5
      },
      {
        facilityId: 20847,
        facilityName: '국민은행',
        districtId: 3120199,
        lat: 37.5090819484579,
        lng: 127.03740168423,
        distance: 947.3557269694396,
        facilityTypeId: 3
      },
      {
        facilityId: 63158,
        facilityName: '롯데캐슬노블',
        districtId: null,
        lat: 37.492491,
        lng: 127.035424,
        distance: 948.1993367228483,
        facilityTypeId: 12
      },
      {
        facilityId: 824,
        facilityName: '서초세무서',
        districtId: 3120189,
        lat: 37.49824389968656,
        lng: 127.02989149995696,
        distance: 948.4546736009072,
        facilityTypeId: 1
      },
      {
        facilityId: 826,
        facilityName: '역삼세무서',
        districtId: 3120189,
        lat: 37.49824389968656,
        lng: 127.02989149995696,
        distance: 948.4546736009072,
        facilityTypeId: 1
      },
      {
        facilityId: 833,
        facilityName: '삼성세무서',
        districtId: 3120189,
        lat: 37.49824389968656,
        lng: 127.02989149995696,
        distance: 948.4546736009072,
        facilityTypeId: 1
      },
      {
        facilityId: 61907,
        facilityName: '역삼푸르지오',
        districtId: null,
        lat: 37.4975289,
        lng: 127.0460658,
        distance: 949.7345155527319,
        facilityTypeId: 12
      },
      {
        facilityId: 26111,
        facilityName: '김종삼치과의원',
        districtId: 3120201,
        lat: 37.4920916009046,
        lng: 127.039034420126,
        distance: 950.7930273749063,
        facilityTypeId: 5
      },
      {
        facilityId: 17186,
        facilityName: '선한약국',
        districtId: 3120194,
        lat: 37.5077609,
        lng: 127.0333814,
        distance: 954.0092494130259,
        facilityTypeId: 2
      },
      {
        facilityId: 42493,
        facilityName: '한빛의원',
        districtId: 3120194,
        lat: 37.5077549878017,
        lng: 127.033360251538,
        distance: 954.753799577812,
        facilityTypeId: 5
      },
      {
        facilityId: 28291,
        facilityName: '루시드치과의원',
        districtId: 3120194,
        lat: 37.507671687213,
        lng: 127.033209902988,
        distance: 956.427675532298,
        facilityTypeId: 5
      },
      {
        facilityId: 59212,
        facilityName: '도곡1차아이파크.역삼청소년수련관',
        districtId: 3120201,
        lat: 37.49280822,
        lng: 127.0417859,
        distance: 957.8490599185651,
        facilityTypeId: 11
      },
      {
        facilityId: 26091,
        facilityName: '김정수여러분병원',
        districtId: 3120194,
        lat: 37.5072207305514,
        lng: 127.032576001066,
        distance: 959.0611155021206,
        facilityTypeId: 5
      },
      {
        facilityId: 39565,
        facilityName: '장민욱뇌비게이션신경과의원',
        districtId: 3120194,
        lat: 37.5072207305514,
        lng: 127.032576001066,
        distance: 959.0611155021206,
        facilityTypeId: 5
      },
      {
        facilityId: 26363,
        facilityName: '나라한의원',
        districtId: 3120201,
        lat: 37.4933164567,
        lng: 127.0428571459,
        distance: 966.9043306866514,
        facilityTypeId: 5
      },
      {
        facilityId: 40570,
        facilityName: '진비뇨기과의원',
        districtId: 3120194,
        lat: 37.507885201263456,
        lng: 127.03330740048398,
        distance: 970.0793080126243,
        facilityTypeId: 5
      },
      {
        facilityId: 34391,
        facilityName: '신사이사랑치과의원',
        districtId: 3120194,
        lat: 37.5079014142286,
        lng: 127.033313718867,
        distance: 971.202743397659,
        facilityTypeId: 5
      },
      {
        facilityId: 38942,
        facilityName: '이정신과의원',
        districtId: 3120194,
        lat: 37.5079014142286,
        lng: 127.033313718867,
        distance: 971.202743397659,
        facilityTypeId: 5
      },
      {
        facilityId: 59330,
        facilityName: '언주역2번출구.차병원사거리',
        districtId: 3120194,
        lat: 37.50795302,
        lng: 127.0333617,
        distance: 973.1170088833118,
        facilityTypeId: 11
      },
      {
        facilityId: 59191,
        facilityName: '역삼럭키아파트.역삼월드메르디앙아파트',
        districtId: 3120201,
        lat: 37.49183877,
        lng: 127.0387195,
        distance: 975.6127750513203,
        facilityTypeId: 11
      },
      {
        facilityId: 59034,
        facilityName: '아크로힐스논현',
        districtId: null,
        lat: 37.50922287,
        lng: 127.0396749,
        distance: 975.9111205369868,
        facilityTypeId: 11
      },
      {
        facilityId: 39470,
        facilityName: '자임당한의원',
        districtId: 3120194,
        lat: 37.5083030053293,
        lng: 127.033900558138,
        distance: 976.089377488107,
        facilityTypeId: 5
      },
      {
        facilityId: 27245,
        facilityName: '대암의원',
        districtId: 3120194,
        lat: 37.5083055279479,
        lng: 127.033901237892,
        distance: 976.2997655349845,
        facilityTypeId: 5
      },
      {
        facilityId: 22741,
        facilityName: '김이비인후과의원',
        districtId: 3120194,
        lat: 37.508241666666656,
        lng: 127.033775,
        distance: 976.8864865856051,
        facilityTypeId: 5
      },
      {
        facilityId: 59459,
        facilityName: '역삼청소년수련관.도곡1차아이파크',
        districtId: 3120201,
        lat: 37.49310435,
        lng: 127.0427156,
        distance: 978.3561597527291,
        facilityTypeId: 11
      },
      {
        facilityId: 59197,
        facilityName: '래미안.그레이튼.아파트',
        districtId: 3120206,
        lat: 37.49595165,
        lng: 127.0456136,
        distance: 982.6084422845096,
        facilityTypeId: 11
      },
      {
        facilityId: 34182,
        facilityName: '스타28치과의원',
        districtId: 3120189,
        lat: 37.5005266914494,
        lng: 127.029201980639,
        distance: 988.5620459150247,
        facilityTypeId: 5
      },
      {
        facilityId: 27699,
        facilityName: '동국해랑한의원',
        districtId: 3120210,
        lat: 37.5032369285,
        lng: 127.0465813628,
        distance: 988.7777688698563,
        facilityTypeId: 5
      },
      {
        facilityId: 59173,
        facilityName: '아크로힐스논현',
        districtId: 3120207,
        lat: 37.50910775,
        lng: 127.040648,
        distance: 988.8310883724962,
        facilityTypeId: 11
      },
      {
        facilityId: 30920,
        facilityName: '비움채한의원',
        districtId: 3120210,
        lat: 37.5032355765545,
        lng: 127.046582379785,
        distance: 988.8409985432145,
        facilityTypeId: 5
      },
      {
        facilityId: 39247,
        facilityName: '인터케어내과의원',
        districtId: 3120210,
        lat: 37.5032355765545,
        lng: 127.046582379785,
        distance: 988.8409985432145,
        facilityTypeId: 5
      },
      {
        facilityId: 59479,
        facilityName: '강남역12번출구',
        districtId: 3120189,
        lat: 37.49871237,
        lng: 127.0293968,
        distance: 989.163668339508,
        facilityTypeId: 11
      },
      {
        facilityId: 25439,
        facilityName: '경희한성한방병원',
        districtId: 3120194,
        lat: 37.50801317534039,
        lng: 127.03318404087852,
        distance: 989.5081000855876,
        facilityTypeId: 5
      },
      {
        facilityId: 19399,
        facilityName: '샘약국',
        districtId: 3120210,
        lat: 37.5032509,
        lng: 127.046588,
        distance: 989.9455561681061,
        facilityTypeId: 2
      },
      {
        facilityId: 59016,
        facilityName: '삼정호텔',
        districtId: 3120194,
        lat: 37.50678565,
        lng: 127.0316905,
        distance: 990.5975766483293,
        facilityTypeId: 11
      },
      {
        facilityId: 21729,
        facilityName: '우리은행',
        districtId: 3120199,
        lat: 37.5093555052222,
        lng: 127.036500044698,
        distance: 990.6046441313158,
        facilityTypeId: 3
      },
      {
        facilityId: 22566,
        facilityName: '경희예가한의원',
        districtId: 3120210,
        lat: 37.5051902735793,
        lng: 127.045747691089,
        distance: 993.1198387433465,
        facilityTypeId: 5
      },
      {
        facilityId: 59543,
        facilityName: '삼정호텔',
        districtId: 3110956,
        lat: 37.50640233,
        lng: 127.0313097,
        distance: 993.2010905013943,
        facilityTypeId: 11
      },
      {
        facilityId: 62792,
        facilityName: '아크로힐스논현',
        districtId: null,
        lat: 37.509505,
        lng: 127.0389311,
        distance: 995.6615388098068,
        facilityTypeId: 12
      },
      {
        facilityId: 24016,
        facilityName: '강남연세인의원',
        districtId: 3120189,
        lat: 37.4958178806,
        lng: 127.0305144013,
        distance: 995.7793185303595,
        facilityTypeId: 5
      },
      {
        facilityId: 18971,
        facilityName: '플러스약국',
        districtId: 3120189,
        lat: 37.4988903,
        lng: 127.0292963,
        distance: 996.1468332930418,
        facilityTypeId: 2
      },
      {
        facilityId: 18819,
        facilityName: '오약국',
        districtId: 3120194,
        lat: 37.5069248,
        lng: 127.0317535,
        distance: 996.452432423666,
        facilityTypeId: 2
      },
      {
        facilityId: 59537,
        facilityName: '언주역삼정&베스트웨스턴강남',
        districtId: 3110956,
        lat: 37.50613136,
        lng: 127.0310397,
        distance: 997.2945586070923,
        facilityTypeId: 11
      },
      {
        facilityId: 30123,
        facilityName: '박치과의원',
        districtId: 3120201,
        lat: 37.4918634401248,
        lng: 127.040186107233,
        distance: 997.9167642620804,
        facilityTypeId: 5
      },
      {
        facilityId: 31286,
        facilityName: '삼성에스유외과의원',
        districtId: 3120201,
        lat: 37.4918634401248,
        lng: 127.040186107233,
        distance: 997.9167642620804,
        facilityTypeId: 5
      },
      {
        facilityId: 23088,
        facilityName: '모앤제일의원',
        districtId: 3120189,
        lat: 37.4988815245932,
        lng: 127.029281745491,
        distance: 997.9211875866229,
        facilityTypeId: 5
      },
      {
        facilityId: 23580,
        facilityName: '강남12의원',
        districtId: 3120189,
        lat: 37.4988815245932,
        lng: 127.029281745491,
        distance: 997.9211875866229,
        facilityTypeId: 5
      },
      {
        facilityId: 28254,
        facilityName: '로하셀한의원',
        districtId: 3120189,
        lat: 37.4988815245932,
        lng: 127.029281745491,
        distance: 997.9211875866229,
        facilityTypeId: 5
      },
      {
        facilityId: 28630,
        facilityName: '마음소담정신건강의학과의원',
        districtId: 3120189,
        lat: 37.4988815245932,
        lng: 127.029281745491,
        distance: 997.9211875866229,
        facilityTypeId: 5
      },
      {
        facilityId: 35857,
        facilityName: '연세라이프정신건강의학과의원',
        districtId: 3120189,
        lat: 37.4988815245932,
        lng: 127.029281745491,
        distance: 997.9211875866229,
        facilityTypeId: 5
      },
      {
        facilityId: 40786,
        facilityName: '처음처럼성형외과의원',
        districtId: 3120189,
        lat: 37.4988815245932,
        lng: 127.029281745491,
        distance: 997.9211875866229,
        facilityTypeId: 5
      },
      {
        facilityId: 23000,
        facilityName: '리셋재활의학과의원',
        districtId: 3120189,
        lat: 37.49888161495319,
        lng: 127.02928072773456,
        distance: 998.0303744533198,
        facilityTypeId: 5
      },
      {
        facilityId: 29356,
        facilityName: '미네뜨성형외과의원',
        districtId: 3120189,
        lat: 37.49888161495319,
        lng: 127.02928072773456,
        distance: 998.0303744533198,
        facilityTypeId: 5
      },
      {
        facilityId: 35588,
        facilityName: '여우한의원',
        districtId: 3120189,
        lat: 37.498881615,
        lng: 127.0292807277,
        distance: 998.0303772351873,
        facilityTypeId: 5
      },
      {
        facilityId: 43483,
        facilityName: '비디오/DVD감상실',
        districtId: 3120189,
        lat: 37.4973132259025,
        lng: 127.029729451184,
        distance: 998.7295376973781,
        facilityTypeId: 7
      },
      {
        facilityId: 59167,
        facilityName: '삼정호텔앞',
        districtId: 3110956,
        lat: 37.50624203,
        lng: 127.0311108,
        distance: 998.7869645504875,
        facilityTypeId: 11
      },
      {
        facilityId: 21142,
        facilityName: '농협은행',
        districtId: 3120201,
        lat: 37.4919842777046,
        lng: 127.0406761369,
        distance: 999.1422703451173,
        facilityTypeId: 3
      }
    ])

    const facilityType = ref([
      {
        facilityTypeId: 1,
        facilityTypeName: '관공서',
        imagePath: null
      },
      {
        facilityTypeId: 2,
        facilityTypeName: '약국',
        imagePath: null
      },
      {
        facilityTypeId: 3,
        facilityTypeName: '은행',
        imagePath: null
      },
      {
        facilityTypeId: 4,
        facilityTypeName: '대학교',
        imagePath: null
      },
      {
        facilityTypeId: 5,
        facilityTypeName: '병원',
        imagePath: null
      },
      {
        facilityTypeId: 6,
        facilityTypeName: '소극장',
        imagePath: null
      },
      {
        facilityTypeId: 7,
        facilityTypeName: '영화관',
        imagePath: null
      },
      {
        facilityTypeId: 8,
        facilityTypeName: '학교',
        imagePath: null
      },
      {
        facilityTypeId: 9,
        facilityTypeName: '숙박업소',
        imagePath: null
      },
      {
        facilityTypeId: 10,
        facilityTypeName: '지하철역',
        imagePath: null
      },
      {
        facilityTypeId: 11,
        facilityTypeName: '버스정류장',
        imagePath: null
      },
      {
        facilityTypeId: 12,
        facilityTypeName: '아파트단지수',
        imagePath: null
      }
    ])
    const input = ref({
      lat: 37.5005902,
      lng: 127.0380921,
      radius: 1000,
      initialPrice: 1000000,
      interestRate: 3.2,
      loanAmount: 10000,
      employees: 3,
      cafeSize: 20,
      brandId: 1,
      startTime: [2024, 3, 24, 12, 34, 56, 789000000]
    })
    const revenueList = ref([
      {
        revenue: 18875322,
        salesCount: 9437,
        employees: 3,
        totalCost: 14509185,
        year: 2024,
        month: 1,
        personCost: 2664900,
        etcCost: 1510025,
        materialCost: 6040103,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 18875322,
        salesCount: 9437,
        employees: 3,
        totalCost: 13976205,
        year: 2024,
        month: 2,
        personCost: 2131920,
        etcCost: 1510025,
        materialCost: 6040103,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 18875322,
        salesCount: 9437,
        employees: 3,
        totalCost: 14509185,
        year: 2024,
        month: 3,
        personCost: 2664900,
        etcCost: 1510025,
        materialCost: 6040103,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22682726,
        salesCount: 11341,
        employees: 3,
        totalCost: 16032147,
        year: 2024,
        month: 4,
        personCost: 2664900,
        etcCost: 1814618,
        materialCost: 7258472,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22682726,
        salesCount: 11341,
        employees: 3,
        totalCost: 16032147,
        year: 2024,
        month: 5,
        personCost: 2664900,
        etcCost: 1814618,
        materialCost: 7258472,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22682726,
        salesCount: 11341,
        employees: 3,
        totalCost: 16032147,
        year: 2024,
        month: 6,
        personCost: 2664900,
        etcCost: 1814618,
        materialCost: 7258472,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22563161,
        salesCount: 11281,
        employees: 3,
        totalCost: 15984321,
        year: 2024,
        month: 7,
        personCost: 2664900,
        etcCost: 1805052,
        materialCost: 7220211,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22563161,
        salesCount: 11281,
        employees: 3,
        totalCost: 15984321,
        year: 2024,
        month: 8,
        personCost: 2664900,
        etcCost: 1805052,
        materialCost: 7220211,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22563161,
        salesCount: 11281,
        employees: 3,
        totalCost: 15984321,
        year: 2024,
        month: 9,
        personCost: 2664900,
        etcCost: 1805052,
        materialCost: 7220211,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 20522868,
        salesCount: 10261,
        employees: 3,
        totalCost: 15168204,
        year: 2024,
        month: 10,
        personCost: 2664900,
        etcCost: 1641829,
        materialCost: 6567317,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 20522868,
        salesCount: 10261,
        employees: 3,
        totalCost: 15168204,
        year: 2024,
        month: 11,
        personCost: 2664900,
        etcCost: 1641829,
        materialCost: 6567317,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 20522868,
        salesCount: 10261,
        employees: 3,
        totalCost: 15168204,
        year: 2024,
        month: 12,
        personCost: 2664900,
        etcCost: 1641829,
        materialCost: 6567317,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 19179585,
        salesCount: 9589,
        employees: 3,
        totalCost: 14630891,
        year: 2025,
        month: 1,
        personCost: 2664900,
        etcCost: 1534366,
        materialCost: 6137467,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 19179585,
        salesCount: 9589,
        employees: 3,
        totalCost: 14097911,
        year: 2025,
        month: 2,
        personCost: 2131920,
        etcCost: 1534366,
        materialCost: 6137467,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 19179585,
        salesCount: 9589,
        employees: 3,
        totalCost: 14630891,
        year: 2025,
        month: 3,
        personCost: 2664900,
        etcCost: 1534366,
        materialCost: 6137467,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23048362,
        salesCount: 11524,
        employees: 3,
        totalCost: 16178401,
        year: 2025,
        month: 4,
        personCost: 2664900,
        etcCost: 1843868,
        materialCost: 7375475,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23048362,
        salesCount: 11524,
        employees: 3,
        totalCost: 16178401,
        year: 2025,
        month: 5,
        personCost: 2664900,
        etcCost: 1843868,
        materialCost: 7375475,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23048362,
        salesCount: 11524,
        employees: 3,
        totalCost: 16178401,
        year: 2025,
        month: 6,
        personCost: 2664900,
        etcCost: 1843868,
        materialCost: 7375475,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22926870,
        salesCount: 11463,
        employees: 3,
        totalCost: 16129805,
        year: 2025,
        month: 7,
        personCost: 2664900,
        etcCost: 1834149,
        materialCost: 7336598,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22926870,
        salesCount: 11463,
        employees: 3,
        totalCost: 16129805,
        year: 2025,
        month: 8,
        personCost: 2664900,
        etcCost: 1834149,
        materialCost: 7336598,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 22926870,
        salesCount: 11463,
        employees: 3,
        totalCost: 16129805,
        year: 2025,
        month: 9,
        personCost: 2664900,
        etcCost: 1834149,
        materialCost: 7336598,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 20853688,
        salesCount: 10426,
        employees: 3,
        totalCost: 15300532,
        year: 2025,
        month: 10,
        personCost: 2664900,
        etcCost: 1668295,
        materialCost: 6673180,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 20853688,
        salesCount: 10426,
        employees: 3,
        totalCost: 15300532,
        year: 2025,
        month: 11,
        personCost: 2664900,
        etcCost: 1668295,
        materialCost: 6673180,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 20853688,
        salesCount: 10426,
        employees: 3,
        totalCost: 15300532,
        year: 2025,
        month: 12,
        personCost: 2664900,
        etcCost: 1668295,
        materialCost: 6673180,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 19483847,
        salesCount: 9741,
        employees: 3,
        totalCost: 14752595,
        year: 2026,
        month: 1,
        personCost: 2664900,
        etcCost: 1558707,
        materialCost: 6234831,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 19483847,
        salesCount: 9741,
        employees: 3,
        totalCost: 14219615,
        year: 2026,
        month: 2,
        personCost: 2131920,
        etcCost: 1558707,
        materialCost: 6234831,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 19483847,
        salesCount: 9741,
        employees: 3,
        totalCost: 14752595,
        year: 2026,
        month: 3,
        personCost: 2664900,
        etcCost: 1558707,
        materialCost: 6234831,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23413998,
        salesCount: 11706,
        employees: 3,
        totalCost: 16324656,
        year: 2026,
        month: 4,
        personCost: 2664900,
        etcCost: 1873119,
        materialCost: 7492479,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23413998,
        salesCount: 11706,
        employees: 3,
        totalCost: 16324656,
        year: 2026,
        month: 5,
        personCost: 2664900,
        etcCost: 1873119,
        materialCost: 7492479,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23413998,
        salesCount: 11706,
        employees: 3,
        totalCost: 16324656,
        year: 2026,
        month: 6,
        personCost: 2664900,
        etcCost: 1873119,
        materialCost: 7492479,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23290579,
        salesCount: 11645,
        employees: 3,
        totalCost: 16275288,
        year: 2026,
        month: 7,
        personCost: 2664900,
        etcCost: 1863246,
        materialCost: 7452985,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23290579,
        salesCount: 11645,
        employees: 3,
        totalCost: 16275288,
        year: 2026,
        month: 8,
        personCost: 2664900,
        etcCost: 1863246,
        materialCost: 7452985,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 23290579,
        salesCount: 11645,
        employees: 3,
        totalCost: 16275288,
        year: 2026,
        month: 9,
        personCost: 2664900,
        etcCost: 1863246,
        materialCost: 7452985,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 21184508,
        salesCount: 10592,
        employees: 3,
        totalCost: 15432860,
        year: 2026,
        month: 10,
        personCost: 2664900,
        etcCost: 1694760,
        materialCost: 6779042,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 21184508,
        salesCount: 10592,
        employees: 3,
        totalCost: 15432860,
        year: 2026,
        month: 11,
        personCost: 2664900,
        etcCost: 1694760,
        materialCost: 6779042,
        rentCost: 4283212,
        loanCost: 10944
      },
      {
        revenue: 21184508,
        salesCount: 10592,
        employees: 3,
        totalCost: 15432860,
        year: 2026,
        month: 12,
        personCost: 2664900,
        etcCost: 1694760,
        materialCost: 6779042,
        rentCost: 4283212,
        loanCost: 10944
      }
    ])
    const facilityTypeList = ref([
      {
        facilityTypeId: 1,
        facilityTypeName: '관공서',
        imagePath: null
      },
      {
        facilityTypeId: 2,
        facilityTypeName: '약국',
        imagePath: null
      },
      {
        facilityTypeId: 3,
        facilityTypeName: '은행',
        imagePath: null
      },
      {
        facilityTypeId: 4,
        facilityTypeName: '대학교',
        imagePath: null
      },
      {
        facilityTypeId: 5,
        facilityTypeName: '병원',
        imagePath: null
      },
      {
        facilityTypeId: 6,
        facilityTypeName: '소극장',
        imagePath: null
      },
      {
        facilityTypeId: 7,
        facilityTypeName: '영화관',
        imagePath: null
      },
      {
        facilityTypeId: 8,
        facilityTypeName: '학교',
        imagePath: null
      },
      {
        facilityTypeId: 9,
        facilityTypeName: '숙박업소',
        imagePath: null
      },
      {
        facilityTypeId: 10,
        facilityTypeName: '지하철역',
        imagePath: null
      },
      {
        facilityTypeId: 11,
        facilityTypeName: '버스정류장',
        imagePath: null
      },
      {
        facilityTypeId: 12,
        facilityTypeName: '아파트단지수',
        imagePath: null
      }
    ])
    const updateLog = ref([])
    const beforeRevenueList = ref([])
    const latestRevenueList = ref([])
    const numOfFacilityPerType = ref([])

    // ----------------------------
    // 년 별 매출액, 매출총이익, 영업이익, 당기 순이익
    // TODO : 월 별 데이터 업데이트 필요

    const total_revenue = ref([0, 0, 0]) // 매출액
    const total_gross_profit = ref([0, 0, 0]) // 매출총이익
    const total_operating_profit = ref([0, 0, 0]) // 영업이익
    const total_net_income = ref([0, 0, 0]) // 당기 순이익

    const total_person_cost = ref([0, 0, 0]) // 인건비
    const total_rent_cost = ref([0, 0, 0]) // 임대료
    const depreciation = ref(Math.floor(selectBrand.value.interiorAmount / 5)) // 감가상각비(인테리어비용/5년)

    const total_interest_cost = ref([0, 0, 0]) // 대출이자
    const total_etc_cost = ref([0, 0, 0]) // 기타비용

    const cash = ref([0, 0, 0]) // 유동자산
    const interior_asset = ref([0, 0, 0]) //비유동자산
    const equity = ref([0, 0, 0]) //자본

    // 상태 값 변경 감지하여 업데이트
    watch(revenueList, (newValue, oldValue) => {
      console.log('revenueList changed', newValue)
      updateRevenueList()
    })

    const updateRevenueList = function () {
      total_revenue.value = [0, 0, 0]
      total_person_cost.value = [0, 0, 0]
      total_rent_cost.value = [0, 0, 0]
      total_etc_cost.value = [0, 0, 0]

      // 년 별 매출액 계산
      console.log('revenueList.value.length', revenueList.value.length)
      for (let i = 0; i < revenueList.value.length; i++) {
        total_revenue.value[parseInt(i / 12)] += revenueList.value[i].revenue
      }
      total_gross_profit.value = total_revenue.value.slice()
      console.log('total_revenue', total_revenue.value)

      // 년 별 매출총이익 계산
      for (let i = 0; i < revenueList.value.length; i++) {
        total_gross_profit.value[parseInt(i / 12)] -= revenueList.value[i].materialCost // 재료비 추가
      }
      total_operating_profit.value = total_gross_profit.value.slice()
      console.log('total_gross_profit', total_gross_profit.value)

      // 년 별 영업이익 계산
      for (let i = 0; i < revenueList.value.length; i++) {
        total_person_cost.value[parseInt(i / 12)] += revenueList.value[i].personCost // 인건비
        total_rent_cost.value[parseInt(i / 12)] += revenueList.value[i].rentCost // 임대료
        total_operating_profit.value[parseInt(i / 12)] -=
          revenueList.value[i].personCost + revenueList.value[i].rentCost // 인건비 + 임대료 추가
      }

      total_net_income.value = total_operating_profit.value.slice()
      console.log('total_operating_profit', total_operating_profit.value)

      // 년 별 당기 순이익 계산
      for (let i = 0; i < revenueList.value.length; i++) {
        total_interest_cost.value[parseInt(i / 12)] += revenueList.value[i].loanCost // 대출이자
        total_etc_cost.value[parseInt(i / 12)] += revenueList.value[i].etcCost // 기타비용
        total_net_income.value[parseInt(i / 12)] -=
          revenueList.value[i].etcCost + revenueList.value[i].loanCost // 기타비용 추가 + 대출이자 추가
      }
      console.log('total_net_income', total_net_income.value)

      // ----재무상태표 값 계산 ----

      // 1년차
      cash.value[0] = input.value.initialPrice + input.value.loanAmount + total_net_income.value[0] // 유동자산 = 초기투자금 + 대출금 + 당기순이익
      interior_asset.value[0] = selectBrand.value.interiorAmount // 비유동자산 = 인테리어비용
      equity.value[0] = input.value.initialPrice // 자본 = 초기투자금

      // 2년차
      cash.value[1] = cash.value[0] + total_net_income.value[0] // 유동자산 = 1년차 유동자산 + 1년차 당기순이익
      interior_asset.value[1] = interior_asset.value[0] - depreciation.value // 비유동자산 = 1년차 비유동자산 - 감가상각비
      equity.value[1] = equity.value[0] + total_net_income.value[0] // 자본 = 1년차 자본 + 1년차 당기순이익

      // 3년차
      cash.value[2] = cash.value[1] + total_net_income.value[1] // 유동자산 = 2년차 유동자산 + 2년차 당기순이익
      interior_asset.value[2] = interior_asset.value[1] - depreciation.value // 비유동자산 = 2년차 비유동자산 - 감가상각비
      equity.value[2] = equity.value[1] + total_net_income.value[1] // 자본 = 2년차 자본 + 2년차 당기순이익
    }

    // -------------------

    async function setUuid(data) {
      uuid.value = data
    }
    async function setInitPrice(data) {
      initPrice.value = data
    }
    async function setSelectBrand(data) {
      selectBrand.value = data
    }
    async function setFacilityList(data) {
      facilityList.value = data
    }
    async function setInput(data) {
      input.value = data
    }
    async function setRevenueList(data) {
      revenueList.value = data
    }
    async function setFacilityTypeList(data) {
      facilityTypeList.value = data
    }
    async function setFacilityType(data) {
      facilityType.value = data
    }

    async function setLocation(data) {
      location.value = data
    }

    async function setUpdateLog(data) {
      updateLog.value = data
    }

    async function setBeforeRevenueList(data) {
      beforeRevenueList.value = data
    }

    async function setLatestRevenueList(data) {
      latestRevenueList.value = data
    }

    async function setNumOfFacilityPerType(data) {
      numOfFacilityPerType.value = data
    }

    async function clearData() {
      location.value = null
    }

    return {
      uuid,
      initPrice,
      selectBrand,
      facilityList,
      input,
      revenueList,
      facilityTypeList,
      facilityType,
      total_revenue,
      total_gross_profit,
      total_operating_profit,
      total_net_income,
      total_person_cost,
      total_rent_cost,
      depreciation,
      cash,
      interior_asset,
      equity,
      total_interest_cost,
      total_etc_cost,
      simStarted,
      simDialog,
      updateLog,
      beforeRevenueList,
      latestRevenueList,
      numOfFacilityPerType,

      setUuid,
      setInitPrice,
      setSelectBrand,
      setFacilityList,
      setInput,
      setRevenueList,
      setFacilityTypeList,
      setFacilityType,
      setLocation,
      updateRevenueList,
      setUpdateLog,
      setBeforeRevenueList,
      setLatestRevenueList,
      setNumOfFacilityPerType,
      clearData
    }
  },
  { persist: true }
)
