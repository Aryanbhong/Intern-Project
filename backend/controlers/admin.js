// Add Store
export const addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const store = await prisma.store.create({
      data: { name, email, address, ownerId },
    });
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const adminStats = async (req, res) => {
  try {
    const users = await prisma.user.count();
    const stores = await prisma.store.count();
    const ratings = await prisma.rating.count();
    res.json({ users, stores, ratings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listUsers = async (req, res) => {
  try {
    const { name, email, role } = req.query;
    const users = await prisma.user.findMany({
      where: {
        name: name ? { contains: name } : undefined,
        email: email ? { contains: email } : undefined,
        role: role ? role : undefined,
      },
      select: { id: true, name: true, email: true, role: true, address: true },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
