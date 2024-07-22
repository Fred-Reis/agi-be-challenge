import { prisma } from '@/lib/prisma'

const DEFAULT_PUBLIC_PROVIDERS = [
  'gmail',
  'yahoo',
  'outlook',
  'outmail',
  'hotmail',
  'live',
  'aol',
  'msn',
  'ymail',
  'ig',
]
async function seed() {
  for (const email of DEFAULT_PUBLIC_PROVIDERS) {
    await prisma.public_Provider.create({
      data: {
        name: email,
      },
    })
  }
}

seed().then(() => {
  prisma.$disconnect()
})
