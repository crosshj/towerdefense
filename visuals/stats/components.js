export const menuButton = () => `
<svg viewBox="0 0 500 500" preserveAspectRatio="none">
    <defs>
        <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFF8" />
            <stop offset="100%" stop-color="#444F" />
        </linearGradient>
    </defs>
    <path class="main" d="
        M 50 115 
        C 100 31 200 41 250 41 
        C 300 41 400 31 450 115 
        L 450 315 
        C 450 365 300 422 250 452 
        C 200 422 50 365 50 315 
        L 50 115 
        Z
    " 
        fill="currentColor"
    />
    <path class="mainHighlights" d="
        M 50 115 
        C 100 31 200 41 250 41 
        C 300 41 400 31 450 115 
        L 450 315 
        C 450 365 300 422 250 452 
        C 200 422 50 365 50 315 
        L 50 115 
        Z
    " 
        style="mix-blend-mode: hard-light;transform: scale(0.95); transform-origin: center;"
        fill="url(#buttonGradient)"
    />
    <path class="mainFace" d="
        M 50 115 
        C 100 31 200 41 250 41 
        C 300 41 400 31 450 115 
        L 450 315 
        C 450 365 300 422 250 452 
        C 200 422 50 365 50 315 
        L 50 115 
        Z
    "
        style="transform: scale(0.80); transform-origin: center;"
        fill="currentColor"
    />
    <path class="arrowDown" d="
        M 180 200
        L 250 280
        L 320 200
    "
        filter="url(#dropShadow)" 
    />
    <g class="closeX" filter="url(#dropShadow)">
        <line x1="180" y1="180" x2="300" y2="300" />
        <line x1="180" y1="300" x2="300" y2="180" />
    </g>
</svg>
`;
