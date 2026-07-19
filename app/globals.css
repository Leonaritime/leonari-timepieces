@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0d0e10;
  color: #f3efe6;
}

::selection {
  background-color: #c7a66b;
  color: #0d0e10;
}

/* Museum-placard numbering — used consistently as the page's signature device */
.plate-label {
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #c7a66b;
}

/* Scroll reveal — driven by the Reveal component adding .is-visible via IntersectionObserver */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
  html {
    scroll-behavior: auto;
  }
}

/* Visible keyboard focus, on-brand */
:focus-visible {
  outline: 1px solid #c7a66b;
  outline-offset: 4px;
}

/* Thin hairline divider used throughout instead of heavy borders */
.hairline {
  height: 1px;
  background: linear-gradient(to right, transparent, #2a2c30 15%, #2a2c30 85%, transparent);
}
