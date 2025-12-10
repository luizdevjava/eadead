"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BannerContainer } from "@/components/banner"
import { BookOpen, Clock, CheckCircle, PlayCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Banner {
  id: string
  title: string
  description?: string
  imageUrl: string
  linkUrl?: string
  position: "TOP" | "SIDEBAR" | "BOTTOM"
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [banners, setBanners] = useState<Banner[]>([])

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
    }
  }, [session, status, router])

  useEffect(() => {
    // Mock data - substituir com chamada API real
    const mockBanners: Banner[] = [
      {
        id: "1",
        title: "🔥 Promoção Especial - 50% OFF",
        description: "Aproveite nossa promoção de lançamento! Matricule-se agora com 50% de desconto.",
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=300&fit=crop",
        linkUrl: "https://eadfacil.com/promo",
        position: "TOP"
      },
      {
        id: "2",
        title: "📚 Novo Curso Disponível",
        description: "Conheça nosso novo curso de Marketing Avançado!",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
        linkUrl: "https://eadfacil.com/novo-curso",
        position: "SIDEBAR"
      }
    ]

    setTimeout(() => {
      setBanners(mockBanners)
    }, 1000)
  }, [])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">EadFácil</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/aulas" className="text-slate-600 hover:text-blue-600 transition-colors">
                Minhas Aulas
              </Link>
              <Link href="/assinatura" className="text-slate-600 hover:text-blue-600 transition-colors">
                Assinatura
              </Link>
              <Link href="/configuracoes" className="text-slate-600 hover:text-blue-600 transition-colors">
                Configurações
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{session.user?.name}</p>
              <p className="text-xs text-slate-500">{session.user?.email}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">
                {session.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Banners no topo */}
        <BannerContainer 
          banners={banners} 
          position="TOP" 
          className="mb-8"
        />

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Bem-vindo de volta, {session.user?.name}!
              </h1>
              <p className="text-slate-600">
                Continue aprendendo e acompanhe seu progresso
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Aulas Concluídas</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-slate-600">
                    +2 esta semana
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Horas de Estudo</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.5</div>
                  <p className="text-xs text-slate-600">
                    +1.5 esta semana
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Progresso</CardTitle>
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25%</div>
                  <p className="text-xs text-slate-600">
                    12 de 48 aulas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Próxima Aula</CardTitle>
                  <PlayCircle className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Módulo 3</div>
                  <p className="text-xs text-slate-600">
                    SEO para Google
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Current Course */}
            <Card>
              <CardHeader>
                <CardTitle>Marketing Digital Completo</CardTitle>
                <CardDescription>
                  Continue de onde parou
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Módulo 3 - Aula 5</h4>
                        <p className="text-sm text-slate-600">SEO para Google - 15 min</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Continuar
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Progresso do curso</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Concluiu aula", detail: "Módulo 2 - Introdução ao Marketing Digital", time: "2 horas atrás" },
                      { action: "Iniciou aula", detail: "Módulo 3 - SEO para Google", time: "1 dia atrás" },
                      { action: "Concluiu módulo", detail: "Módulo 1 - Fundamentos", time: "3 dias atrás" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                          <p className="text-sm text-slate-600">{activity.detail}</p>
                        </div>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Banner na sidebar */}
            <BannerContainer 
              banners={banners} 
              position="SIDEBAR" 
              className="mb-6"
            />

            <Card>
              <CardHeader>
                <CardTitle>Próximas Aulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "SEO para Google", duration: "15 min", module: "Módulo 3" },
                    { title: "Marketing de Conteúdo", duration: "20 min", module: "Módulo 4" },
                    { title: "Gestão de Redes Sociais", duration: "25 min", module: "Módulo 5" }
                  ].map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-sm text-slate-900">{lesson.title}</h5>
                        <p className="text-xs text-slate-600">{lesson.module} • {lesson.duration}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <PlayCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Banner no rodapé */}
        <BannerContainer 
          banners={banners} 
          position="BOTTOM" 
          className="mt-8"
        />
      </div>
    </div>
  )
}