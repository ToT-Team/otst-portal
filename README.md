# OTST Portal

Welcome to the **OTST Portal**. 本專案致力於紀錄並提供 osu! 台灣社群最完整的賽事資訊，網站主要分為以下兩大核心部分：

## 第一部分：OTST Portal (歷屆賽事入口)
本專案的最初核心。做為 **OTST (osu! Taiwanese Standard Tournament)** 的官方賽事入口網站，我們在這裡紀錄並呈現了從第一屆至今所有的 OTST 歷屆賽事資料。
* **歷屆觀覽**：提供專屬的歷史時間軸，快速查看每一屆的舉辦時間、冠軍選手、參賽人數、賽事介紹，以及相關的外部論壇與網站連結。

## 第二部分：台灣賽事 (Taiwan Tournaments)
為了凝聚台灣 osu! 玩家社群，本站擴充了綜合賽事查詢功能。
* **賽事總覽**：提供查詢台灣社群所舉辦的各項大大小小賽事。
* **精準過濾**：玩家可以透過搜尋關鍵字，或是根據遊戲模式（Standard, Catch, Taiko, Mania, Mapping）、隊伍規模（1v1 ~ 4v4）以及玩家 Rank 限制等條件，快速篩選出適合自己的比賽。
* **狀態追蹤**：一目了然地確認每一場賽事的時程，包含「即將開始」、「報名中」、「進行中」或是「已結束」。

---

### 💻 開發與運行 (Getting Started)

本專案使用 [Next.js](https://nextjs.org) 搭配 Tailwind CSS 建立。

**啟動開發伺服器:**

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
```

開啟瀏覽器並輸入 [http://localhost:3000](http://localhost:3000) 即可預覽網站。

### 關於台灣賽事列表

透過編輯專案內的 `src/data/tournaments.md` 輸入的賽事資訊，能夠讓所有台灣玩家看到。(需符合格式規範)