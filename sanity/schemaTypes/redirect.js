export default {
  name: 'redirect',
  title: 'Redirects',
  type: 'document',
  icon: () => '🔀',
  fields: [
    {
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description: 'e.g. /old-page',
      validation: Rule => Rule.required().custom(source => {
        if (!source) return true
        return source.startsWith('/') ? true : 'Source must start with /'
      })
    },
    {
      name: 'destination',
      title: 'Destination Path',
      type: 'string',
      description: 'e.g. /new-page or https://google.com',
      validation: Rule => Rule.required()
    },
    {
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      initialValue: true,
      description: 'Use 301 for permanent moves, 302 for temporary.'
    }
  ],
  preview: {
    select: {
      source: 'source',
      destination: 'destination',
      permanent: 'permanent'
    },
    prepare({ source, destination, permanent }) {
      return {
        title: source,
        subtitle: `-> ${destination} (${permanent ? '301' : '302'})`
      }
    }
  }
}
