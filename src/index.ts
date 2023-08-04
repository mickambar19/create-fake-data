#!/usr/bin/env node
import { Command } from 'commander'
import generator from './faker-generator.js'

const main = () => {
  const program = new Command()
  program.command('faker-generator', { isDefault: true }).action(async () => {
    await generator()
  })
  program.parse()
}

main()
