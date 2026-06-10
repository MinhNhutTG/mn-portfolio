import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut, FiStar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getProjects, createProject, updateProject, deleteProject } from '../api/projects';
import ProjectForm from '../components/admin/ProjectForm';
import BackgroundFX from '../components/BackgroundFX';
import './Admin.css';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const loadProjects = () => {
    setStatus('loading');
    getProjects()
      .then((data) => {
        setProjects(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddClick = () => {
    setEditingProject(null);
    setShowForm(true);
    setError('');
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setShowForm(true);
    setError('');
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    setError('');
    try {
      if (editingProject) {
        const updated = await updateProject(editingProject.id, data);
        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      } else {
        const created = await createProject(data);
        setProjects((prev) => [created, ...prev]);
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Xóa dự án "${project.title}"?`)) return;
    try {
      await deleteProject(project.id);
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
    } catch {
      setError('Không thể xóa dự án. Vui lòng thử lại.');
    }
  };

  return (
    <div className="admin-page">
      <BackgroundFX />
      <div className="admin-header">
        <h2>
          Quản lý <span className="gold-text">Dự án</span>
        </h2>
        <div className="admin-header-actions">
          <button className="btn btn-primary" onClick={handleAddClick}>
            <FiPlus /> Thêm dự án
          </button>
          <button className="btn btn-outline" onClick={logout}>
            <FiLogOut /> Đăng xuất
          </button>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {showForm && (
        <ProjectForm
          initialData={editingProject}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          submitting={submitting}
        />
      )}

      {status === 'loading' && <p className="projects-status">Đang tải...</p>}
      {status === 'error' && <p className="projects-status">Không thể tải danh sách dự án.</p>}

      {status === 'ready' && (
        <div className="admin-list">
          {projects.map((project, i) => (
            <motion.div
              className="admin-item glass"
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              {project.image && <img src={project.image} alt={project.title} className="admin-item-image" />}
              <div className="admin-item-body">
                <div className="admin-item-title">
                  <h4>{project.title}</h4>
                  {project.featured && <FiStar className="admin-item-star" />}
                </div>
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
              </div>
              <div className="admin-item-actions">
                <button className="icon-btn" onClick={() => handleEditClick(project)} aria-label="Sửa">
                  <FiEdit2 />
                </button>
                <button className="icon-btn icon-btn-danger" onClick={() => handleDelete(project)} aria-label="Xóa">
                  <FiTrash2 />
                </button>
              </div>
            </motion.div>
          ))}

          {projects.length === 0 && <p className="projects-status">Chưa có dự án nào. Hãy thêm dự án đầu tiên!</p>}
        </div>
      )}
    </div>
  );
}
