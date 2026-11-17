
INSERT INTO "Person" (id, email, "firstName", "lastName", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(), 
    'ivan.petrov@example.com', 
    'Иван', 
    'Петров', 
    NOW(), 
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM "Person" WHERE email = 'ivan.petrov@example.com'
);



INSERT INTO "Profile" (id, slug, name, description, links, "personId", "createdAt", "updatedAt")
SELECT 
    gen_random_uuid(), 
    'ivan-petrov-backend',
    'Иван Петров — Senior Backend Developer',
    'Эксперт по бэкенд-разработке и проектированию отказоустойчивых систем.', 
    ARRAY[
        'https://github.com/ivan-petrov',
        'https://t.me/ivan_petrov'
    ], 
    pers.id, 
    NOW(), 
    NOW()
FROM "Person" pers
WHERE pers.email = 'ivan.petrov@example.com' 
  AND NOT EXISTS (
      SELECT 1 FROM "Profile" prof WHERE prof."personId" = pers.id AND prof.slug = 'ivan-petrov-backend'
  );


INSERT INTO "Company" (id, name, website)
SELECT gen_random_uuid(), 'ТОО Tech Star', 'https://techstar.example.com'
WHERE NOT EXISTS (SELECT 1 FROM "Company" WHERE name = 'ТОО Tech Star');



INSERT INTO "Skill" (id, name, category, "personId")
SELECT gen_random_uuid(), v.name, v.category, pers.id
FROM "Person" pers
CROSS JOIN (VALUES 
    ('TypeScript', 'Languages'),
    ('Node.js', 'Backend'),
    ('NestJS', 'Backend'),
    ('PostgreSQL', 'Database'),
    ('Docker', 'DevOps'),
    ('GraphQL', 'API')
) AS v(name, category)
WHERE pers.email = 'ivan.petrov@example.com'
  AND NOT EXISTS (
      SELECT 1 FROM "Skill" s 
      WHERE s.name = v.name AND s."personId" = pers.id
  );

INSERT INTO "_ProfileToSkill" ("A", "B")
SELECT prof.id, s.id
FROM "Profile" prof
JOIN "Person" pers ON pers.id = prof."personId"
CROSS JOIN "Skill" s
WHERE pers.email = 'ivan.petrov@example.com'
  AND prof.slug = 'ivan-petrov-backend'
  AND s.name IN ('TypeScript', 'Node.js', 'NestJS', 'PostgreSQL', 'Docker', 'GraphQL')
  AND NOT EXISTS (
      SELECT 1 FROM "_ProfileToSkill" ts 
      WHERE ts."A" = prof.id AND ts."B" = s.id
  );



INSERT INTO "Experience" (id, position, period, achievements, "personId", "companyId")
SELECT 
    gen_random_uuid(), 
    'Senior Backend Developer', 
    '2022 — Настоящее время', 
    ARRAY[
        'Разработка масштабируемой микросервисной архитектуры на NestJS и TypeScript.',
        'Оптимизация производительности базы данных PostgreSQL, снижение p99 latency в 2 раза.',
        'Внедрение контейнеризации и автоматизированных CI/CD пайплайнов с использованием Docker.'
    ], 
    pers.id, 
    comp.id
FROM "Person" pers
CROSS JOIN "Company" comp
WHERE pers.email = 'ivan.petrov@example.com' 
  AND comp.name = 'ТОО Tech Star'
  AND NOT EXISTS (
      SELECT 1 FROM "Experience" exp 
      WHERE exp."personId" = pers.id AND exp.position = 'Senior Backend Developer'
  );


INSERT INTO "_ExperienceToProfile" ("A", "B")
SELECT exp.id, prof.id
FROM "Experience" exp
JOIN "Person" pers ON pers.id = exp."personId"
JOIN "Profile" prof ON prof."personId" = pers.id
WHERE pers.email = 'ivan.petrov@example.com'
  AND prof.slug = 'ivan-petrov-backend'
  AND exp.position = 'Senior Backend Developer'
  AND NOT EXISTS (
      SELECT 1 FROM "_ExperienceToProfile" etp 
      WHERE etp."A" = exp.id AND etp."B" = prof.id
  );



INSERT INTO "Project" (id, name, url, "personId")
SELECT gen_random_uuid(), v.name, v.url, pers.id
FROM "Person" pers
CROSS JOIN (VALUES 
    ('Cloud Storage System', 'https://github.com/ivan-petrov/cloud-storage'),
    ('Enterprise GraphQL Gateway', 'https://github.com/ivan-petrov/graphql-gateway')
) AS v(name, url)
WHERE pers.email = 'ivan.petrov@example.com'
  AND NOT EXISTS (
      SELECT 1 FROM "Project" p WHERE p."personId" = pers.id AND p.name = v.name
  );


INSERT INTO "_ProfileToProject" ("A", "B")
SELECT prof.id, proj.id
FROM "Profile" prof
JOIN "Person" pers ON pers.id = prof."personId"
JOIN "Project" proj ON proj."personId" = pers.id
WHERE pers.email = 'ivan.petrov@example.com'
  AND prof.slug = 'ivan-petrov-backend'
  AND NOT EXISTS (
      SELECT 1 FROM "_ProfileToProject" ptp 
      WHERE ptp."A" = prof.id AND ptp."B" = proj.id
  );
