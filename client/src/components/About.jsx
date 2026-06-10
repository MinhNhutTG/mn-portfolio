import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import './About.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner about-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Về tôi</span>
          <h2 className="section-title">Giới thiệu bản thân</h2>
          <p className="section-subtitle">{profile.bio}</p>

          <div className="about-info">
            <div>
              <span className="about-label">Email</span>
              <span>{profile.email}</span>
            </div>
            <div>
              <span className="about-label">Điện thoại</span>
              <span>{profile.phone}</span>
            </div>
            <div>
              <span className="about-label">Địa điểm</span>
              <span>{profile.location}</span>
            </div>
          </div>

          <a href={profile.resumeUrl} className="btn btn-primary">
            Tải CV
          </a>
        </motion.div>

        <motion.div
          className="about-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {profile.stats.map((stat) => (
            <div className="stat-card glass" key={stat.label}>
              <span className="stat-value gold-text">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
