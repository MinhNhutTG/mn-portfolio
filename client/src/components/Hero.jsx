import { motion } from 'framer-motion';
import { FiArrowDown, FiGithub, FiLinkedin, FiFacebook } from 'react-icons/fi';
import AvatarScene from '../three/AvatarScene';
import { profile } from '../data/profile';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="hero-badge">VIP PORTFOLIO</span>
          <h1>
            Xin chào, tôi là <span className="gold-text">{profile.name}</span>
          </h1>
          <h2 className="hero-role">{profile.role}</h2>
          <p className="hero-tagline">{profile.tagline}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Xem dự án
            </a>
            <a href="#contact" className="btn btn-outline">
              Liên hệ ngay
            </a>
          </div>

          <div className="hero-socials">
            <a href={profile.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href={profile.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FiFacebook />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-canvas"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <AvatarScene />
          <p className="hero-canvas-hint">Kéo để xoay nhân vật 3D</p>
        </motion.div>
      </div>

      <a href="#about" className="hero-scroll">
        <FiArrowDown />
      </a>
    </section>
  );
}
