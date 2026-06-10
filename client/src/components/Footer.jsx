import { profile } from '../data/profile';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>
          © {new Date().getFullYear()} <span className="gold-text">{profile.name}</span>. All rights reserved.
        </span>
        <a href="/admin" className="footer-admin">
          Quản trị
        </a>
      </div>
    </footer>
  );
}
