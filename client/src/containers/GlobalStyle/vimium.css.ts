export const vimium = `
/*****************************************************************************/
/* THEMES */
/*****************************************************************************/
 :root {
     --font-size: 13;
     --font-weight: normal;
     --font: tewi, Source Code Pro, sans;
     --padding: 2px;
     --shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    /***********************************/
    /* Uncomment Theme to Select */
    /***********************************/
    /* ---------- Tomorrow Night ---------- */
    /* -- DELETE LINE TO ENABLE THEME --fg: #C5C8C6;
     --bg: #282A2E;
     --border: #373B41;
     --main-fg: #81A2BE;
     --accent-fg: #52C196;
     -- DELETE LINE TO ENABLE THEME */
    /* Unused Alternate Colors */
    /* --bg-dark: #1D1F21;
     */
    /* --cyan: #4CB3BC;
     */
    /* --purple: #AC7BBA;
     */
    /* --red: #CC6666;
     */
    /* --yellow: #CBCA77;
     */
    /* ---------- NORD ---------- */
    /* -- DELETE LINE TO ENABLE THEME --fg: #E5E9F0;
     --bg: #2E3440;
     --border: #3B4252;
     --main-fg: #88C0D0;
     --accent-fg: #A3BE8C;
     -- DELETE LINE TO ENABLE THEME */
    /* Unused Alternate Colors */
    /* --bg-dark: #4C566A;
     */
    /* --main-fg-alt: #5E81AC;
     */
    /* --orange: #D08770;
     */
    /* --red: #BF616A;
     */
    /* --yellow: #EBCB8B;
     */
    /* ---------- DOOM ONE ---------- */
    /* -- DELETE LINE TO ENABLE THEME --fg: #51AFEF;
     --bg: #2E3440;
     --border: #282C34;
     --main-fg: #51AFEF;
     --accent-fg: #98be65;
     -- DELETE LINE TO ENABLE THEME */
    /* Unused Alternate Colors */
    /* --bg-dark: #21242B;
     */
    /* --main-fg-alt: #2257A0;
     */
    /* --cyan: #46D9FF;
     */
    /* --orange: #DA8548;
     */
    /* --purple: #C678DD;
     */
    /* --red: #FF6C6B;
     */
    /* --yellow: #ECBE7B;
     */
    /* ---------- MONOKAI ---------- */
    /* -- DELETE LINE TO ENABLE THEME --fg: #F8F8F2;
     --bg: #272822;
     --bg-dark: #1D1E19;
     --border: #2D2E2E;
     --main-fg: #F92660;
     --accent-fg: #E6DB74;
     -- DELETE LINE TO ENABLE THEME */
    /* Unused Alternate Colors */
    /* --red: #E74C3C;
     */
    /* --orange: #FD971F;
     */
    /* --blue: #268BD2;
     */
    /* --violet: #9C91E4;
     */
    /* --cyan: #66D9EF;
     */
    /* ---------- Edge Dark ---------- */
    /* -- DELETE LINE TO ENABLE THEME --fg: #c5cdd9;
     --bg: #2c2e34;
     --border: #828a98;
     --main-fg: #6cb6eb;
     --accent-fg: #a0c980;
     -- DELETE LINE TO ENABLE THEME */
    /* Unused Alternate Colors */
    /* --bg-dark: #21242f;
     */
    /* --cyan: #5dbbc1;
     */
    /* --purple: #d38aea;
     */
    /* --red: #ec7279;
     */
    /* --yellow: #deb974;
     */
    /* ---------- Gruvbox Dark ---------- */
    /* -- DELETE LINE TO ENABLE THEME --fg: #ebdbb2;
     --bg: #282828;
     --border: #3c3836;
     --main-fg: #83a598;
     --accent-fg: #b8bb26;
     -- DELETE LINE TO ENABLE THEME */
    /* Unused Alternate Colors */
    /*--bg-dark: #1d2021;
    */
    /*--cyan: #076678;
    */
    /*--purple: #8f3f71;
    */
    /*--red: #fb4934;
    */
    /*--yellow: #fabd2f;
    */
}
/*****************************************************************************/
/* CSS */
/*****************************************************************************/
/* -------- HINTS -------- */
 #vimiumHintMarkerContainer div.internalVimiumHintMarker, #vimiumHintMarkerContainer div.vimiumHintMarker {
     background: var(--bg);
     border: 1px solid var(--border);
     box-shadow: var(--shadow);
     padding: 3px 4px;
}
 #vimiumHintMarkerContainer div span {
     color: var(--main-fg);
     font-family: var(--font);
     font-size: var(--font-size);
     font-weight: var(--font-weight);
     text-shadow: none;
}
 #vimiumHintMarkerContainer div > .matchingCharacter {
     opacity: 0.3;
}
 #vimiumHintMarkerContainer div > .matchingCharacter ~ span {
     color: var(--main-fg);
}
/* -------- VOMNIBAR -------- */
 #vomnibar {
     animation: show 200ms cubic-bezier(0, 0, 0.2, 1) forwards;
     background: var(--bg);
     border: none;
     box-shadow: var(--shadow);
}
/* Animate Slide in */
 @keyframes show {
     0% {
         opacity: 0;
         transform: translateY(50px);
    }
     100% {
         opacity: 1;
         transform: translateY(0);
    }
}
 #vomnibar .vomnibarSearchArea, #vomnibar input {
     background: transparent;
     border: none;
     box-shadow: none;
     color: var(--fg);
     font-family: var(--font);
     font-size: var(--font-size);
     font-weight: var(--font-weight);
}
 #vomnibar .vomnibarSearchArea {
     padding: var(--padding) 30px;
}
 #vomnibar input {
     padding: var(--padding)
}
 #vomnibar ul {
     background: var(--bg);
     border-top: 1px solid var(--border);
     margin: 0;
     padding: var(--padding);
}
 #vomnibar li {
     border-bottom: 1px solid var(--border);
     padding: var(--padding);
}
 #vomnibar li .vomnibarTopHalf, #vomnibar li .vomnibarBottomHalf {
     padding: var(--padding) 0;
}
 #vomnibar li .vomnibarSource {
     color: var(--main-fg);
     font-family: var(--font);
     font-size: var(--font-size);
     font-weight: var(--font-weight);
}
 #vomnibar li em, #vomnibar li .vomnibarTitle {
     color: var(--main-fg);
     font-family: var(--font);
     font-size: var(--font-size);
     font-weight: var(--font-weight);
}
 #vomnibar li .vomnibarUrl {
     color: var(--fg);
     font-family: var(--font);
     font-size: var(--font-size);
     font-weight: var(--font-weight);
}
 #vomnibar li .vomnibarMatch {
     color: var(--accent-fg);
     font-weight: normal;
}
 #vomnibar li .vomnibarTitle .vomnibarMatch {
     color: var(--main-fg);
}
 #vomnibar li.vomnibarSelected {
     background-color: var(--border);
}
/* -------- HUD -------- */
 div.vimiumHUD {
     background: var(--bg);
     border: 1px solid var(--border);
     box-shadow: var(--shadow);
}
 div.vimiumHUD span#hud-find-input, div.vimiumHUD .vimiumHUDSearchAreaInner {
     color: var(--fg);
     font-family: var(--font);
     font-size: var(--font-size);
     font-weight: var(--font-weight);
}
 div.vimiumHUD .hud-find {
     background-color: transparent;
     border: none;
}
 div.vimiumHUD .vimiumHUDSearchArea {
     background-color: transparent;
}

`;
