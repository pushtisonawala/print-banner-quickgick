"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PencilLine, Trash2, Download } from "lucide-react"
// import { useToast } from "@/components/ui/use-toast"

// Mock saved designs data (in a real app, this would come from your backend)
const savedDesigns = [
  {
    id: 1,
    name: "Business Card Design 1",
    type: "Business Card",
    lastModified: "2024-01-15",
    thumbnail: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Company Flyer",
    type: "Flyer",
    lastModified: "2024-01-10",
    thumbnail: "/placeholder.svg?height=300&width=300",
  },
]

export default function SavedDesignsPage() {
  // const { toast } = useToast()

  const handleDelete = (id: number) => {
    // In a real app, you would delete the design from your backend
    alert("The design has been successfully deleted.")
    // toast({
    //   title: "Design deleted",
    //   description: "The design has been successfully deleted.",
    // })
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Saved Designs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedDesigns.map((design) => (
              <Card key={design.id}>
                <CardContent className="p-4">
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={design.thumbnail || "/placeholder.svg"}
                      alt={design.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mb-2">{design.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{design.type}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Last modified: {new Date(design.lastModified).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <PencilLine className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleDelete(design.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

