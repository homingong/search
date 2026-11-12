/* 청춘대길 정책검색 — 앱 껍데기용 일꾼.
   ★ 일부러 아무것도 저장하지 않는다. 옛 단가가 폰에 남아 상담에 쓰이면 안 되기 때문.
   하는 일은 「홈 화면 앱으로 열리게」 하는 것뿐이다. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
