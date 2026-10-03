import {defineType, defineField} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Not shown publicly. Kept for follow-up / spam checks.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(2000),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{type: 'post'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Comments are approved by default. Uncheck to hide from the site.',
      initialValue: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  initialValue: {
    approved: true,
  },
  orderings: [
    {
      title: 'Newest first',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'comment',
      approved: 'approved',
      postTitle: 'post.title',
    },
    prepare({title, subtitle, approved, postTitle}) {
      const status = approved ? '✓ Approved' : '⏳ Pending'
      return {
        title: title ?? 'Anonymous',
        subtitle: `${status} · ${postTitle ?? 'No post'} · ${(subtitle ?? '').slice(0, 80)}`,
      }
    },
  },
})
