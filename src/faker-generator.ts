import { input } from '@inquirer/prompts'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { cwd } from 'node:process'
import { faker } from '@faker-js/faker'

const FAKER_METHOD_TYPE: Record<string, () => string> = {
  email: faker.internet.email,
}

const generator = async () => {
  const nRecords = +(await input({ message: 'How many records do you need' }))

  console.log(nRecords)
  console.log('I will get the structure from ./base.json')

  const fileContent = await (
    await readFile(path.join(cwd(), './base.json'), 'utf-8')
  ).toString()

  const baseTemplate: Record<string, string> = JSON.parse(fileContent)

  const fakedItems = []
  for (let idx = 0; idx < nRecords; idx++) {
    const fakeItem: Record<string, string> = {}
    Object.entries(baseTemplate).map(([key, fakerType]) => {
      if (FAKER_METHOD_TYPE[fakerType])
        fakeItem[key] = FAKER_METHOD_TYPE[fakerType]()
    })
    fakedItems.push(fakeItem)
  }

  await writeFile(
    path.join(cwd(), `${new Date().getTime()}_fakedData.json`),
    JSON.stringify(fakedItems, null, 2),
    'utf-8'
  )
  console.log('\x1b[0;36m Faked data created under fakedData.json\x1b[0m')
}

export default generator
