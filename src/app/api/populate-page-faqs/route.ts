import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { pageSpecificFAQs } from '@/data/page-specific-faqs'

export async function POST(request: NextRequest) {
  try {
    console.log('Starting page-specific FAQs population...')

    for (const pageData of pageSpecificFAQs) {
      console.log(`Processing page: ${pageData.pageSlug}`)

      // Get the page ID
      const { data: pageRecord, error: pageError } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', pageData.pageSlug)
        .single()

      if (pageError || !pageRecord) {
        console.error(`Page not found: ${pageData.pageSlug}`, pageError)
        continue
      }

      for (const faqData of pageData.faqs) {
        // Check if FAQ with this question already exists
        let { data: existingFaq, error: faqSearchError } = await supabase
          .from('faqs')
          .select('id')
          .eq('question', faqData.question)
          .single()

        let faqId: string

        if (faqSearchError && faqSearchError.code === 'PGRST116') {
          // FAQ doesn't exist, create it
          const { data: newFaq, error: createError } = await supabase
            .from('faqs')
            .insert({
              question: faqData.question,
              answer: faqData.answer,
              category: faqData.category,
              tags: faqData.tags,
              is_featured: faqData.is_featured,
              display_order: faqData.display_order,
              is_active: true
            })
            .select('id')
            .single()

          if (createError) {
            console.error('Error creating FAQ:', createError)
            continue
          }

          faqId = newFaq.id
          console.log(`Created new FAQ: ${faqData.question}`)
        } else if (existingFaq) {
          // FAQ exists, update it with new data
          const { error: updateError } = await supabase
            .from('faqs')
            .update({
              answer: faqData.answer,
              category: faqData.category,
              tags: faqData.tags,
              is_featured: faqData.is_featured,
              display_order: faqData.display_order,
              updated_at: new Date().toISOString()
            })
            .eq('id', existingFaq.id)

          if (updateError) {
            console.error('Error updating FAQ:', updateError)
            continue
          }

          faqId = existingFaq.id
          console.log(`Updated existing FAQ: ${faqData.question}`)
        } else {
          console.error('Unexpected error searching for FAQ:', faqSearchError)
          continue
        }

        // Check if this FAQ is already assigned to this page
        const { data: existingAssignment, error: assignmentError } = await supabase
          .from('page_faqs')
          .select('id')
          .eq('page_id', pageRecord.id)
          .eq('faq_id', faqId)
          .single()

        if (assignmentError && assignmentError.code === 'PGRST116') {
          // Assignment doesn't exist, create it
          const { error: assignError } = await supabase
            .from('page_faqs')
            .insert({
              page_id: pageRecord.id,
              faq_id: faqId,
              display_order: faqData.display_order,
              is_featured: faqData.is_featured
            })

          if (assignError) {
            console.error('Error assigning FAQ to page:', assignError)
            continue
          }

          console.log(`Assigned FAQ to page: ${pageData.pageSlug}`)
        } else if (existingAssignment) {
          // Assignment exists, update it
          const { error: updateAssignmentError } = await supabase
            .from('page_faqs')
            .update({
              display_order: faqData.display_order,
              is_featured: faqData.is_featured
            })
            .eq('id', existingAssignment.id)

          if (updateAssignmentError) {
            console.error('Error updating page FAQ assignment:', updateAssignmentError)
            continue
          }

          console.log(`Updated FAQ assignment for page: ${pageData.pageSlug}`)
        }
      }
    }

    console.log('Page-specific FAQs population completed successfully!')

    return NextResponse.json({
      success: true,
      message: 'Page-specific FAQs populated successfully'
    })

  } catch (error) {
    console.error('Error populating page-specific FAQs:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to populate page-specific FAQs' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to populate page-specific FAQs',
    endpoints: {
      'POST /api/populate-page-faqs': 'Populate page-specific FAQs from data file'
    }
  })
}