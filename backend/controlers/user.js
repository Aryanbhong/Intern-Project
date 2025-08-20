
export const listStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        ratings: {
          select: { score: true, userId: true },
        },
      },
    });

    const result = stores.map((s) => {
      const avg =
        s.ratings.length > 0
          ? s.ratings.reduce((sum, r) => sum + r.score, 0) / s.ratings.length
          : 0;
      const myRating = s.ratings.find((r) => r.userId === req.user.id);
      return {
        id: s.id,
        name: s.name,
        address: s.address,
        avgRating: avg.toFixed(2),
        myRating: myRating ? myRating.score : null,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const submitRating = async (req, res) => {
  try {
    const { storeId, score } = req.body;

    const rating = await prisma.rating.upsert({
      where: { userId_storeId: { userId: req.user.id, storeId } },
      update: { score },
      create: { score, userId: req.user.id, storeId },
    });

    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
