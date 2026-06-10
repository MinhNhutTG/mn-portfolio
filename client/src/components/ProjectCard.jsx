import { motion } from 'framer-motion';
import { FiExternalLink, FiStar } from 'react-icons/fi';
import './ProjectCard.css';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      className="project-card glass"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {project.featured && (
        <span className="project-badge">
          <FiStar /> Nổi bật
        </span>
      )}

      {project.image && (
        <div className="project-image">
          <img src={project.image} alt={project.title} loading="lazy" />
        </div>
      )}

      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {project.tags?.length > 0 && (
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
            Xem chi tiết <FiExternalLink />
          </a>
        )}
      </div>
    </motion.article>
  );
}
