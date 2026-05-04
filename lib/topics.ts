export type Topic = {
  slug: string;
  title: string;
  description: string;
};

export const mechanicsTopics: Topic[] = [
  {
    slug: "uniform-motion",
    title: "Равномерное прямолинейное движение",
    description:
      "Скорость, координата, перемещение, графики зависимости, вектор, время движения.",
  },
  {
    slug: "density",
    title: "Плотность",
    description:
      "Масса, объем, плотность, формула плотности, средняя плотность, единицы измерения.",
  },
  {
    slug: "friction",
    title: "Трение",
    description:
      "Сила трения, нормальная реакция, коэффициент трения, трение покоя и скольжения.",
  },
];

export function getTopicBySlug(slug: string) {
  return mechanicsTopics.find((topic) => topic.slug === slug) ?? null;
}

