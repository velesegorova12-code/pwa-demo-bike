# Technical Architecture & PWA Implementation Plan

This document outlines the core technology stack and the strategy for the mobile Progressive Web App (PWA) prototype.

## 1. Technology Stack (Draft)
* **Frontend:** React + Vite + TypeScript.
* **Styling:** CSS/Tailwind (Mobile-first approach).
* **Map Engine:** Standard Web Mapping (Selection to be finalized after prototype review).
* **Routing Engine:** Valhalla (Internal API).
* **Data Source:** OpenStreetMap (OSM).

## 2. PWA Implementation Strategy 
To meet the mobile-first requirement, we are implementing:
* **Tooling:** vite-plugin-pwa for Service Worker management.
* **Service Worker:** Caching strategies for offline reliability (VAN-92).
* **Installability:** Web Manifest for "Add to Home Screen" support on iOS/Android.
* **Geolocation:** Standard Geolocation API.

## 3. Infrastructure
* **Prototyping:** Vercel for instant previews and team feedback.
