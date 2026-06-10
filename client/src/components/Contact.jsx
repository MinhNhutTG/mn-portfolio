import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { profile } from '../data/profile';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Liên hệ từ ${form.name || 'Portfolio'}`);
    const body = encodeURIComponent(`${form.message}\n\nEmail liên hệ: ${form.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner contact-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Liên hệ</span>
          <h2 className="section-title">Kết nối với tôi</h2>
          <p className="section-subtitle">
            Bạn có dự án muốn hợp tác? Hãy gửi cho tôi một tin nhắn.
          </p>

          <div className="contact-info">
            <div className="contact-info-item glass">
              <FiMail />
              <span>{profile.email}</span>
            </div>
            <div className="contact-info-item glass">
              <FiPhone />
              <span>{profile.phone}</span>
            </div>
            <div className="contact-info-item glass">
              <FiMapPin />
              <span>{profile.location}</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          className="contact-form glass"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="form-row">
            <label htmlFor="name">Họ tên</label>
            <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Tên của bạn" />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="email@example.com" />
          </div>
          <div className="form-row">
            <label htmlFor="message">Lời nhắn</label>
            <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} placeholder="Nội dung tin nhắn..." />
          </div>
          <button type="submit" className="btn btn-primary">
            Gửi tin nhắn <FiSend />
          </button>
          {sent && <p className="contact-sent">Đang mở ứng dụng email của bạn...</p>}
        </motion.form>
      </div>
    </section>
  );
}
