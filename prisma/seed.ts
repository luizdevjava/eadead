import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Iniciando seed do banco de dados...')

  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eadfacil.com' },
    update: {},
    create: {
      email: 'admin@eadfacil.com',
      name: 'Administrador',
      passwordHash: adminPassword,
      role: 'ADMIN'
    }
  })

  // Criar usuário estudante de exemplo
  const studentPassword = await bcrypt.hash('student123', 12)
  const student = await prisma.user.upsert({
    where: { email: 'student@eadfacil.com' },
    update: {},
    create: {
      email: 'student@eadfacil.com',
      name: 'João Silva',
      passwordHash: studentPassword,
      role: 'STUDENT'
    }
  })

  // Criar configurações do curso
  const courseSettings = await prisma.courseSettings.upsert({
    where: { id: 'default-course' },
    update: {},
    create: {
      id: 'default-course',
      title: 'Marketing Digital Completo',
      description: 'Domine todas as estratégias de marketing digital para alavancar seus resultados. Este curso completo cobre desde os fundamentos até estratégias avançadas.',
      coverUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      totalHours: 24,
      price: 197.00
    }
  })

  // Criar módulos
  const modules = await Promise.all([
    prisma.module.upsert({
      where: { id: 'module-1' },
      update: {},
      create: {
        id: 'module-1',
        name: 'Módulo 1 - Fundamentos',
        order: 1,
        courseId: courseSettings.id
      }
    }),
    prisma.module.upsert({
      where: { id: 'module-2' },
      update: {},
      create: {
        id: 'module-2',
        name: 'Módulo 2 - SEO',
        order: 2,
        courseId: courseSettings.id
      }
    }),
    prisma.module.upsert({
      where: { id: 'module-3' },
      update: {},
      create: {
        id: 'module-3',
        name: 'Módulo 3 - Marketing de Conteúdo',
        order: 3,
        courseId: courseSettings.id
      }
    })
  ])

  // Criar aulas
  const lessons = await Promise.all([
    // Módulo 1
    prisma.lesson.create({
      data: {
        title: 'Introdução ao Marketing Digital',
        description: 'Conceitos fundamentais e importância do marketing digital nos negócios modernos.',
        duration: 15,
        driveUrl: 'https://drive.google.com/file/d/1_example_intro/preview',
        order: 1,
        moduleId: modules[0].id
      }
    }),
    prisma.lesson.create({
      data: {
        title: 'Planejamento de Marketing Digital',
        description: 'Como estruturar um plano de marketing digital eficaz para seu negócio.',
        duration: 20,
        driveUrl: 'https://drive.google.com/file/d/2_example_planning/preview',
        order: 2,
        moduleId: modules[0].id
      }
    }),
    prisma.lesson.create({
      data: {
        title: 'Métricas e KPIs',
        description: 'Principais indicadores de performance e como analisá-los.',
        duration: 18,
        driveUrl: 'https://drive.google.com/file/d/3_example_metrics/preview',
        order: 3,
        moduleId: modules[0].id
      }
    }),
    // Módulo 2
    prisma.lesson.create({
      data: {
        title: 'SEO - Otimização para Mecanismos de Busca',
        description: 'Fundamentos de SEO e como otimizar seu site para o Google.',
        duration: 25,
        driveUrl: 'https://drive.google.com/file/d/4_example_seo/preview',
        order: 4,
        moduleId: modules[1].id
      }
    }),
    prisma.lesson.create({
      data: {
        title: 'Pesquisa de Palavras-chave',
        description: 'Como encontrar as melhores palavras-chave para seu negócio.',
        duration: 22,
        driveUrl: 'https://drive.google.com/file/d/5_example_keywords/preview',
        order: 5,
        moduleId: modules[1].id
      }
    }),
    // Módulo 3
    prisma.lesson.create({
      data: {
        title: 'Marketing de Conteúdo',
        description: 'Como criar conteúdo relevante que atrai e converte clientes.',
        duration: 30,
        driveUrl: 'https://drive.google.com/file/d/6_example_content/preview',
        order: 6,
        moduleId: modules[2].id
      }
    })
  ])

  // Criar assinatura para o estudante
  await prisma.subscription.create({
    data: {
      userId: student.id,
      status: 'ACTIVE',
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 ano
      paymentProvider: 'MANUAL',
      providerId: 'manual-payment-001'
    }
  })

  // Marcar algumas aulas como concluídas para o estudante
  await Promise.all([
    prisma.studentLesson.create({
      data: {
        studentId: student.id,
        lessonId: lessons[0].id,
        completedAt: new Date()
      }
    }),
    prisma.studentLesson.create({
      data: {
        studentId: student.id,
        lessonId: lessons[1].id,
        completedAt: new Date()
      }
    })
  ])

  // Criar banners de exemplo
  await Promise.all([
    prisma.banner.create({
      data: {
        title: '🔥 Promoção Especial - 50% OFF',
        description: 'Aproveite nossa promoção de lançamento! Matricule-se agora com 50% de desconto.',
        imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=300&fit=crop',
        linkUrl: 'https://eadfacil.com/promo',
        isActive: true,
        position: 'TOP',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias
      }
    }),
    prisma.banner.create({
      data: {
        title: '📚 Novo Curso Disponível',
        description: 'Conheça nosso novo curso de Marketing Avançado!',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
        linkUrl: 'https://eadfacil.com/novo-curso',
        isActive: true,
        position: 'SIDEBAR'
      }
    }),
    prisma.banner.create({
      data: {
        title: '🎓 Certificado Gratuito',
        description: 'Garanta seu certificado ao concluir qualquer curso!',
        imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=200&fit=crop',
        linkUrl: 'https://eadfacil.com/certificados',
        isActive: true,
        position: 'BOTTOM'
      }
    })
  ])

  console.log('Seed concluído com sucesso!')
  console.log('Usuário admin: admin@eadfacil.com / admin123')
  console.log('Usuário estudante: student@eadfacil.com / student123')
  console.log('Banners criados: 3 banners de exemplo')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })