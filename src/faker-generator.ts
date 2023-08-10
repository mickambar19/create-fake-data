import { input } from '@inquirer/prompts'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { cwd } from 'node:process'
import { faker } from '@faker-js/faker'

const getFakerMethods = () => {
  const acc = (
    allMethods: Record<string, () => string>,
    item: Record<string, Record<string, () => string> | (() => string)>
  ): Record<string, () => string> => {
    for (const key of Object.keys(item)) {
      if (typeof item[key] === 'function') {
        if (!allMethods[key]) {
          allMethods[key] = <() => string>item[key]
        } else {
          allMethods[`${key}v2`] = <() => string>item[key]
        }
      }
      if (
        key !== 'faker' &&
        typeof item[key] === 'object' &&
        item[key] !== null &&
        !Array.isArray(item[key]) &&
        Object.keys(item[key]).length
      ) {
        acc(allMethods, <Record<string, () => string>>item[key])
      }
    }
    return allMethods
  }

  return acc({}, <Record<string, () => string>>(<unknown>faker))
}
const FAKER_METHOD_TYPE: Record<string, () => string> = getFakerMethods()

const generator = async () => {
  const nRecords = +(await input({ message: 'How many records do you need?' }))
  const fileContent = await readFile(path.join(cwd(), './base.json'), 'utf-8')
  const baseTemplate: Record<string, string> = JSON.parse(fileContent)
  const fakedItems = []
  const failedMethods: Record<string, boolean> = {}
  for (let idx = 0; idx < nRecords; idx++) {
    const fakeItem: Record<string, string> = {}
    for (const key of Object.keys(baseTemplate)) {
      const fakerType: string = baseTemplate[key]
      if (FAKER_METHOD_TYPE[fakerType])
        fakeItem[key] = FAKER_METHOD_TYPE[fakerType]()
      else if (!failedMethods[fakerType]) failedMethods[fakerType] = true
    }
    fakedItems.push(fakeItem)
  }

  await writeFile(
    path.join(cwd(), `${new Date().getTime()}_fakedData.json`),
    JSON.stringify(fakedItems, null, 2),
    'utf-8'
  )
  if (Object.keys(failedMethods).length)
    console.log(
      `\x1b[0;31m Not existing methods detected: [${Object.keys(
        failedMethods
      ).join()}]\x1b[0m`
    )
  console.log('\x1b[0;36m Faked data created under fakedData.json\x1b[0m')
}

export default generator
