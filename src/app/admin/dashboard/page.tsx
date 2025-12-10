"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, TrendingUp, DollarSign, PlayCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLessons: 0,
    totalRevenue: 0,
    recentAccess: 0
  })

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
    }
    // Verificar se é admin
    if (session.user?.role !== "ADMIN") {
      router.push("/dashboard")
    }
  }, [session, status, router])

  useEffect(() => {
    // Mock data - substituir com chamada API real
    setStats({
      totalStudents: 1234,
      totalLessons: 48,
      totalRevenue: 245678,
      recentAccess: 89
    })
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

  if (!session || session.user?.role !== "ADMIN") {
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
              <span className="text-xl font-bold text-slate-900">EadFácil Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link href="/admin/aulas" className="text-slate-600 hover:text-blue-600 transition-colors">
                Aulas
              </Link>
              <Link href="/admin/banners" className="text-slate-600 hover:text-blue-600 transition-colors">
                Banners
              </Link>
              <Link href="/admin/usuarios" className="text-slate-600 hover:text-blue-600 transition-colors">
                Usuários
              </Link>
              <Link href="/admin/configuracoes" className="text-slate-600 hover:text-blue-600 transition-colors">
                Configurações
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{session.user?.name}</p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-red-600">
                {session.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Administrativo</h1>
          <p className="text-slate-600">
            Visão geral da sua plataforma de cursos online
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-slate-600">
                +12% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aulas Cadastradas</CardTitle>
              <PlayCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLessons}</div>
              <p className="text-xs text-slate-600">
                6 módulos • 24 horas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.totalRevenue.toLocaleString('pt-BR')}</div>
              <p className="text-xs text-slate-600">
                +23% em relação ao mês passado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acessos Recentes</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentAccess}</div>
              <p className="text-xs text-slate-600">
                Últimas 24 horas
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Students */}
          <Card>
            <CardHeader>
              <CardTitle>Alunos Recentes</CardTitle>
              <CardDescription>
                Últimos alunos que se cadastraram na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "João Silva", email: "joao@email.com", date: "Hoje", status: "Ativo" },
                  { name: "Maria Santos", email: "maria@email.com", date: "Ontem", status: "Ativo" },
                  { name: "Pedro Oliveira", email: "pedro@email.com", date: "2 dias atrás", status: "Pendente" },
                  { name: "Ana Costa", email: "ana@email.com", date: "3 dias atrás", status: "Ativo" }
                ].map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">{student.name}</p>
                      <p className="text-sm text-slate-600">{student.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">{student.date}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        student.status === "Ativo" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Ver todos os alunos
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Ações recentes na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Novo aluno cadastrado", detail: "João Silva", time: "5 minutos atrás", icon: Users },
                  { action: "Aula concluída", detail: "Módulo 1 - Aula 3", time: "15 minutos atrás", icon: PlayCircle },
                  { action: "Novo pagamento", detail: "R$ 197,00 - Maria Santos", time: "1 hora atrás", icon: DollarSign },
                  { action: "Aula atualizada", detail: "SEO para Google", time: "2 horas atrás", icon: BookOpen }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <activity.icon className="w-4 h-4 text-blue-600" />
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

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Acesso rápido às funções mais utilizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/admin/aulas/nova">
                  <Button variant="outline" className="w-full justify-start">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Nova Aula
                  </Button>
                </Link>
                <Link href="/admin/banners">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Gerenciar Banners
                  </Button>
                </Link>
                <Link href="/admin/usuarios">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Gerenciar Usuários
                  </Button>
                </Link>
                <Link href="/admin/configuracoes">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Configurar Curso
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}