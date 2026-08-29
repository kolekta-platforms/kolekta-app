import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ev7risxe',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  }
})
