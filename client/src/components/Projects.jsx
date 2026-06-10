import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../api/projects';
import ProjectCard from './ProjectCard';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Dự án</span>
          <h2 className="section-title">Sản phẩm đã thực hiện</h2>
          <p className="section-subtitle">
            Một số dự án tiêu biểu tôi đã xây dựng và phát triển.
          </p>
        </motion.div>

        {status === 'loading' && <p className="projects-status">Đang tải dự án...</p>}
        {status === 'error' && (
          <p className="projects-status">
            Không thể tải danh sách dự án. Vui lòng kiểm tra server backend.
          </p>
        )}
        {status === 'ready' && projects.length === 0 && (
          <p className="projects-status">Chưa có dự án nào được thêm.</p>
        )}

        {status === 'ready' && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((project, i) => (
              <ProjectCard project={project} index={i} key={project.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
