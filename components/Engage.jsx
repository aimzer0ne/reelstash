'use client';

import { useEffect, useState } from 'react';
import { Icon } from './Icons';
import { useI18n } from './I18nProvider';
import './engage.css';

// Page-wide polish for the long tool pages: a scroll progress rule, sections that
// fade in as they arrive, a jump nav that tracks the section in view, and a
// floating button back to the link box once it has scrolled away.
export function Engage() {
  const { t } = useI18n();
  const [showJump, setShowJump] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty('--scroll', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0');
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Content stays visible without JS or with reduced motion; only then is it hidden to animate in.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;
    const targets = document.querySelectorAll(
      '.home-copy > section, .home-copy > .panel, .feature-showcase-grid > li, .tool-hub-grid > li, .how-guide > li, .guide-cards > li'
    );
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    for (const el of targets) {
      // Anything already on screen at load shows immediately instead of flashing.
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.classList.add('reveal');
      const siblings = Array.from(el.parentElement?.children || []);
      if (el.tagName === 'LI') el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 5) * 70}ms`);
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const links = Array.from(document.querySelectorAll('.home-jump a[href^="#"]'));
    const sections = links
      .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
      .filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;
    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
      const current = sections.find((section) => visible.get(section.id));
      for (const link of links) {
        const on = current && link.getAttribute('href') === `#${current.id}`;
        link.classList.toggle('is-active', Boolean(on));
        if (on) link.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
      }
    }, { rootMargin: '-35% 0px -60% 0px' });
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const form = document.querySelector('.link-form');
    if (!form || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setShowJump(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  function backToBox() {
    const input = document.getElementById('instagram-url');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => input?.focus({ preventScroll: true }), 450);
  }

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <button
        className={showJump ? 'jump-to-box is-shown' : 'jump-to-box'}
        type="button"
        onClick={backToBox}
        tabIndex={showJump ? 0 : -1}
        aria-hidden={!showJump}
      >
        <Icon name="download" />
        {t('newDownload')}
      </button>
    </>
  );
}
