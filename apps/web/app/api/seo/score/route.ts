import { NextRequest } from 'next/server'
import { successResponse } from '../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { seoTitle, metaDescription, focusKeyword, content, headings } = body

    let score = 0
    const checks: any = {}

    // Title length check (50-60 ideal)
    const titleLength = seoTitle?.length || 0
    checks.titleLength = { value: titleLength, status: titleLength >= 30 && titleLength <= 70 ? 'good' : titleLength > 0 ? 'warning' : 'bad', maxPoints: 20 }
    if (titleLength >= 30 && titleLength <= 70) score += 20
    else if (titleLength > 0) score += 10

    // Description length check (150-160 ideal)
    const descLength = metaDescription?.length || 0
    checks.descriptionLength = { value: descLength, status: descLength >= 120 && descLength <= 170 ? 'good' : descLength > 0 ? 'warning' : 'bad', maxPoints: 20 }
    if (descLength >= 120 && descLength <= 170) score += 20
    else if (descLength > 0) score += 10

    // Keyword in title
    if (focusKeyword && seoTitle) {
      const keywordInTitle = seoTitle.toLowerCase().includes(focusKeyword.toLowerCase())
      checks.keywordInTitle = { value: keywordInTitle, status: keywordInTitle ? 'good' : 'bad', maxPoints: 15 }
      if (keywordInTitle) score += 15
    }

    // Keyword in description
    if (focusKeyword && metaDescription) {
      const keywordInDesc = metaDescription.toLowerCase().includes(focusKeyword.toLowerCase())
      checks.keywordInDescription = { value: keywordInDesc, status: keywordInDesc ? 'good' : 'bad', maxPoints: 15 }
      if (keywordInDesc) score += 15
    }

    // Content length
    const contentLength = content?.length || 0
    checks.contentLength = { value: contentLength, status: contentLength >= 300 ? 'good' : contentLength > 0 ? 'warning' : 'bad', maxPoints: 15 }
    if (contentLength >= 300) score += 15
    else if (contentLength > 0) score += 5

    // Headings
    const hasHeadings = headings && headings.length > 0
    checks.headings = { value: headings?.length || 0, status: hasHeadings ? 'good' : 'bad', maxPoints: 15 }
    if (hasHeadings) score += 15

    return successResponse({ score, maxScore: 100, grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F', checks })
  } catch (error) {
    return successResponse({ score: 0, checks: {} })
  }
}
