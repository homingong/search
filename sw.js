/* 청춘대길 정책검색 — 앱 껍데기용 일꾼.
   ★ 단가는 절대 저장하지 않는다. 옛 단가가 폰에 남아 상담에 쓰이면 안 되기 때문.
   저장하는 것은 「인터넷이 끊겼습니다」 안내 쪽 하나뿐이다.
   (크롬이 「앱 설치」를 띄우려면 끊겼을 때 보여줄 화면이 하나는 있어야 한다 — 2026-11-12) */
const SHELL = "ccdg-shell-v1";
const OFFLINE = "offline.html";

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.add(OFFLINE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== SHELL).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  // 페이지 이동만 가로챈다. 단가(index.html)는 **언제나 인터넷에서** 받아 오고,
  // 받지 못할 때만 안내 화면을 보여 준다 — 캐시에 단가가 남는 일은 없다.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => caches.match(OFFLINE)));
  }
});
