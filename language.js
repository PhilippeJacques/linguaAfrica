
export default {
  name: 'language',
  title: 'Langues Africaines',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom de la langue',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'Anglais' }
      ]
    },
    {
      name: 'region',
      title: 'Région',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'Anglais' }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'Anglais' }
      ]
    },
    { 
      name: 'flag', 
      title: 'Code Pays (ex: sn, cd, ng)', 
      type: 'string',
      description: 'Utilisez les codes ISO 2 lettres pour FlagCDN'
    },
    { name: 'emoji', title: 'Emoji (Fallback)', type: 'string' }
  ]
}
