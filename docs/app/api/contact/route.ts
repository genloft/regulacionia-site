import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Forzar a que la ruta sea dinámica para evitar problemas de caché con CORS
export const dynamic = 'force-dynamic'

// Cabeceras para solucionar el problema de CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  console.log('>>> Petición recibida en /api/contact');

  try {
    const data = await request.json()

    // Define la ruta donde se guardará el archivo JSON
    const filePath = path.join('/tmp', 'submissions.json')
    const dirPath = path.dirname(filePath)

    // Asegura que el directorio 'data' exista
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }

    // Lee los datos existentes, si el archivo existe
    let submissions = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      submissions = fileContent ? JSON.parse(fileContent) : []
    }

    // Añade el nuevo envío y lo escribe en el archivo
    submissions.push(data)
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2))

    return NextResponse.json({ message: 'Datos recibidos con éxito' }, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error al guardar los datos' }, { status: 500, headers: corsHeaders })
  }
}