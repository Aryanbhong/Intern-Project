
export const ownerStats = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      where: { ownerId: req.user.id },
      include: { ratings: true },
    });

    const stats = stores.map((store) => {
      const avg =
        store.ratings.length > 0
          ? store.ratings.reduce((sum, r) => sum + r.score, 0) / store.ratings.length
          : 0;
      return {
        storeId: store.id,
        storeName: store.name,
        avgRating: avg.toFixed(2),
        totalRatings: store.ratings.length,
      };
    });

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const ownerRatings = async (req, res) => {
  try {
    const ratings = await prisma.rating.findMany({
      where: { store: { ownerId: req.user.id } },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
