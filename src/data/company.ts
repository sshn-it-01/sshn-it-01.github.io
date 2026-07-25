// Company Information Configuration
// This file centralizes all company contact information
// Modify here to update across the entire site

export const companyInfo = {
  // Basic Info
  name: '佛山市华南森孚贸易有限公司',
  nameEn: 'Foshan Huanan Senfu Trading Co., Ltd.',
  
  // Contact Info
  phone: '0757-87722666',
  email: 'hnsh1991@126.com',
  
  // Address
  address: '佛山市三水区西南街健力宝北路10号',
  addressEn: 'No. 10, Jianlibao North Road, Xinan Street, Sanshui District, Foshan',
  
  // Business Hours
  workHours: '周一至周日 08:00-18:00',
  workHoursEn: 'Mon-Sun 08:00-18:00',
  
  // Legal Info
  icpNumber: '粤ICP备11099622号-2',
  icpURL: 'https://beian.miit.gov.cn/',
  
  // Social Media (QR Codes)
  qrcode: {
    wechatOfficial: '/images/common/qrcode/qrcode_vx-plat_bg-white.webp',
    wechatMiniProgram: '/images/common/qrcode/qrcode_vx-miniprog_bg-white.webp'
  }
} as const;

export type CompanyInfo = typeof companyInfo;
