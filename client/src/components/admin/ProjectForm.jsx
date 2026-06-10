import { useState, useEffect } from 'react';
import './ProjectForm.css';

const emptyForm = {
  title: '',
  description: '',
  image: '',
  tags: '',
  link: '',
  featured: false,
};

export default function ProjectForm({ initialData, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        image: initialData.image || '',
        tags: (initialData.tags || []).join(', '),
        link: initialData.link || '',
        featured: Boolean(initialData.featured),
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      link: form.link.trim(),
      featured: form.featured,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <form className="project-form glass" onSubmit={handleSubmit}>
      <h3>{initialData ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}</h3>

      <div className="form-row">
        <label htmlFor="title">Tiêu đề *</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <label htmlFor="description">Mô tả *</label>
        <textarea id="description" name="description" rows={3} value={form.description} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <label htmlFor="image">URL hình ảnh</label>
        <input id="image" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
      </div>

      <div className="form-row">
        <label htmlFor="link">Link dự án</label>
        <input id="link" name="link" value={form.link} onChange={handleChange} placeholder="https://github.com/..." />
      </div>

      <div className="form-row">
        <label htmlFor="tags">Tags (phân cách bằng dấu phẩy)</label>
        <input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
      </div>

      <div className="form-row form-row-checkbox">
        <label htmlFor="featured">
          <input id="featured" name="featured" type="checkbox" checked={form.featured} onChange={handleChange} />
          Đánh dấu là dự án nổi bật
        </label>
      </div>

      <div className="project-form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Đang lưu...' : initialData ? 'Cập nhật' : 'Thêm dự án'}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
