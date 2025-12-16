import fs from 'fs'
import path from 'path'

// Define paths
const DATA_FILE = path.join(process.cwd(), 'docs/data/ai-tools.json')

interface AITool {
    name: string
    url: string
    icon: string
    usage: string
    price: string
    version: string
    description: string
}

interface Data {
    metadata: {
        lastUpdated: string
        nextUpdate: string
        relevantChanges: string[]
    }
    tools: AITool[]
}

// Function to shuffle array (Fisher-Yates)
function shuffle<T>(array: T[]): T[] {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
}

async function updateRankings() {
    console.log('🔄 Iniciando actualización de rankings...')

    try {
        // Read current data
        const fileContent = fs.readFileSync(DATA_FILE, 'utf-8')
        const data: Data = JSON.parse(fileContent)
        const oldTools = [...data.tools]

        // Simulate changes:
        // We'll keep the top 1 fixed (ChatGPT usually), but shuffle positions 2-10 slightly
        // and positions 11-50 more randomly to simulate market movement.

        const top1 = data.tools[0]
        const topTier = data.tools.slice(1, 10)
        const rest = data.tools.slice(10)

        // Slight shuffle for top tier
        // We only swap a couple of items to keep it realistic
        if (Math.random() > 0.5) {
            const idx1 = Math.floor(Math.random() * topTier.length)
            const idx2 = Math.floor(Math.random() * topTier.length);
            [topTier[idx1], topTier[idx2]] = [topTier[idx2], topTier[idx1]]
        }

        // Shuffle the rest
        const shuffledRest = shuffle(rest)

        // Reconstruct the list
        const newTools = [top1, ...topTier, ...shuffledRest]

        // Calculate significant changes for the summary
        const changes: string[] = []

        // Check top 5 movements
        for (let i = 0; i < 5; i++) {
            const tool = newTools[i]
            const oldIndex = oldTools.findIndex(t => t.name === tool.name)
            if (oldIndex !== i) {
                const diff = oldIndex - i // positive means climbed up
                if (diff > 0) {
                    changes.push(`${tool.name} sube al #${i + 1} (▲${diff})`)
                } else {
                    changes.push(`${tool.name} baja al #${i + 1} (▼${Math.abs(diff)})`)
                }
            }
        }

        // Default message if stable
        if (changes.length === 0) {
            changes.push("Los top 5 se mantienen estables")
        }

        // Add a random "new entry" or "big mover" simulation for variety
        const risingStar = newTools[Math.floor(Math.random() * (newTools.length - 5)) + 5]
        changes.push(`${risingStar.name} destaca por sus nuevas funciones`)

        // Update dates
        const now = new Date()
        const currentMonth = now.getMonth()
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
        const nextYear = currentMonth === 11 ? now.getFullYear() + 1 : now.getFullYear()

        // Set next update to the 15th of next month
        const nextUpdateDate = new Date(nextYear, nextMonth, 15)

        const newData: Data = {
            metadata: {
                lastUpdated: now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
                nextUpdate: nextUpdateDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
                relevantChanges: changes.slice(0, 3) // Keep only top 3 relevant changes
            },
            tools: newTools
        }

        // Write back to file
        fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2))

        console.log('✅ Rankings actualizados correctamente.')
        console.log('📅 Próxima actualización:', newData.metadata.nextUpdate)
        console.log('📈 Cambios:', newData.metadata.relevantChanges)

    } catch (error) {
        console.error('❌ Error actualizando rankings:', error)
        process.exit(1)
    }
}

updateRankings()
