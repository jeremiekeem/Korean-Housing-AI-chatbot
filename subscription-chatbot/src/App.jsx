import { useState, useRef, useEffect } from "react";

const CATS = [
  {id:"intro",icon:"📖",title:"청약이 처음이에요",sub:"기초 개념 이해",hq:"청약 기본 이해에 대해 어떤 점이 궁금하신가요?",qs:["청약이란 무엇인가요?","청약은 왜 하는 건가요?","청약은 누가 신청할 수 있나요?","공공분양과 민간분양은 무엇이 다른가요?","특별공급과 일반공급은 무엇이 다른가요?","청약은 어디서 신청하나요?","청약 신청 절차는 어떻게 진행되나요?"]},
  {id:"qualify",icon:"✅",title:"내가 청약 가능한지",sub:"자격 조건 확인",hq:"청약 신청을 하려면 어떤 조건이 필요한가요?",qs:["무주택자만 청약할 수 있나요?","세대주가 아니어도 청약할 수 있나요?","청약은 몇 살부터 신청할 수 있나요?","청약통장이 없으면 청약할 수 없나요?","한 번 당첨되면 다시 청약할 수 있나요?","배우자가 집이 있으면 청약이 불가능한가요?","오피스텔을 가지고 있어도 무주택인가요?","분양권을 가지고 있으면 무주택인가요?","무주택 기간은 언제부터 계산하나요?"]},
  {id:"score",icon:"🎯",title:"내 가점이 궁금해요",sub:"가점 계산 & 전략",hq:"청약 가점은 어떻게 계산하나요?",qs:["청약 가점은 최대 몇 점인가요?","가점이 낮으면 당첨이 어려운가요?","부양가족 수는 어떻게 계산하나요?","무주택 기간 점수는 어떻게 계산하나요?","청약통장 가입기간 점수는 어떻게 계산하나요?","가점이 낮은 사람은 어떻게 전략을 세워야 하나요?"]},
  {id:"special",icon:"⭐",title:"특별공급 알아보기",sub:"신혼·생애최초 등",hq:"특별공급에 대해 어떤 점이 궁금하신가요?",qs:["특별공급이란 무엇인가요?","신혼부부 특별공급 조건은?","생애최초 특별공급 조건은?","다자녀 특별공급은 어떤 경우 신청할 수 있나요?","특별공급은 몇 번 신청할 수 있나요?","특별공급과 일반공급을 동시에 신청할 수 있나요?"]},
  {id:"area",icon:"📊",title:"어디 청약 넣을까요",sub:"당첨 전략 & 지역",hq:"청약 전략에 대해 어떤 점이 궁금하신가요?",qs:["청약 당첨 확률은 어떻게 결정되나요?","가점제와 추첨제는 무엇이 다른가요?","가점이 낮으면 어떤 아파트를 노려야 하나요?","청약 경쟁률은 어디서 확인할 수 있나요?","지역 거주 기간이 청약에 영향을 주나요?"]},
  {id:"after",icon:"🏠",title:"당첨 후 절차",sub:"계약·대출·절차",hq:"청약 신청 이후에 대해 어떤 점이 궁금하신가요?",qs:["청약 당첨되면 무엇을 해야 하나요?","청약 당첨 후 포기하면 어떻게 되나요?","청약 당첨 후 계약금은 얼마인가요?","청약 당첨 후 대출은 가능한가요?"]}
];

