export type Topic = {
  slug: string;
  title: string;
  description: string;
  section: {
    title: string;
    href: string;
  };
};

export const mechanicsTopics: Topic[] = [
  {
    slug: "uniform-motion",
    title: "Равномерное прямолинейное движение",
    description:
      "Скорость, координата, перемещение, графики зависимости, вектор, время движения.",
    section: {
      title: "Механика",
      href: "/mechanics",
    },
  },
  {
    slug: "density",
    title: "Плотность",
    description:
      "Масса, объем, плотность, формула плотности, средняя плотность, единицы измерения.",
    section: {
      title: "Механика",
      href: "/mechanics",
    },
  },
  {
    slug: "friction",
    title: "Трение",
    description:
      "Сила трения, нормальная реакция, коэффициент трения, трение покоя и скольжения.",
    section: {
      title: "Механика",
      href: "/mechanics",
    },
  },
];

export function getTopicBySlug(slug: string) {
  return mechanicsTopics.find((topic) => topic.slug === slug) ?? null;
}
