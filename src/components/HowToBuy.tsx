import { useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'wouter';
import './how-to-buy.css';

const HTML = `<section class="wt-htb" id="how-to-buy" aria-labelledby="wt-htb-title">
  <div class="wt-htb__wrap">

    <!-- LEFT — INTRO -->
    <div class="wt-htb__intro">
      <span class="wt-htb__eyebrow">How it works</span>
      <h2 class="wt-htb__title" id="wt-htb-title">Buying a car from Japan, in four clear steps</h2>
      <p class="wt-htb__lead">
        From choosing your vehicle to collecting it at your port, we handle the auctions,
        paperwork and shipping. You always know the full cost before you pay.
      </p>

      <div class="wt-htb__hero">
        <svg viewBox="0 0 560 320" role="img" aria-label="Car shipped by sea from Japan to your port">
          <defs>
            <linearGradient id="wtSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#0A1730"/>
              <stop offset=".55" stop-color="#1E3A63"/>
              <stop offset="1" stop-color="#2B4A7A"/>
            </linearGradient>
            <radialGradient id="wtMoonG" cx=".5" cy=".5" r=".5">
              <stop offset="0" stop-color="#FF9CAE"/>
              <stop offset=".5" stop-color="#E63950"/>
              <stop offset="1" stop-color="#A81829"/>
            </radialGradient>
          </defs>

          <rect width="560" height="320" fill="url(#wtSky)"/>

          <g fill="#fff">
            <circle class="wt-star" cx="70"  cy="50" r="1.20" style="animation-delay:-0.00s;animation-duration:2.4s"/>
            <circle class="wt-star" cx="160" cy="30" r="1.55" style="animation-delay:-0.63s;animation-duration:3.0s"/>
            <circle class="wt-star" cx="250" cy="64" r="1.90" style="animation-delay:-1.26s;animation-duration:3.6s"/>
            <circle class="wt-star" cx="330" cy="26" r="1.20" style="animation-delay:-1.89s;animation-duration:4.2s"/>
            <circle class="wt-star" cx="510" cy="40" r="1.55" style="animation-delay:-2.52s;animation-duration:2.4s"/>
            <circle class="wt-star" cx="110" cy="98" r="1.90" style="animation-delay:-3.15s;animation-duration:3.0s"/>
            <circle class="wt-star" cx="30"  cy="120" r="1.20" style="animation-delay:-3.78s;animation-duration:3.6s"/>
            <circle class="wt-star" cx="200" cy="110" r="1.55" style="animation-delay:-4.41s;animation-duration:4.2s"/>
            <circle class="wt-star" cx="290" cy="100" r="1.90" style="animation-delay:-5.04s;animation-duration:2.4s"/>
            <circle class="wt-star" cx="380" cy="52"  r="1.20" style="animation-delay:-5.67s;animation-duration:3.0s"/>
            <circle class="wt-star" cx="540" cy="110" r="1.55" style="animation-delay:-6.30s;animation-duration:3.6s"/>
            <circle class="wt-star" cx="60"  cy="170" r="1.90" style="animation-delay:-6.93s;animation-duration:4.2s"/>
          </g>

          <path class="wt-shoot" d="M365 18L331 30" stroke="#fff" stroke-width="2" stroke-linecap="round" style="animation-delay:-2s"/>
          <path class="wt-shoot" d="M180 62L150 74" stroke="#fff" stroke-width="1.6" stroke-linecap="round" style="animation-delay:-7s;animation-duration:11s"/>
          <circle class="wt-halo"  cx="430" cy="92" r="74" fill="#D7263D"/>
          <circle class="wt-halo wt-halo2" cx="430" cy="92" r="60" fill="#FF5A6E"/>
          <circle class="wt-moon"  cx="430" cy="92" r="46" fill="url(#wtMoonG)"/>

          <path d="M0 214 L92 150 L150 190 L222 122 L316 214 Z" fill="#1F3B66" opacity=".55"/>
          <path d="M200 214 L280 160 L340 200 L400 170 L480 214 Z" fill="#1F3B66" opacity=".35"/>

          <g class="wt-hcloud" fill="#3C5F94" opacity=".32"><ellipse cx="90" cy="150" rx="44" ry="7"/><ellipse cx="118" cy="143" rx="28" ry="7"/><ellipse cx="300" cy="128" rx="38" ry="6"/><ellipse cx="322" cy="122" rx="22" ry="6"/></g>
          <path d="M0 232h560v88H0z" fill="#0B3A6B"/>

          <path class="wt-wave1" d="M-105 232c35 -10 70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0s70 10 105 0v18H-105z" fill="#134E86"/>
          <path class="wt-wave2" d="M-140 250c47 -12 93 12 140 0s93 12 140 0s93 12 140 0s93 12 140 0s93 12 140 0s93 12 140 0s93 12 140 0s93 12 140 0s93 12 140 0s93 12 140 0s93 12 140 0v16H-140z" fill="#2A6DB0" opacity=".45"/>

          <rect class="wt-refl" x="395" y="236" width="70" height="3" rx="1.5" fill="#FF8A98" style="animation-delay:0.0s"/>
          <rect class="wt-refl" x="404" y="243" width="52" height="3" rx="1.5" fill="#FF8A98" style="animation-delay:-0.5s"/>
          <rect class="wt-refl" x="412" y="250" width="36" height="3" rx="1.5" fill="#FF8A98" style="animation-delay:-1.0s"/>
          <rect class="wt-refl" x="418" y="257" width="24" height="3" rx="1.5" fill="#FF8A98" style="animation-delay:-1.5s"/>

          <rect class="wt-refl" x="40" y="244" width="22" height="2" rx="1" fill="#fff" style="animation-delay:0s;animation-duration:2.2s"/><rect class="wt-refl" x="110" y="256" width="16" height="2" rx="1" fill="#fff" style="animation-delay:-0.9s;animation-duration:2.8s"/><rect class="wt-refl" x="180" y="240" width="26" height="2" rx="1" fill="#fff" style="animation-delay:-1.7s;animation-duration:2.5s"/><rect class="wt-refl" x="250" y="258" width="18" height="2" rx="1" fill="#fff" style="animation-delay:-0.4s;animation-duration:3.1s"/><rect class="wt-refl" x="330" y="246" width="20" height="2" rx="1" fill="#fff" style="animation-delay:-2.1s;animation-duration:2.4s"/><rect class="wt-refl" x="500" y="250" width="24" height="2" rx="1" fill="#fff" style="animation-delay:-1.3s;animation-duration:2.9s"/><rect class="wt-refl" x="470" y="238" width="14" height="2" rx="1" fill="#fff" style="animation-delay:-0.7s;animation-duration:2.6s"/>
          <g class="wt-htb__sail">
            <g class="wt-htb__ship">
              <path d="M70 236h410l-38 46H112z" fill="#0E1B2E"/>
              <path d="M92 236h368v9H92z" fill="#D7263D"/>
              <rect x="118" y="196" width="60" height="40" rx="3" fill="#F5F7FA"/>
              <rect class="wt-win" x="126" y="204" width="10" height="10" fill="#2B4A7A" style="animation-delay:0.0s"/>
              <rect class="wt-win" x="142" y="204" width="10" height="10" fill="#2B4A7A" style="animation-delay:-0.7s"/>
              <rect class="wt-win" x="158" y="204" width="10" height="10" fill="#2B4A7A" style="animation-delay:-1.4s"/>
              <rect x="134" y="176" width="28" height="20" rx="2" fill="#fff"/>
              <rect x="192" y="210" width="60" height="26" fill="#D7263D"/>
              <rect x="256" y="210" width="60" height="26" fill="#F2B233"/>
              <rect x="320" y="210" width="60" height="26" fill="#1FA855"/>
              <rect x="384" y="210" width="60" height="26" fill="#fff"/>
              <rect x="224" y="184" width="60" height="26" fill="#fff"/>
              <rect x="288" y="184" width="60" height="26" fill="#D7263D"/>
              <rect x="352" y="184" width="60" height="26" fill="#F2B233"/>
              <g stroke="#0E1B2E" stroke-opacity=".25" stroke-width="2">
                <path d="M204 210v26M216 210v26M268 210v26M280 210v26M332 210v26M344 210v26M396 210v26M408 210v26"/>
              </g>
            </g>
          <g class="wt-wake" fill="#fff"><ellipse cx="62" cy="247" rx="18" ry="3"/><ellipse cx="34" cy="251" rx="14" ry="2.5"/><ellipse cx="10" cy="254" rx="10" ry="2"/></g></g>

          <path class="wt-wave3" d="M-120 266c40 -9 80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0s80 9 120 0v70H-120z" fill="#0D4173" stroke="#7FB2E5" stroke-opacity=".35" stroke-width="2"/>

          <g>
            <rect x="24" y="24" width="188" height="34" rx="17" fill="#fff"/>
            <circle cx="43" cy="41" r="7" fill="#D7263D"/>
            <text x="58" y="46" font-family="Inter,Arial,sans-serif" font-size="13" font-weight="600" fill="#0E1B2E">Japan to your port</text>
          </g>
        </svg>
      </div>

      <div class="wt-htb__actions">
        <a class="wt-htb__btn wt-htb__btn--primary" href="/cars" data-wt-nav>Browse available cars</a>
        <a class="wt-htb__btn wt-htb__btn--ghost" href="__WA__" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 003.3 16.8L2 22l5.3-1.4A11 11 0 0020.5 3.5zM12 20.2a9 9 0 01-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3A9 9 0 1112 20.2zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a7.4 7.4 0 01-3.7-3.2c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4.1c1.7.7 2.4.8 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z"/></svg>
          Ask us on WhatsApp
        </a>
      </div>

      <ul class="wt-htb__trust">
        <li>
          <span aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h9"/></svg></span>
          Itemised, transparent pricing
        </li>
        <li>
          <span aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h13V6H3zM16 10h4l1 3v4h-5"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg></span>
          Shipping arranged for you
        </li>
        <li>
          <span aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H8l-5 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span>
          Support at every stage
        </li>
      </ul>

      <div class="wt-htb__safe" role="note">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>
        <div>
          <strong>Verify before you pay</strong>
          <p>Always confirm our Japan bank account details with our team before sending any payment. We never change bank details by email or chat without confirmation.</p>
        </div>
      </div>
    </div>

    <!-- RIGHT — STEPS -->
    <ol class="wt-htb__steps">
      <li class="wt-htb__fill" role="presentation" aria-hidden="true"></li>

      <!-- STEP 1 -->
      <li class="wt-htb__step">
        <span class="wt-htb__num" aria-hidden="true">1</span>
        <div class="wt-htb__card">
          <div class="wt-htb__art">
            <svg viewBox="0 0 400 140" aria-hidden="true" focusable="false">
              <circle class="wt-pulse" cx="330" cy="30" r="60" fill="#FCE8EB"/>
              <circle cx="40" cy="120" r="46" fill="#E9EEF5"/>
              <g class="wt-skyline" fill="#D3DCE9"><rect x="20" y="84" width="26" height="36" rx="2"/><rect x="54" y="96" width="20" height="24" rx="2"/><rect x="84" y="76" width="30" height="44" rx="2"/><rect x="126" y="100" width="18" height="20" rx="2"/><rect x="150" y="88" width="24" height="32" rx="2"/><rect x="220" y="84" width="26" height="36" rx="2"/><rect x="254" y="96" width="20" height="24" rx="2"/><rect x="284" y="76" width="30" height="44" rx="2"/><rect x="326" y="100" width="18" height="20" rx="2"/><rect x="350" y="88" width="24" height="32" rx="2"/><rect x="420" y="84" width="26" height="36" rx="2"/><rect x="454" y="96" width="20" height="24" rx="2"/><rect x="484" y="76" width="30" height="44" rx="2"/><rect x="526" y="100" width="18" height="20" rx="2"/><rect x="550" y="88" width="24" height="32" rx="2"/></g>
              <rect x="0" y="120" width="400" height="20" fill="#DCE3ED"/>
              <path class="wt-road" d="M-60 129h28M0 129h28M60 129h28M120 129h28M180 129h28M240 129h28M300 129h28M360 129h28M420 129h28" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none"/>
              <g stroke="#9FB6D6" stroke-width="3" stroke-linecap="round">
                <path class="wt-speed" d="M40 80h34" style="animation-delay:0s"/>
                <path class="wt-speed" d="M24 92h44" style="animation-delay:-.3s"/>
                <path class="wt-speed" d="M48 104h28" style="animation-delay:-.6s"/>
              </g>
              <circle class="wt-puff" cx="82" cy="100" r="4" fill="#B9C6D8" style="animation-delay:0.0s"/><circle class="wt-puff" cx="82" cy="100" r="4" fill="#B9C6D8" style="animation-delay:-0.4s"/><circle class="wt-puff" cx="82" cy="100" r="4" fill="#B9C6D8" style="animation-delay:-0.8s"/>
              <g class="wt-car">
                <path d="M84 104V86c0-6 4-10 10-12l30-8 26-22c3-3 7-4 11-4h44c6 0 11 2 15 6l24 22 30 6c8 2 12 8 12 16v14z" fill="#0E1B2E"/>
                <path d="M150 66l16-14c2-2 4-3 7-3h32l-1 20z" fill="#9FB6D6"/>
                <path d="M214 49h16c3 0 5 1 7 3l16 14h-40z" fill="#9FB6D6"/>
                <rect x="88" y="92" width="16" height="6" rx="3" fill="#F2B233"/>
                <rect x="304" y="90" width="12" height="6" rx="3" fill="#D7263D"/>
                <g class="wt-wheel">
                  <circle cx="140" cy="106" r="16" fill="#0E1B2E" stroke="#fff" stroke-width="4"/>
                  <path d="M131 106h18M140 97v18M133.6 99.6l12.8 12.8M133.6 112.4l12.8-12.8" stroke="#9FB6D6" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="140" cy="106" r="3.5" fill="#CBD4E1"/>
                </g>
                <g class="wt-wheel">
                  <circle cx="284" cy="106" r="16" fill="#0E1B2E" stroke="#fff" stroke-width="4"/>
                  <path d="M275 106h18M284 97v18M277.6 99.6l12.8 12.8M277.6 112.4l12.8-12.8" stroke="#9FB6D6" stroke-width="2" stroke-linecap="round"/>
                  <circle cx="284" cy="106" r="3.5" fill="#CBD4E1"/>
                </g>
              </g>
              <g transform="translate(276 14)">
                <g class="wt-float">
                  <rect width="96" height="38" rx="19" fill="#fff" stroke="#E4E8EE"/>
                  <circle cx="20" cy="19" r="10" fill="#D7263D"/>
                  <path d="M16 19l3 3 5-6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="36" y="24" font-family="Inter,Arial,sans-serif" font-size="13" font-weight="600" fill="#0E1B2E">Estimate</text>
                </g>
              </g>
            </svg>
          </div>
          <div class="wt-htb__body">
            <span class="wt-htb__when"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>Same day</span>
            <div class="wt-htb__head">
              <span class="wt-htb__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></span>
              <h3>Choose your car and get a clear estimate</h3>
            </div>
            <p>Browse our stock or tell us what you want. Give us your destination country and port so the estimate covers the real cost of getting the car on your road, not just the car price.</p>
            <span class="wt-htb__tag"><b>You do:</b> select a car, request an estimate</span>
            <details class="wt-htb__more">
              <summary>How to get an accurate estimate</summary>
              <ul>
                <li>Tell us your destination country and port</li>
                <li>Check your country's rules on vehicle age, emissions and duty before you choose</li>
                <li>Ask for the auction sheet or inspection report to see the true condition and mileage</li>
                <li>Set a total budget: car, freight, insurance, taxes and registration</li>
              </ul>
            </details>
          </div>
        </div>
      </li>

      <!-- STEP 2 -->
      <li class="wt-htb__step">
        <span class="wt-htb__num" aria-hidden="true">2</span>
        <div class="wt-htb__card">
          <div class="wt-htb__art">
            <svg viewBox="0 0 400 140" aria-hidden="true" focusable="false">
              <circle class="wt-pulse" cx="70" cy="30" r="56" fill="#FCE8EB"/>
              <circle cx="350" cy="120" r="50" fill="#E9EEF5"/>
              <g class="wt-float">
                <rect x="136" y="12" width="128" height="120" rx="10" fill="#fff" stroke="#D5DCE7" stroke-width="2"/>
                <rect x="136" y="12" width="128" height="26" rx="10" fill="#D7263D"/>
                <rect x="136" y="28" width="128" height="10" fill="#D7263D"/>
                <text x="150" y="30" font-family="Inter,Arial,sans-serif" font-size="11" font-weight="600" fill="#fff">Proforma invoice</text>
                <rect class="wt-bar" x="150" y="52" width="60" height="6" rx="3" fill="#CBD4E1" style="animation-delay:0.00s"/>
                <rect class="wt-bar" x="150" y="68" width="44" height="6" rx="3" fill="#CBD4E1" style="animation-delay:0.18s"/>
                <rect class="wt-bar" x="150" y="84" width="54" height="6" rx="3" fill="#CBD4E1" style="animation-delay:0.36s"/>
                <rect class="wt-bar" x="222" y="52" width="28" height="6" rx="3" fill="#0E1B2E" style="animation-delay:0.54s"/>
                <rect class="wt-bar" x="222" y="68" width="28" height="6" rx="3" fill="#0E1B2E" style="animation-delay:0.72s"/>
                <rect class="wt-bar" x="222" y="84" width="28" height="6" rx="3" fill="#0E1B2E" style="animation-delay:0.90s"/>
                <rect class="wt-bar" x="150" y="110" width="40" height="8" rx="4" fill="#0E1B2E" style="animation-delay:1.08s"/>
                <rect class="wt-bar" x="212" y="110" width="38" height="8" rx="4" fill="#D7263D" style="animation-delay:1.26s"/>
                <path d="M150 102h100" stroke="#E4E8EE" stroke-width="2"/>
                <rect class="wt-scan" x="138" y="40" width="124" height="10" fill="#D7263D" opacity=".10"/>
                <circle class="wt-spark" cx="272" cy="74" r="2.6" fill="#1FA855" style="--dx:-30px;--dy:-24px"/><circle class="wt-spark" cx="272" cy="74" r="2.6" fill="#F2B233" style="--dx:0px;--dy:-34px"/><circle class="wt-spark" cx="272" cy="74" r="2.6" fill="#D7263D" style="--dx:30px;--dy:-24px"/><circle class="wt-spark" cx="272" cy="74" r="2.6" fill="#1FA855" style="--dx:36px;--dy:6px"/><circle class="wt-spark" cx="272" cy="74" r="2.6" fill="#F2B233" style="--dx:-36px;--dy:6px"/><circle class="wt-spark" cx="272" cy="74" r="2.6" fill="#D7263D" style="--dx:0px;--dy:32px"/>
                <g transform="translate(272 74) rotate(-12)">
                  <g class="wt-stamp">
                    <circle r="26" fill="#fff" stroke="#1FA855" stroke-width="3"/>
                    <path d="M-11 0l8 8 15-16" stroke="#1FA855" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="wt-htb__body">
            <span class="wt-htb__when"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>24–48 hours</span>
            <div class="wt-htb__head">
              <span class="wt-htb__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg></span>
              <h3>Review your proforma invoice</h3>
            </div>
            <p>We send an itemised invoice with the vehicle price, shipping method and destination port. Take your time, ask questions, and confirm only when everything matches what you agreed.</p>
            <span class="wt-htb__tag"><b>You get:</b> a clear, itemised quote</span>
            <details class="wt-htb__more">
              <summary>What to check on the invoice</summary>
              <ul>
                <li>Chassis number, model year and mileage match the car you chose</li>
                <li>Freight cost, and whether it is RoRo (usually cheaper) or container (better protection)</li>
                <li>Insurance, handling and service fees listed separately</li>
                <li>The destination port is the right one for you</li>
              </ul>
            </details>
          </div>
        </div>
      </li>

      <!-- STEP 3 -->
      <li class="wt-htb__step">
        <span class="wt-htb__num" aria-hidden="true">3</span>
        <div class="wt-htb__card">
          <div class="wt-htb__art">
            <svg viewBox="0 0 400 140" aria-hidden="true" focusable="false">
              <circle class="wt-pulse" cx="330" cy="26" r="56" fill="#FCE8EB"/>
              <circle cx="50" cy="126" r="48" fill="#E9EEF5"/>
              <g transform="translate(58 30)">
                <path d="M0 30L40 6l40 24z" fill="#0E1B2E"/>
                <rect x="6" y="34" width="10" height="34" fill="#9FB6D6"/>
                <rect x="24" y="34" width="10" height="34" fill="#9FB6D6"/>
                <rect x="42" y="34" width="10" height="34" fill="#9FB6D6"/>
                <rect x="60" y="34" width="10" height="34" fill="#9FB6D6"/>
                <rect x="-4" y="70" width="88" height="10" rx="3" fill="#0E1B2E"/>
                <text x="40" y="100" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="11" font-weight="600" fill="#5F6B7C">Your bank</text>
              </g>
              <path class="wt-dash" d="M162 68h76" stroke="#D7263D" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
              <path d="M232 58l12 10-12 10" stroke="#D7263D" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              <g class="wt-coin wt-coin2" style="animation-delay:-2.9s"><circle cx="200" cy="68" r="7" fill="#F2B233"/></g><g class="wt-coin wt-coin2" style="animation-delay:-2.6s"><circle cx="200" cy="68" r="5" fill="#F7CD73"/></g>
              <g class="wt-coin">
                <circle cx="200" cy="68" r="17" fill="#fff" stroke="#D7263D" stroke-width="2.5"/>
                <text x="200" y="74" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="17" font-weight="700" fill="#D7263D">¥</text>
              </g>
              <g transform="translate(262 30)">
                <path d="M0 30L40 6l40 24z" fill="#D7263D"/>
                <rect x="6" y="34" width="10" height="34" fill="#F3B6BE"/>
                <rect x="24" y="34" width="10" height="34" fill="#F3B6BE"/>
                <rect x="42" y="34" width="10" height="34" fill="#F3B6BE"/>
                <rect x="60" y="34" width="10" height="34" fill="#F3B6BE"/>
                <rect x="-4" y="70" width="88" height="10" rx="3" fill="#D7263D"/>
                <text x="40" y="100" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="11" font-weight="600" fill="#5F6B7C">Wazir Trading, Japan</text>
              </g>
              <circle class="wt-ripple" cx="302" cy="72" r="14" fill="none" stroke="#1FA855" stroke-width="2"/><circle class="wt-ripple" cx="302" cy="72" r="14" fill="none" stroke="#1FA855" stroke-width="2" style="animation-delay:-.25s"/>
              <g class="wt-ok" transform="translate(338 34)">
                <circle r="11" fill="#1FA855" stroke="#fff" stroke-width="2"/>
                <path d="M-5 0l3.5 3.5 6-7" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </div>
          <div class="wt-htb__body">
            <span class="wt-htb__when"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>1–3 working days</span>
            <div class="wt-htb__head">
              <span class="wt-htb__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/></svg></span>
              <h3>Pay by telegraphic transfer</h3>
            </div>
            <p>Send the invoice amount by bank transfer (T/T) to our Japan account. Once we confirm your payment, we reserve the car and begin export preparation.</p>
            <span class="wt-htb__tag"><b>You do:</b> transfer funds, share the receipt</span>
            <details class="wt-htb__more">
              <summary>Before you transfer</summary>
              <ul>
                <li>Confirm our bank details with our team directly, by phone or WhatsApp</li>
                <li>Pay the exact invoice amount and use your invoice number as the reference</li>
                <li>Ask who covers bank charges so the full amount arrives</li>
                <li>Send us the transfer receipt so we can match it quickly</li>
              </ul>
            </details>
          </div>
        </div>
      </li>

      <!-- STEP 4 -->
      <li class="wt-htb__step">
        <span class="wt-htb__num" aria-hidden="true">4</span>
        <div class="wt-htb__card">
          <div class="wt-htb__art">
            <svg viewBox="0 0 400 140" aria-hidden="true" focusable="false">
              <circle class="wt-pulse" cx="60" cy="24" r="52" fill="#FCE8EB"/>
              <g fill="#fff" opacity=".9" class="wt-cloud">
                <ellipse cx="300" cy="22" rx="22" ry="6"/>
                <ellipse cx="316" cy="17" rx="14" ry="6"/>
                <ellipse cx="350" cy="44" rx="18" ry="5"/>
              </g>
              <rect y="104" width="400" height="36" fill="#DCE6F2"/>
              <path class="wt-wavep" d="M-75 108c25 -6 50 6 75 0s50 6 75 0s50 6 75 0s50 6 75 0s50 6 75 0s50 6 75 0s50 6 75 0v40H-75z" fill="#B9CCE4"/>
              <rect x="0" y="104" width="142" height="36" fill="#C9D3E1"/>
              <rect x="0" y="104" width="142" height="4" fill="#B3BFD0"/>
              <g fill="#D7263D">
                <rect x="70" y="30" width="8" height="76"/>
                <rect x="102" y="30" width="8" height="76"/>
                <rect x="62" y="24" width="150" height="8" rx="2"/>
                <path d="M74 24L142 6l0 18z"/><circle class="wt-beacon" cx="142" cy="5" r="3" fill="#FFD98A"/>
              </g>
              <path d="M74 60h32M74 84h32" stroke="#D7263D" stroke-width="3"/>
              <g class="wt-crx">
                <rect x="184" y="30" width="12" height="5" rx="1.5" fill="#0E1B2E"/>
                <rect class="wt-rope" x="189" y="32" width="2" height="34" fill="#0E1B2E"/>
                <g class="wt-box">
                  <rect x="176" y="66" width="28" height="14" fill="#F2B233"/>
                  <path d="M184 66v14M190 66v14M196 66v14" stroke="#C48A12" stroke-width="1.5"/>
                </g>
              </g>
              <g class="wt-bob">
                <path d="M150 104h190l-16 20H166z" fill="#0E1B2E"/>
                <rect x="150" y="104" width="190" height="5" fill="#D7263D"/>
                <rect x="164" y="82" width="34" height="22" fill="#1FA855"/>
                <rect x="200" y="82" width="34" height="22" fill="#fff"/>
                <rect x="236" y="82" width="34" height="22" fill="#D7263D"/>
                <rect x="272" y="86" width="50" height="18" fill="#F5F7FA"/>
                <rect x="290" y="70" width="20" height="16" fill="#fff"/>
              </g>
              <path class="wt-wavef" d="M-90 122c30 -7 60 7 90 0s60 7 90 0s60 7 90 0s60 7 90 0s60 7 90 0s60 7 90 0v30H-90z" fill="#A9C0DD" opacity=".92"/>
              <g class="wt-gull" style="animation-delay:0s;--gy:36px"><path class="wt-flap" d="M0 0q4 -5 8 0q4 -5 8 0" stroke="#7B8DA6" stroke-width="1.6" fill="none" stroke-linecap="round"/></g><g class="wt-gull" style="animation-delay:-6s;--gy:52px"><path class="wt-flap" d="M0 0q4 -5 8 0q4 -5 8 0" stroke="#7B8DA6" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
              <g transform="translate(300 14)">
                <g class="wt-float">
                  <rect width="84" height="34" rx="17" fill="#fff" stroke="#E4E8EE"/>
                  <circle cx="18" cy="17" r="9" fill="#1FA855"/>
                  <path d="M13.5 17l3 3 5-6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                  <text x="34" y="22" font-family="Inter,Arial,sans-serif" font-size="12" font-weight="600" fill="#0E1B2E">Arrived</text>
                </g>
              </g>
            </svg>
          </div>
          <div class="wt-htb__body">
            <span class="wt-htb__when"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>3–6 weeks</span>
            <div class="wt-htb__head">
              <span class="wt-htb__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18l2 3h16l2-3z"/><path d="M5 18V9h14v9M9 9V5h6v4M12 5V2"/></svg></span>
              <h3>Shipping, customs and pickup</h3>
            </div>
            <p>We deregister the car in Japan, prepare the export documents and ship it to your port. You clear customs on arrival and collect your vehicle, and we stay in touch until it is in your hands.</p>
            <span class="wt-htb__tag"><b>You get:</b> your car, delivered to your port</span>
            <details class="wt-htb__more">
              <summary>What happens next</summary>
              <ul>
                <li>In Japan: we deregister the car for export and book space on the vessel</li>
                <li>Where your country requires it: a pre-shipment inspection or cleaning certificate</li>
                <li>We send your documents: commercial invoice, export certificate and Bill of Lading</li>
                <li>On arrival: customs declaration, duties and taxes, any biosecurity or compliance checks, then pickup</li>
              </ul>
              <p>Chassis numbers must match across all documents, or clearance can be delayed. Rules vary by country, so ask us what applies to yours.</p>
            </details>
          </div>
        </div>
      </li>

    </ol>

    <div class="wt-htb__final">
      <h3>Ready to find your car?</h3>
      <p>Tell us your budget and destination port. We will reply with real options and a full cost estimate, with no obligation.</p>
      <div class="wt-htb__actions">
        <a class="wt-htb__btn wt-htb__btn--primary" href="/cars" data-wt-nav>Browse available cars <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        <a class="wt-htb__btn wt-htb__btn--light" href="__WA__" target="_blank" rel="noopener noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 003.3 16.8L2 22l5.3-1.4A11 11 0 0020.5 3.5zM12 20.2a9 9 0 01-4.6-1.3l-.3-.2-3.1.8.8-3-.2-.3A9 9 0 1112 20.2zm5-6.7c-.3-.1-1.6-.8-1.9-.9-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a7.4 7.4 0 01-3.7-3.2c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.8 11.9 11.9 0 004.6 4.1c1.7.7 2.4.8 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z"/></svg> Get an estimate on WhatsApp</a>
      </div>
    </div>

  </div>
</section>
<script type="application/ld+json">{"@context": "https://schema.org", "@type": "HowTo", "name": "How to buy a car from Japan with Wazir Trading", "step": [{"@type": "HowToStep", "position": 1, "name": "Choose your car and get a clear estimate", "text": "Browse our stock or tell us what you want, with your destination country and port, so the estimate covers the real cost."}, {"@type": "HowToStep", "position": 2, "name": "Review your proforma invoice", "text": "We send an itemised invoice with the vehicle price, shipping method and destination port. Confirm when everything matches."}, {"@type": "HowToStep", "position": 3, "name": "Pay by telegraphic transfer", "text": "Send the invoice amount by bank transfer to our Japan account. Once confirmed, we reserve the car and begin export preparation."}, {"@type": "HowToStep", "position": 4, "name": "Shipping, customs and pickup", "text": "We deregister the car, prepare export documents and ship it to your port. You clear customs and collect your vehicle."}]}</script>`;

/**
 * "How to buy" section. Markup and styles are scoped under .wt-htb so they
 * cannot leak into the rest of the site. Internal links (data-wt-nav) go
 * through the client router instead of a full page load.
 */
export default function HowToBuy() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '818089227375';
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    "Hello, I'd like an estimate for a Japanese used car from Wazir Trading LLC.",
  )}`;
  const html = useMemo(() => HTML.split('__WA__').join(waLink), [waLink]);

  // scroll-linked timeline, step reveal, and pausing off-screen animations
  useEffect(() => {
    const root = hostRef.current?.querySelector<HTMLElement>('.wt-htb');
    if (!root || !('IntersectionObserver' in window)) return;
    const list = root.querySelector<HTMLElement>('.wt-htb__steps');
    const fill = root.querySelector<HTMLElement>('.wt-htb__fill');
    if (!list || !fill) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>('.wt-htb__step'));
    root.classList.add('wt-htb--js');

    const live = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('is-live', e.isIntersecting)),
      { threshold: 0.1 },
    );
    root.querySelectorAll('.wt-htb__hero,.wt-htb__art').forEach(el => live.observe(el));

    const reveal = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            reveal.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    steps.forEach(st => reveal.observe(st));

    let ticking = false;
    const update = () => {
      ticking = false;
      const off = parseFloat(getComputedStyle(list).getPropertyValue('--line-offset')) || 28;
      const mid = window.innerHeight * 0.6;
      const lr = list.getBoundingClientRect();
      fill.style.height = Math.max(0, Math.min(lr.height - off * 2, mid - lr.top - off)) + 'px';
      let current: HTMLElement | null = null;
      steps.forEach(st => {
        const num = st.querySelector<HTMLElement>('.wt-htb__num');
        if (!num) return;
        const n = num.getBoundingClientRect();
        const done = n.top + n.height / 2 < mid;
        st.classList.toggle('is-done', done);
        st.classList.remove('is-current');
        st.removeAttribute('aria-current');
        if (done) current = st;
      });
      if (current) {
        (current as HTMLElement).classList.add('is-current');
        (current as HTMLElement).setAttribute('aria-current', 'step');
      }
    };
    const req = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();

    return () => {
      window.removeEventListener('scroll', req);
      window.removeEventListener('resize', req);
      live.disconnect();
      reveal.disconnect();
      root.classList.remove('wt-htb--js');
    };
  }, []);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-wt-nav]');
    if (!a) return;
    e.preventDefault();
    navigate(a.getAttribute('href') || '/');
    window.scrollTo({ top: 0 });
  };

  return <div ref={hostRef} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