const QA = {
"청약이란 무엇인가요?":"청약이란 아직 지어지지 않은 아파트를 분양받기 위해 사전에 신청하는 제도예요.\n\n💡 상세 설명\n① 건설사가 아파트 분양 공고를 냄\n② 조건에 맞는 사람들이 청약 신청\n③ 경쟁이 있을 경우 가점순/추첨으로 당첨자 선정\n④ 당첨자는 계약 → 중도금 → 잔금 납부 → 입주\n\n⚡ 청약통장이 있어야 대부분의 청약에 참여할 수 있어요.\n📌 출처: 청약홈 (applyhome.co.kr)",
"청약은 왜 하는 건가요?":"신축 아파트를 시세보다 저렴하게 살 수 있는 거의 유일한 방법이기 때문이에요.\n\n💡 상세 설명\n① 분양가 < 시세 차이로 시작부터 프리미엄(시세차익) 발생\n② 새 아파트라 하자·노후 걱정 없음\n③ 정부 규제로 분양가 상한제 적용 단지는 더 큰 혜택\n④ 당첨 시 대출(중도금·잔금 대출) 조건도 유리\n\n⚡ 인기 단지는 수십 대 1 경쟁률! 전략적 접근이 필요해요.\n📌 출처: 국토교통부",
"청약은 누가 신청할 수 있나요?":"만 19세 이상 성인이라면 누구나 기본 자격이 있어요.\n\n💡 상세 설명\n기본 조건:\n① 만 19세 이상\n② 청약통장 보유\n③ 해당 주택 유형별 추가 자격 충족\n\n주택 유형별 차이:\n• 공공분양: 무주택 세대구성원 조건 더 엄격\n• 민간분양: 상대적으로 조건 완화\n• 특별공급: 신혼부부·생애최초 등 별도 자격\n\n⚡ 세부 조건은 공고문마다 다르니 반드시 확인하세요!\n📌 출처: 청약홈",
"공공분양과 민간분양은 무엇이 다른가요?":"공급 주체와 자격 조건, 분양가에서 큰 차이가 있어요.\n\n💡 상세 설명\n공공분양 — LH·SH 등 공공기관 공급, 시세보다 훨씬 저렴, 무주택·소득·자산 제한 엄격\n민간분양 — 민간 건설사 공급, 시세와 비슷하거나 높음, 자격 조건 상대적으로 완화\n\n⚡ 공공분양은 조건이 까다롭지만 혜택이 커요!\n📌 출처: 국토교통부·LH공사",
"특별공급과 일반공급은 무엇이 다른가요?":"특별공급은 특정 계층을 위해 별도 물량을 배정하는 제도예요.\n\n💡 상세 설명\n• 특별공급: 신혼부부·생애최초·다자녀 등 사회적 배려 계층 대상\n• 일반공급: 나머지 물량을 가점제·추첨제로 경쟁\n\n핵심 차이:\n① 특별공급 당첨 이력 있으면 다시 특별공급 신청 불가 (평생 1회)\n② 같은 날 특별공급 + 일반공급 동시 신청 가능\n\n⚡ 해당 특별공급 유형이 있다면 꼭 활용하세요!\n📌 출처: 청약홈",
"청약은 어디서 신청하나요?":"청약홈(applyhome.co.kr)에서 온라인으로 신청해요.\n\n💡 상세 설명\n① 청약홈 (applyhome.co.kr) — 가장 기본\n② 은행 앱/인터넷뱅킹 — 청약통장 가입 은행에서도 신청 가능\n\n준비물: 공동인증서, 청약통장 정보, 주민등록번호\n\n⚡ 청약 신청 기간은 보통 2~3일! 공고문 날짜를 꼭 확인하세요.\n📌 출처: 청약홈",
"청약 신청 절차는 어떻게 진행되나요?":"공고 확인 → 자격 확인 → 청약 신청 → 당첨자 발표 순으로 진행돼요.\n\n💡 상세 설명\n① 분양 공고 확인\n② 입주자 모집공고문 꼼꼼히 읽기\n③ 청약통장 납입 횟수·금액 확인\n④ 청약홈에서 신청\n⑤ 당첨자 발표 확인\n⑥ 당첨 시 서류 제출 → 계약 체결\n\n⚡ 1·2순위 청약일이 다르므로 본인 순위 먼저 확인!\n📌 출처: 청약홈",
"무주택자만 청약할 수 있나요?":"아니요, 유주택자도 민간분양 일반공급에는 청약할 수 있어요.\n\n💡 상세 설명\n• 공공분양: 무주택 세대구성원만 신청 가능\n• 민간분양 특별공급: 무주택자만 가능\n• 민간분양 일반공급: 유주택자도 2순위로 신청 가능\n\n유주택자 불이익:\n① 가점에서 무주택 기간 점수 0점\n② 투기과열지구 등에서 무주택자 우선\n\n⚡ 유주택자라도 추첨제 물량이 있는 단지는 도전 가능!\n📌 출처: 주택공급에 관한 규칙",
"세대주가 아니어도 청약할 수 있나요?":"네, 세대원도 청약할 수 있어요.\n\n💡 상세 설명\n• 민간분양: 세대원도 청약 가능 (1순위 가능)\n• 공공분양: 세대주 우선 공급 있음, 세대원은 일부 유형 제한\n\n주의사항:\n① 같은 세대 내 중복 청약 불가\n② 세대주가 아니면 가점 산정 시 불리할 수 있음\n\n⚡ 결혼 예정이라면 세대 분리 전략도 고려해보세요!\n📌 출처: 주택공급에 관한 규칙",
"청약은 몇 살부터 신청할 수 있나요?":"만 19세 이상이면 신청 가능해요.\n\n💡 상세 설명\n기본: 만 19세 이상\n예외적으로 미성년자 가능:\n① 자녀가 있는 세대주인 미성년자\n② 직계존속이 없어 본인이 세대주인 경우\n\n청약통장은 태어나자마자 가입 가능!\n\n⚡ 자녀 명의로 청약통장 일찍 만들어 두는 게 유리해요.\n📌 출처: 주택공급에 관한 규칙",
"청약통장이 없으면 청약할 수 없나요?":"실질적으로 청약통장 없이는 청약이 매우 어려워요.\n\n💡 상세 설명\n• 공공분양: 청약통장 필수\n• 민간분양 1순위: 청약통장 필수\n• 민간분양 2순위: 통장 없어도 가능하나 물량 거의 없음\n\n신규 가입 가능: 주택청약종합저축 (가장 범용)\n\n⚡ 지금 바로 주택청약종합저축 가입하세요!\n📌 출처: 청약홈",
"한 번 당첨되면 다시 청약할 수 있나요?":"당첨 이력이 있으면 일정 기간 청약이 제한돼요.\n\n💡 상세 설명\n재당첨 제한 기간:\n• 투기과열지구: 10년\n• 청약과열지역: 7년\n• 수도권 공공분양: 5년\n• 일반 민간분양: 1~5년\n\n특별공급은 평생 1회만 당첨 가능\n\n⚡ 당첨 이력은 청약홈에서 확인 가능해요.\n📌 출처: 주택공급에 관한 규칙",
"배우자가 집이 있으면 청약이 불가능한가요?":"배우자 소유 주택도 본인 가구의 주택으로 봐요.\n\n💡 상세 설명\n• 주택청약에서 배우자는 항상 같은 세대로 판단\n→ 배우자가 주택 소유 시 본인도 유주택자로 간주\n\n⚡ 결혼 전 청약을 고려하는 이유 중 하나예요.\n📌 출처: 주택공급에 관한 규칙",
"오피스텔을 가지고 있어도 무주택인가요?":"네! 오피스텔은 주택이 아니라서 무주택으로 인정돼요.\n\n💡 상세 설명\n무주택으로 인정:\n✅ 오피스텔, 상가·사무실, 토지만 소유\n\n주택으로 보는 것:\n❌ 아파트·연립·다세대·단독주택\n❌ 분양권·입주권\n❌ 주거용 오피스텔 (일부 공공분양)\n\n⚡ 공고문에서 주거용 오피스텔 인정 여부를 꼭 확인하세요!\n📌 출처: 주택공급에 관한 규칙",
"분양권을 가지고 있으면 무주택인가요?":"아니요, 분양권은 주택으로 간주돼요.\n\n💡 상세 설명\n2018년 12월 11일부터 분양권도 주택 수에 포함됩니다.\n• 분양권 취득 시점부터 유주택자로 간주\n• 입주권도 동일하게 적용\n\n⚡ 분양권 처분 후 무주택 기간이 새로 산정될 수 있어요.\n📌 출처: 주택공급에 관한 규칙",
"무주택 기간은 언제부터 계산하나요?":"만 30세 또는 혼인 시점 중 빠른 날부터 계산해요.\n\n💡 상세 설명\n• 만 30세 생일\n• 또는 혼인신고일 (만 30세 이전 결혼 시)\n→ 둘 중 더 빠른 날부터 계산\n\n⚡ 30세 이전에 결혼하면 무주택 기간이 더 길어져 유리해요!\n📌 출처: 주택공급에 관한 규칙",
"청약 가점은 어떻게 계산하나요?":"무주택 기간 + 부양가족 수 + 청약통장 가입기간 합산이에요.\n\n💡 상세 설명\n3개 항목 합산 (최대 84점):\n① 무주택 기간 (최대 32점): 1년 미만 2점 ~ 15년 이상 32점\n② 부양가족 수 (최대 35점): 0명 5점 ~ 6명 이상 35점\n③ 청약통장 가입기간 (최대 17점): 6개월 미만 1점 ~ 15년 이상 17점\n\n⚡ 부양가족 점수가 가장 크므로 가족 수가 중요해요!\n📌 출처: 주택공급에 관한 규칙",
"청약 가점은 최대 몇 점인가요?":"최대 84점이에요.\n\n💡 상세 설명\n• 무주택 기간 최대: 32점 (15년 이상)\n• 부양가족 수 최대: 35점 (6명 이상)\n• 청약통장 가입기간 최대: 17점 (15년 이상)\n\n⚡ 서울 인기 단지는 60~70점대도 낙첨될 수 있어요.\n📌 출처: 주택공급에 관한 규칙",
"가점이 낮으면 당첨이 어려운가요?":"가점제 비율이 높은 단지는 어렵지만, 추첨제를 노리면 돼요.\n\n💡 상세 설명\n• 투기과열지구 85㎡ 이하: 가점 100%\n• 청약과열지역: 가점 75%, 추첨 25%\n• 지방·비규제: 추첨 비율 높음\n\n⚡ 가점이 낮아도 전략적 접근으로 당첨 가능해요!\n📌 출처: 주택공급에 관한 규칙",
"부양가족 수는 어떻게 계산하나요?":"같은 주민등록등본에 올라있는 직계존·비속을 세요.\n\n💡 상세 설명\n① 배우자 (세대 분리돼도 인정)\n② 직계존속 (부모·조부모) — 3년 이상 같이 등록 시\n③ 직계비속 (자녀·손자녀) — 미혼이고 같은 등본에 있어야\n④ 형제자매는 제외\n\n점수: 0명=5점, 1명=10점, 2명=15점, 3명=20점, 4명=25점, 5명=30점, 6명+=35점\n\n⚡ 본인은 부양가족 수에 포함되지 않아요!\n📌 출처: 주택공급에 관한 규칙",
"무주택 기간 점수는 어떻게 계산하나요?":"무주택 기간에 따라 2점~32점을 받아요.\n\n💡 상세 설명\n1년 미만 2점 / 1~2년 4점 / 2~3년 6점 / 3~4년 8점\n4~5년 10점 / 5~6년 12점 / 6~7년 14점 / 7~8년 16점\n8~9년 18점 / 9~10년 20점 / 10~11년 22점 / 11~12년 24점\n12~13년 26점 / 13~14년 28점 / 14~15년 30점 / 15년+ 32점\n\n⚡ 기산일은 만 30세 또는 혼인신고일 중 빠른 날!\n📌 출처: 주택공급에 관한 규칙",
"청약통장 가입기간 점수는 어떻게 계산하나요?":"가입기간에 따라 1점~17점을 받아요.\n\n💡 상세 설명\n6개월 미만 1점 / 6개월~1년 2점 / 1~2년 3점 / 2~3년 4점\n3~4년 5점 / 4~5년 6점 / 5~6년 7점 / 6~7년 8점\n7~8년 9점 / 8~9년 10점 / 9~10년 11점 / 10~11년 12점\n11~12년 13점 / 12~13년 14점 / 13~14년 15점 / 14~15년 16점 / 15년+ 17점\n\n⚡ 어릴 때 만들수록 유리! 자녀 청약통장은 일찍 개설하세요.\n📌 출처: 주택공급에 관한 규칙",
"가점이 낮은 사람은 어떻게 전략을 세워야 하나요?":"추첨제 비율 높은 단지, 특별공급, 지방 청약을 공략하세요.\n\n💡 상세 설명\n전략 ①: 추첨제 물량 노리기 — 전용 85㎡ 초과 / 비규제지역 / 지방 신규 단지\n전략 ②: 특별공급 자격 확인 — 신혼부부·생애최초·다자녀\n전략 ③: 장기 전략 — 무주택 유지 + 청약통장 꾸준히 납입\n전략 ④: 미달 단지 집중 — 납입 횟수만 되면 당첨 가능\n\n⚡ 가점은 매년 오르니 포기하지 마세요!\n📌 출처: 부동산 전문가 종합 의견",
"특별공급이란 무엇인가요?":"사회적 배려 계층을 위해 일반 경쟁 없이 별도 물량을 배정하는 제도예요.\n\n💡 상세 설명\n① 신혼부부 특별공급\n② 생애최초 특별공급\n③ 다자녀가구 특별공급\n④ 노부모 부양 특별공급\n⑤ 기관추천 특별공급 (장애인·국가유공자 등)\n\n핵심: 평생 1회만 당첨 가능 / 일반공급과 중복 신청 가능 / 무주택자만 신청\n\n⚡ 해당되는 유형이 있다면 반드시 활용하세요!\n📌 출처: 주택공급에 관한 규칙",
"신혼부부 특별공급 조건은?":"혼인 기간 7년 이내 무주택 부부가 대상이에요.\n\n💡 상세 설명\n① 혼인 기간 7년 이내\n② 무주택 세대구성원\n③ 소득 기준: 공공분양 100~120%, 민간분양 160% 이하\n자녀 수가 많을수록 우선 배정\n\n⚡ 결혼 후 7년이 지나기 전에 꼭 노려보세요!\n📌 출처: 주택공급에 관한 규칙",
"생애최초 특별공급 조건은?":"생애 처음으로 주택을 구입하는 무주택자를 위한 제도예요.\n\n💡 상세 설명\n① 세대원 전원 과거 주택 소유 이력 없음\n② 현재 무주택\n③ 소득 기준 130% 이하\n④ 5년 이상 소득세 납부 이력\n⑤ 청약통장 24회 이상 납입\n혼인 여부 무관 (미혼도 가능!)\n\n⚡ 부모님이 집이 있어도 본인 세대가 소유 이력 없으면 가능!\n📌 출처: 주택공급에 관한 규칙",
"다자녀 특별공급은 어떤 경우 신청할 수 있나요?":"미성년 자녀 3명 이상인 무주택 가구가 대상이에요.\n\n💡 상세 설명\n① 미성년 자녀 3명 이상 (태아·입양 포함)\n② 무주택 세대구성원\n\n⚡ 2명이면 해당 안 되니, 셋째 계획 중이라면 출산 후 신청하세요!\n📌 출처: 주택공급에 관한 규칙",
"특별공급은 몇 번 신청할 수 있나요?":"신청은 횟수 제한 없지만 당첨은 평생 1회만 가능해요.\n\n💡 상세 설명\n• 신청: 횟수 제한 없음\n• 당첨: 평생 1회 (유형 무관 통합)\n예: 신혼부부 특공 당첨 → 이후 생애최초 특공 신청 불가\n\n⚡ 특별공급 당첨 이력은 청약홈에서 확인 가능해요.\n📌 출처: 주택공급에 관한 규칙",
"특별공급과 일반공급을 동시에 신청할 수 있나요?":"네, 같은 단지의 특별공급과 일반공급을 동시에 신청할 수 있어요.\n\n💡 상세 설명\n① 특별공급 + 일반공급 동시 신청 가능\n② 특별공급 당첨 시 일반공급 당첨 무효\n③ 특별공급 낙첨 시 일반공급 결과 유효\n\n주의: 서로 다른 단지에 같은 날 신청 불가\n\n⚡ 반드시 둘 다 신청하는 습관을!\n📌 출처: 주택공급에 관한 규칙",
"청약 당첨 확률은 어떻게 결정되나요?":"공급 세대수 대비 신청자 수(경쟁률)와 본인 가점·순위로 결정돼요.\n\n💡 상세 설명\n① 경쟁률 = 신청자 수 ÷ 공급 세대수\n② 가점제: 가점 높은 순으로 당첨\n③ 추첨제: 100% 랜덤 추첨\n\n⚡ 경쟁률 1:1 이하 미달 단지는 통장만 있어도 당첨!\n📌 출처: 청약홈",
"가점제와 추첨제는 무엇이 다른가요?":"가점제는 점수 순, 추첨제는 랜덤으로 당첨자를 선정해요.\n\n💡 상세 설명\n투기과열지구 85㎡ 이하: 가점 100%\n청약과열지역: 가점 75% / 추첨 25%\n수도권 기타: 가점 40% / 추첨 60%\n비규제지역: 추첨 비율 높음\n\n⚡ 가점 낮다면 추첨제 비율 높은 지역을 노리세요!\n📌 출처: 주택공급에 관한 규칙",
"가점이 낮으면 어떤 아파트를 노려야 하나요?":"추첨제 물량이 많거나 경쟁률이 낮은 단지를 노리세요.\n\n💡 상세 설명\n✅ 비규제지역 단지\n✅ 전용 85㎡ 초과 중대형\n✅ 지방 미분양 우려 단지\n❌ 서울 강남권 (가점 60점+ 필요)\n❌ 투기과열지구 소형 평형\n\n⚡ 선택과 집중이 핵심!\n📌 출처: 부동산 분석 자료",
"청약 경쟁률은 어디서 확인할 수 있나요?":"청약홈과 부동산 정보 사이트에서 확인할 수 있어요.\n\n💡 상세 설명\n실시간: 청약홈 (applyhome.co.kr) → 청약 결과\n과거 경쟁률: 부동산114, 닥터아파트\n\n체크할 것: 주택형별 경쟁률 / 가점 커트라인 / 1·2순위 경쟁률\n\n⚡ 청약 전 반드시 과거 비슷한 단지 경쟁률을 조사하세요!\n📌 출처: 청약홈·부동산114",
"지역 거주 기간이 청약에 영향을 주나요?":"네, 지역 우선공급 기준이 있어서 거주 기간이 중요해요.\n\n💡 상세 설명\n• 서울 단지 → 서울 거주자 1순위 우선\n• 지방 광역시 → 해당 시·도 거주자 우선 공급\n• 거주 기간 짧으면 2순위로 밀릴 수 있음\n\n⚡ 이사 계획이 있다면 전입신고 시점도 전략적으로 고려하세요.\n📌 출처: 주택공급에 관한 규칙",
"청약 당첨되면 무엇을 해야 하나요?":"당첨 후에는 서류 제출 → 자격 검증 → 계약 체결 순서로 진행됩니다.\n\n💡 상세 설명\n① 당첨자 발표 확인 (청약홈)\n② 서류 제출 (보통 3~5일 내): 주민등록등본, 청약통장, 무주택확인서 등\n③ 자격 검증 통과 시 계약 진행\n④ 계약금 납부 (보통 분양가의 10%)\n⑤ 중도금·잔금 일정에 따라 납부\n\n⚡ 발표 후 서류 제출까지 시간이 촉박! 미리 준비해두세요.\n📌 출처: 청약홈",
"청약 당첨 후 포기하면 어떻게 되나요?":"재당첨 제한을 받고 청약 자격에 불이익이 생겨요.\n\n💡 상세 설명\n① 재당첨 제한 기간 적용 (1~10년)\n② 특별공급 당첨 이력 영구 기록\n③ 계약 후 포기 시 계약금 환불 불가\n\n⚡ 당첨 전 반드시 자금 계획을 세워두세요!\n📌 출처: 주택공급에 관한 규칙",
"청약 당첨 후 계약금은 얼마인가요?":"보통 분양가의 10%예요.\n\n💡 상세 설명\n• 계약금: 분양가의 10% (계약 시)\n• 중도금: 분양가의 60% (6회 분납)\n• 잔금: 분양가의 30% (입주 시)\n\n예시 (5억): 계약금 5,000만원 / 중도금 3억 / 잔금 1억5천\n\n⚡ 계약금은 현금으로 준비해야 해요. 대출 안 됩니다!\n📌 출처: 분양 표준계약서",
"청약 당첨 후 대출은 가능한가요?":"네, 중도금 대출과 잔금 대출 모두 가능해요.\n\n💡 상세 설명\n① 중도금 대출: 분양가 9억 이하 최대 60%\n② 잔금 대출: 입주 시점 실행, DSR 규제 적용\n\n정책 대출:\n• 디딤돌 대출: 연 2~3%대\n• 보금자리론: 고정금리 장기 대출\n\n⚡ 대출 한도는 자주 바뀌니 최신 규정 꼭 확인!\n📌 출처: 주택도시기금·금융감독원"
};

