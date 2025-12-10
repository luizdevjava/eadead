"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { BookOpen, Plus, Edit, Trash2, Image as ImageIcon, Eye } from "lucide-react"
import Link from "next/link"

interface Banner {
  id: string
  title: string
  description?: string
  imageUrl: string
  linkUrl?: string
  isActive: boolean
  position: "TOP" | "SIDEBAR" | "BOTTOM"
  startDate?: string
  endDate?: string
  createdAt: string
}

export default function AdminBannersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true,
    position: "TOP" as "TOP" | "SIDEBAR" | "BOTTOM",
    startDate: "",
    endDate: ""
  })

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      router.push("/login")
    }
    if (session.user?.role !== "ADMIN") {
      router.push("/dashboard")
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
        isActive: true,
        position: "TOP",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "2",
        title: "📚 Novo Curso Disponível",
        description: "Conheça nosso novo curso de Marketing Avançado!",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
        linkUrl: "https://eadfacil.com/novo-curso",
        isActive: true,
        position: "SIDEBAR",
        createdAt: "2024-01-02T00:00:00Z"
      }
    ]

    setTimeout(() => {
      setBanners(mockBanners)
      setLoading(false)
    }, 1000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Mock API call - substituir com chamada real
      if (editingBanner) {
        setBanners(banners.map(banner => 
          banner.id === editingBanner.id 
            ? {
                ...banner,
                title: formData.title,
                description: formData.description,
                imageUrl: formData.imageUrl,
                linkUrl: formData.linkUrl,
                isActive: formData.isActive,
                position: formData.position,
                startDate: formData.startDate,
                endDate: formData.endDate
              }
            : banner
        ))
      } else {
        const newBanner: Banner = {
          id: Date.now().toString(),
          title: formData.title,
          description: formData.description,
          imageUrl: formData.imageUrl,
          linkUrl: formData.linkUrl,
          isActive: formData.isActive,
          position: formData.position,
          startDate: formData.startDate,
          endDate: formData.endDate,
          createdAt: new Date().toISOString()
        }
        setBanners([...banners, newBanner])
      }
      
      setShowForm(false)
      setEditingBanner(null)
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        linkUrl: "",
        isActive: true,
        position: "TOP",
        startDate: "",
        endDate: ""
      })
    } catch (error) {
      console.error("Erro ao salvar banner:", error)
    }
  }

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      description: banner.description || "",
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl || "",
      isActive: banner.isActive,
      position: banner.position,
      startDate: banner.startDate || "",
      endDate: banner.endDate || ""
    })
    setShowForm(true)
  }

  const handleDelete = async (bannerId: string) => {
    if (confirm("Tem certeza que deseja excluir este banner?")) {
      try {
        // Mock API call - substituir com chamada real
        setBanners(banners.filter(banner => banner.id !== bannerId))
      } catch (error) {
        console.error("Erro ao excluir banner:", error)
      }
    }
  }

  const handleToggleActive = async (bannerId: string) => {
    try {
      // Mock API call - substituir com chamada real
      setBanners(banners.map(banner => 
        banner.id === bannerId 
          ? { ...banner, isActive: !banner.isActive }
          : banner
      ))
    } catch (error) {
      console.error("Erro ao alterar status do banner:", error)
    }
  }

  if (status === "loading" || loading) {
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
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">EadFácil Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/aulas" className="text-slate-600 hover:text-blue-600 transition-colors">
                Aulas
              </Link>
              <Link href="/admin/banners" className="text-blue-600 font-medium">
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gerenciar Banners</h1>
            <p className="text-slate-600">
              Crie e gerencie banners promocionais para os alunos
            </p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Banner
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingBanner ? "Editar Banner" : "Novo Banner"}</CardTitle>
              <CardDescription>
                Preencha os dados do banner
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título do Banner</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Ex: Promoção Especial - 50% OFF"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Posição</Label>
                    <Select value={formData.position} onValueChange={(value: "TOP" | "SIDEBAR" | "BOTTOM") => setFormData({...formData, position: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a posição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TOP">Topo</SelectItem>
                        <SelectItem value="SIDEBAR">Barra Lateral</SelectItem>
                        <SelectItem value="BOTTOM">Rodapé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva a promoção ou anúncio..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">URL da Imagem</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="https://exemplo.com/imagem.jpg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkUrl">URL do Link (opcional)</Label>
                  <Input
                    id="linkUrl"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({...formData, linkUrl: e.target.value})}
                    placeholder="https://exemplo.com/promo"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data de Início (opcional)</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Data de Término (opcional)</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                  />
                  <Label htmlFor="isActive">Banner ativo</Label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    {editingBanner ? "Atualizar Banner" : "Criar Banner"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingBanner(null)
                      setFormData({
                        title: "",
                        description: "",
                        imageUrl: "",
                        linkUrl: "",
                        isActive: true,
                        position: "TOP",
                        startDate: "",
                        endDate: ""
                      })
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Banners List */}
        <div className="space-y-4">
          {banners.map((banner) => (
            <Card key={banner.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{banner.title}</h3>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        banner.isActive 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {banner.isActive ? "Ativo" : "Inativo"}
                      </span>
                      <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {banner.position === "TOP" ? "Topo" : banner.position === "SIDEBAR" ? "Barra Lateral" : "Rodapé"}
                      </span>
                    </div>
                    {banner.description && (
                      <p className="text-slate-600 mb-3">{banner.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <ImageIcon className="w-4 h-4" />
                        <span>Imagem configurada</span>
                      </div>
                      {banner.linkUrl && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>Link configurado</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span>Criado em {new Date(banner.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(banner.id)}
                    >
                      {banner.isActive ? "Desativar" : "Ativar"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(banner)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}