import { z, defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';

// Define collection schemas
const zonesSchema = z.object({
  title: z.string(),
  description: z.string(),
  overview: z.string(),
  image: z.string(),
  thumbnail: z.string().optional(),
  coordinates: z.object({
    center: z.object({
      lat: z.number(),
      lng: z.number()
    }),
    zoom: z.number().default(14)
  }).optional(),
  features: z.array(z.string()).optional(),
  averagePrice: z.number().optional(),
  products: z.array(z.string()).optional(), // Array of product slugs (润滑油产品ID列表)
  meta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional()
  }).optional()
});

const agentsSchema = z.object({
  'agent-id': z.string(),
  title: z.string(),
  name: z.string(),
  jobTitle: z.string(), // 职位头衔, 如: 销售经理、技术顾问等
  bio: z.string(), // 个人简介
  email: z.string().optional(),
  phone: z.string().optional(),
  image: z.string(),
  department: z.string().optional(), // 所属部门, 如: 工业润滑油部、车用油部等
  professionalLevel: z.enum(['junior', 'mid', 'senior', 'expert']).optional(), // 职业级别: 初级/中级/高级/专家
  experience: z.string().optional(), // 工作经验, 如: "8年"
  specialties: z.array(z.string()).optional(), // 专长领域, 如: 液压油、齿轮油、润滑脂等
  productCategories: z.array(z.string()).optional(), // 负责的产品类别
  certifications: z.array(z.string()).optional(), // 专业认证, 如: MLA I, MLA II等
  languages: z.array(z.string()).optional(), // 语言能力
  serviceAreas: z.array(z.string()).optional(), // 服务区域
  achievements: z.array(z.string()).optional() // 主要成就
});

const storesSchema = z.object({
  'store-id': z.string(),
  title: z.string(),
  name: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  hours: z.string(),
  services: z.array(z.string()),
  image: z.string(),
  mapLink: z.string().optional(),
  amapLink: z.string().optional(),
  tencentMapLink: z.string().optional(),
  baiduMapLink: z.string().optional(),
  baiduMapCardLink: z.string().optional(),
  googleMapLink: z.string().optional(),
  featured: z.boolean().default(false)
});

const gallerySchema = z.object({
  title: z.string(),
  category: z.enum(['office', 'warehouse', 'certificate', 'team', 'other']),
  description: z.string().optional(),
  image: z.string(),
  thumb: z.string().optional(),
  order: z.number().default(0),
  featured: z.boolean().default(false)
});

// Lubricants product schema - 润滑油产品schema
const lubricantsSchema = z.object({
  title: z.string(), // 产品名称
  description: z.string(), // 产品描述
  keywords: z.string().optional(), // SEO关键词,逗号分隔
  models: z.string().optional(), // 产品型号,逗号分隔
  category: z.string(), // 主分类: 商用车润滑油/乘用车润滑油/工业润滑油/特种润滑油
  brand: z.string(), // 品牌: 美孚/长城/APEX
  series: z.string().optional(), // 系列
  application: z.array(z.string()).optional(), // 使用场景/应用领域
  subCategory: z.string().optional(),   // 子分类: 细分产品类型或型号系列
  image: z.string()
    .transform((val) => val.trim() === '' ? '/images/products/common/default-product-img.webp' : val)
    .default('/images/products/common/default-product-img.webp'), // 产品主图, 空字符串时使用默认图片
  images: z.array(z.string()).optional(), // 产品图册(多张图片)
  featured: z.boolean().default(false), // 是否推荐
  originalFilePath: z.string().optional(), // 原始HTML文件路径(用于追溯)
  referenceUrl: z.string().optional(), // 数据参考链接（官方技术文档URL）
});

// Define collections with loaders
export const collections = {
  zones: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/zones' }),
    schema: zonesSchema
  }),
  agents: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/agents' }),
    schema: agentsSchema
  }),
  stores: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/stores' }),
    schema: storesSchema
  }),
  gallery: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gallery' }),
    schema: gallerySchema
  }),
  lubricants: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lubricants' }),
    schema: lubricantsSchema
  })
};