function findAnswer(q) {
  const clean = q.trim().replace(/[?？]/g, '');
  for (const [k, v] of Object.entries(QA)) {
    if (q.trim() === k) return v;
    if (k.replace(/[?？]/g,'').includes(clean) || clean.includes(k.replace(/[?？]/g,''))) return v;
  }
  const words = clean.split(/\s+/).filter(w => w.length > 1);
  let best = null, bestScore = 0;
  for (const [k, v] of Object.entries(QA)) {
    const score = words.filter(w => k.includes(w)).length;
    if (score > bestScore) { bestScore = score; best = v; }
  }
  return bestScore >= 2 ? best : null;
}

export default function App() {
  const [view, setView] = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  function sendMsg(text, base) {
    if (!text.trim() || loading) return;
    const newMsgs = [...(base ?? msgs), { role: "user", content: text }];
    setMsgs(newMsgs);
    setInput("");
    setLoading(true);
    setView("chat");
    setTimeout(() => {
      const ans = findAnswer(text) ||
        `"${text}"에 대한 정보를 찾지 못했어요. 😅\n\n카테고리 버튼을 눌러 관련 질문을 선택하시거나, 더 구체적으로 질문해 주세요!\n예) "청약 가점 계산", "신혼부부 특별공급 조건"`;
      setMsgs([...newMsgs, { role: "assistant", content: ans }]);
      setLoading(false);
    }, 700);
  }

  function goHome() { setView("home"); setMsgs([]); setActiveCat(null); }

  const Avatar = ({ onClick }) => (
    <div onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 11, flexShrink: 0,
      background: "linear-gradient(135deg,#ff7d2f,#e85d04)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 20, cursor: onClick ? "pointer" : "default",
    }}>🏠</div>
  );

  const BotBubble = ({ children }) => (
    <div style={{
      background: "#1c1c1c", border: "1px solid #282828",
      borderRadius: "4px 16px 16px 16px",
      padding: "13px 15px", fontSize: 14, lineHeight: 1.8,
      whiteSpace: "pre-wrap", maxWidth: "82%", color: "#ececec",
    }}>{children}</div>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#0d0d0d", color: "#f0f0f0",
      fontFamily: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
      display: "flex", flexDirection: "column", maxWidth: 480, margin: "0 auto",
    }}>
      {/* Header */}
      <div style={{ background: "#161616", borderBottom: "1px solid #232323", padding: "12px 18px", display: "flex", alignItems: "center", gap: 11, flexShrink: 0 }}>
        <Avatar onClick={goHome} />
        <div style={{ marginLeft: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>청약 AI 상담봇</div>
          <div style={{ fontSize: 11, color: "#22c55e", display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            청약 전문 AI · 24시간 운영
          </div>
        </div>
        <div style={{ marginLeft: "auto", background: "#ff7d2f", color: "#fff", fontSize: 11, padding: "3px 9px", borderRadius: 6, fontWeight: 700 }}>AI 답변</div>
      </div>

      {/* Scroll */}
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px" }}>
        {view === "home" && (
          <>
            <div style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 16 }}>
              <Avatar />
              <BotBubble>
                <b>안녕하세요! 저는 <span style={{ color: "#ff7d2f" }}>청약 AI 상담봇</span>이에요 👋</b>
                {"\n\n"}
                <span style={{ color: "#aaa", fontSize: 13 }}>청약에 대해 궁금한 것들을 편하게 물어보세요.{"\n"}아래 항목을 선택하거나, 직접 질문을 입력해 주세요!</span>
              </BotBubble>
            </div>
            <div style={{ marginLeft: 49, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {CATS.map(cat => (
                <button key={cat.id} onClick={() => { setActiveCat(cat); setView("category"); }} style={{
                  background: "#1a1a1a", border: "1px solid #252525", borderRadius: 13,
                  padding: "13px 14px", cursor: "pointer", textAlign: "left", color: "#f0f0f0", transition: "border-color 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#ff7d2f"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#252525"}
                >
                  <div style={{ fontSize: 22, marginBottom: 5 }}>{cat.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{cat.title}</div>
                  <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>{cat.sub}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {view === "category" && activeCat && (
          <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
            <Avatar />
            <BotBubble>
              <b style={{ color: "#ff7d2f" }}>{activeCat.icon} {activeCat.title}</b>
              {"\n"}<span style={{ color: "#bbb", fontSize: 13 }}>{activeCat.hq}</span>{"\n\n"}
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {activeCat.qs.map((q, i) => (
                  <button key={i} onClick={() => sendMsg(q, [])} style={{
                    background: "#242424", border: "1px solid #2e2e2e", borderRadius: 9,
                    padding: "9px 13px", color: "#e8e8e8", fontSize: 13, cursor: "pointer", textAlign: "left",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff7d2f"; e.currentTarget.style.background = "#2a1f1a"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#2e2e2e"; e.currentTarget.style.background = "#242424"; }}
                  >{q}</button>
                ))}
                <button onClick={goHome} style={{ background: "transparent", border: "1px dashed #333", borderRadius: 9, padding: "8px 13px", color: "#666", fontSize: 12, cursor: "pointer", textAlign: "left", marginTop: 4 }}>← 다른 카테고리 보기</button>
              </div>
            </BotBubble>
          </div>
        )}

        {view === "chat" && (
          <>
            {msgs.map((msg, i) => (
              msg.role === "user" ? (
                <div key={i} style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
                  <div style={{ background: "linear-gradient(135deg,#ff7d2f,#e85d04)", borderRadius: "16px 4px 16px 16px", padding: "11px 15px", fontSize: 14, lineHeight: 1.7, maxWidth: "78%", color: "#fff", whiteSpace: "pre-wrap" }}>{msg.content}</div>
                </div>
              ) : (
                <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 16 }}>
                  <Avatar />
                  <BotBubble>{msg.content}</BotBubble>
                </div>
              )
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 16 }}>
                <Avatar />
                <div style={{ background: "#1c1c1c", border: "1px solid #282828", borderRadius: "4px 16px 16px 16px", padding: "14px 18px" }}>
                  {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff7d2f", display: "inline-block", margin: "0 2px", animation: "dot 1.2s infinite", animationDelay: `${i*0.2}s` }} />)}
                </div>
              </div>
            )}
            {!loading && msgs.length > 0 && (
              <button onClick={goHome} style={{ marginLeft: 49, background: "transparent", border: "1px dashed #333", borderRadius: 9, padding: "7px 13px", color: "#666", fontSize: 12, cursor: "pointer" }}>← 처음으로 돌아가기</button>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "11px 14px", background: "#111", borderTop: "1px solid #1e1e1e", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMsg(input)}
            placeholder="청약에 대해 무엇이든 물어보세요..."
            style={{ flex: 1, background: "#1c1c1c", border: "1px solid #2e2e2e", borderRadius: 12, padding: "11px 15px", color: "#f0f0f0", fontSize: 14, outline: "none" }}
            onFocus={e => e.target.style.borderColor = "#ff7d2f"}
            onBlur={e => e.target.style.borderColor = "#2e2e2e"}
          />
          <button onClick={() => sendMsg(input)} disabled={loading || !input.trim()} style={{
            background: input.trim() && !loading ? "linear-gradient(135deg,#ff7d2f,#e85d04)" : "#2a2a2a",
            border: "none", borderRadius: 12, padding: "0 17px", color: "#fff",
            cursor: input.trim() && !loading ? "pointer" : "default", fontSize: 17, flexShrink: 0,
          }}>➤</button>
        </div>
      </div>

      <style>{`@keyframes dot{0%,80%,100%{transform:scale(.7);opacity:.4}40%{transform:scale(1);opacity:1}}`}</style>
    </div>
  );
}
