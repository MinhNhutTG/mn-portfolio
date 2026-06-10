import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import './Skills.css';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Kỹ năng</span>
          <h2 className="section-title">Chuyên môn của tôi</h2>
          <p className="section-subtitle">
            Các công nghệ và công cụ tôi sử dụng thành thạo để xây dựng sản phẩm.
          </p>
        </motion.div>

        <div className="skills-grid">
          {profile.skills.map((skill, i) => (
            <motion.div
              className="skill-card glass"
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="skill-header">
                <span>{skill.name}</span>
                <span className="gold-text">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, delay: i * 0.08, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
