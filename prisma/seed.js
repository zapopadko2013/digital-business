const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Проверяем, есть ли уже профили в базе
  const existingProfileCount = await prisma.profile.count();

  if (existingProfileCount > 0) {
    console.log('В базе данных уже есть данные. Наполнение пропущено.');
    return;
  }

  console.log('База данных пуста. Заполняем нормализованными данными...');

  const skillsData = [
    { name: 'TypeScript', category: 'Languages' },
    { name: 'JavaScript', category: 'Languages' },
    { name: 'Java', category: 'Languages' },
    { name: 'PHP', category: 'Languages' },
    { name: 'C#', category: 'Languages' },
    { name: 'Python', category: 'Languages' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'NestJS', category: 'Backend' },
    { name: 'GraphQL', category: 'API' },
    { name: 'Prisma ORM', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Git', category: 'Tools' },
  ];

  const projectsData = [
    {
      name: 'Программа кассы',
      url: '',
    },
    {
      name: 'Программа серверной части веб портала',
      url: '',
    },
    {
      name: 'Программа клиентской части веб портала',
      url: '',
    },
  ];

  
  const person = await prisma.person.create({
    data: {
      email: 'zapopadko2013@mail.ru',
      firstName: "Роман",    
      lastName: "Запопадько",  
            
      
      skills: {
        create: skillsData,
      },

      experiences: {
        create: [
          {
            position: 'Программист',
            period: 'Май 2022 — Настоящее время',
            achievements: [
              'Программировал на языках java, javascript(node.js, react). В программе кассы на java делал различные изменения, дополнения. Удалось добавить в неё работу с сервисом киргизским офд, что позволило выйти с продажами программы на рынок Кыргызстана. Добавил работу с новой бонусной системой sagi и каспи терминалом. Изменял серверную часть и разрабатывал клиентскую часть с новым дизайном. Разрабатывал интеграции со сторонними сервисами и ОФД.',
            ],
            company: {
              connectOrCreate: {
                where: { name: 'ТОО Isme' },
                create: { name: 'ТОО Isme' },
              },
            },
          },
          {
            position: 'Программист',
            period: 'Сентябрь 2021 — Май 2022',
            achievements: [
              'Программирование на языках sql, go, python',
            ],
            company: {
              connectOrCreate: {
                where: { name: 'ТОО Btmc' },
                create: { name: 'ТОО Btmc' },
              },
            },
          },
        ],
      },

      projects: {
        create: projectsData,
      },
    },
    include: {
      skills: true,
      experiences: true,
      projects: true,
    },
  });

  console.log(`Создан Person с ID: ${person.id}. Создаем витрину (Profile)...`);

  const profile = await prisma.profile.create({
    data: {
      slug: 'default',
      name: 'Запопадько Роман — Fullstack & Backend Developer',
      description: 'Программист, Backend, Frontend, Fullstack разработчик.',
      links: [
        "https://github.com/zapopadko2013",
        "https://linkedin.com/in/example",
        "https://t.me/rzapopadko"
      ],
      personId: person.id,

      skills: {
        connect: person.skills.map((skill) => ({ id: skill.id })),
      },

       experiences: {
        connect: person.experiences.map((exp) => ({ id: exp.id })),
      },

      projects: {
        connect: person.projects.map((proj) => ({ id: proj.id })),
      },
    },
    include: {
      person: true,
      skills: true,
      experiences: { include: { company: true } },
      projects: true,
    },
  });

  console.log('База данных успешно заполнена. Профиль создан:', profile.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });