Project Context: Interactive Portfolio
This project is a personal portfolio website designed to showcase my skills as a front-end developer and animator by prioritizing performance, modern aesthetics, and fluid interaction.

Overview
A clean, one-page portfolio built to be fast, responsive, and visually memorable. Its core goal is to elevate standard navigation and scrolling into an engaging, high-performance experience, reflecting my commitment to user experience and front-end polish.

Technical Stack
Front-end: HTML5, CSS3 (Vanilla & Custom Layouts)

Interaction/Animation: Vanilla JavaScript and GSAP (GreenSock Animation Platform)

Styling: Focus on modern typography, semantic HTML, and fluid design principles.

Key Features & Innovation
GSAP-Driven Cursor Effect: The central feature is a custom, interactive cursor implemented entirely with GSAP. It tracks the mouse movement smoothly and utilizes GSAP's high-performance transforms to create a low-latency, dynamic visual trail or halo effect that highlights interactive elements (links, buttons) on hover.

Smooth Scrolling & Transitions: GSAP's ScrollTrigger and gsap.to() methods are used to deliver jank-free, custom scrolling between sections and orchestrate complex "staggered" appearance animations for project cards and text blocks as they enter the viewport.

High Performance: By relying on GSAP, which leverages CSS hardware acceleration (transforms and opacity), the site achieves smooth 60fps animations, avoiding the performance issues often associated with complex JavaScript-based cursor and scroll effects.