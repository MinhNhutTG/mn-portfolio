const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');

async function readProjects() {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function writeProjects(projects) {
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), 'utf-8');
}

// GET /api/projects - public
router.get('/', async (req, res) => {
  const projects = await readProjects();
  res.json(projects);
});

// POST /api/projects - protected
router.post('/', requireAuth, async (req, res) => {
  const { title, description, image, tags, link, featured } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Thiếu tiêu đề hoặc mô tả' });
  }

  const projects = await readProjects();
  const newProject = {
    id: crypto.randomUUID(),
    title,
    description,
    image: image || '',
    tags: Array.isArray(tags) ? tags : [],
    link: link || '',
    featured: Boolean(featured),
  };

  projects.unshift(newProject);
  await writeProjects(projects);
  res.status(201).json(newProject);
});

// PUT /api/projects/:id - protected
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, tags, link, featured } = req.body;

  const projects = await readProjects();
  const index = projects.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Không tìm thấy project' });
  }

  projects[index] = {
    ...projects[index],
    title: title ?? projects[index].title,
    description: description ?? projects[index].description,
    image: image ?? projects[index].image,
    tags: Array.isArray(tags) ? tags : projects[index].tags,
    link: link ?? projects[index].link,
    featured: featured ?? projects[index].featured,
  };

  await writeProjects(projects);
  res.json(projects[index]);
});

// DELETE /api/projects/:id - protected
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const projects = await readProjects();
  const filtered = projects.filter((p) => p.id !== id);

  if (filtered.length === projects.length) {
    return res.status(404).json({ message: 'Không tìm thấy project' });
  }

  await writeProjects(filtered);
  res.status(204).end();
});

module.exports = router;
