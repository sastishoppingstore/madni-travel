import { NextRequest } from 'next/server'
import { prisma } from '@madni/db'

export async function GET(request: NextRequest) {
  try {
    const seoPages = await prisma.sEOPage.findMany({
      where: { sitemapInclude: true, isActive: true },
      select: { pagePath: true, updatedAt: true },
    })

    const packages = await prisma.holidayPackage.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    })

    const umrahPackages = await prisma.umrahPackage.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    })

    const blogPosts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://madnitravel.com'

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${baseUrl}/flights</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/hotels</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/packages</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/umrah</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/visa</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${baseUrl}/blog</loc><changefreq>daily</changefreq><priority>0.7</priority></url>`

    seoPages.forEach((p: any) => {
      xml += `
  <url><loc>${baseUrl}${p.pagePath}</loc><lastmod>${p.updatedAt.toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`
    })

    packages.forEach((p: any) => {
      xml += `
  <url><loc>${baseUrl}/packages/${p.slug}</loc><lastmod>${p.updatedAt.toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`
    })

    umrahPackages.forEach((p: any) => {
      xml += `
  <url><loc>${baseUrl}/umrah/${p.slug}</loc><lastmod>${p.updatedAt.toISOString().split('T')[0]}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`
    })

    blogPosts.forEach((p: any) => {
      xml += `
  <url><loc>${baseUrl}/blog/${p.slug}</loc><lastmod>${p.updatedAt.toISOString().split('T')[0]}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`
    })

    xml += `
</urlset>`

    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml' },
    })
  } catch (error) {
    return new Response('<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', {
      headers: { 'Content-Type': 'application/xml' },
    })
  }
}
