export interface ContactInfo {
  id: string;
  type: 'address' | 'phone' | 'email' | 'hours';
  label: string;
  value: string;
  secondary_value?: string;
  is_primary: boolean;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactInfoInput {
  type: 'address' | 'phone' | 'email' | 'hours';
  label: string;
  value: string;
  secondary_value?: string;
  is_primary?: boolean;
  is_active?: boolean;
  order?: number;
}

// Mock service - In a real app, this would connect to Supabase or another backend
class ContactService {
  private contactInfo: ContactInfo[] = [
    {
      id: 'contact-1',
      type: 'address',
      label: 'Visit Our Office',
      value: 'No 14 Oluwatoyin Off Gani',
      secondary_value: 'By Ademulegun Road, Ondo State, Nigeria',
      is_primary: true,
      is_active: true,
      order: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'contact-2',
      type: 'phone',
      label: 'Call Us',
      value: '+2349028267223',
      secondary_value: 'Mon - Fri, 9AM - 6PM WAT',
      is_primary: true,
      is_active: true,
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'contact-3',
      type: 'email',
      label: 'Email Us',
      value: 'info@octanode.online',
      secondary_value: 'support@octanode.online',
      is_primary: true,
      is_active: true,
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  async getContactInfo(): Promise<ContactInfo[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return [...this.contactInfo].sort((a, b) => a.order - b.order);
  }

  async createContactInfo(contactInfo: ContactInfoInput): Promise<ContactInfo> {
    const newContact: ContactInfo = {
      id: `contact-${Date.now()}`,
      ...contactInfo,
      is_primary: contactInfo.is_primary || false,
      is_active: contactInfo.is_active !== false,
      order: contactInfo.order || this.contactInfo.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.contactInfo.push(newContact);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return newContact;
  }

  async updateContactInfo(id: string, contactInfo: Partial<ContactInfoInput>): Promise<ContactInfo> {
    const contactIndex = this.contactInfo.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      throw new Error('Contact information not found');
    }

    this.contactInfo[contactIndex] = {
      ...this.contactInfo[contactIndex],
      ...contactInfo,
      updated_at: new Date().toISOString()
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return this.contactInfo[contactIndex];
  }

  async deleteContactInfo(id: string): Promise<void> {
    const contactIndex = this.contactInfo.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      throw new Error('Contact information not found');
    }

    this.contactInfo.splice(contactIndex, 1);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  async reorderContactInfo(contactInfoList: { id: string; order: number }[]): Promise<void> {
    contactInfoList.forEach(item => {
      const contactIndex = this.contactInfo.findIndex(c => c.id === item.id);
      if (contactIndex !== -1) {
        this.contactInfo[contactIndex].order = item.order;
        this.contactInfo[contactIndex].updated_at = new Date().toISOString();
      }
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Validation helpers
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  validateRequired(value: string): boolean {
    return value.trim().length > 0;
  }

  formatPhone(phone: string): string {
    // Remove all non-digit characters except +
    const cleaned = phone.replace(/[^\d\+]/g, '');
    
    // Format Nigerian numbers
    if (cleaned.startsWith('+234')) {
      return cleaned.replace(/(\+234)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
    } else if (cleaned.startsWith('234')) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{4})/, '+$1 $2 $3 $4');
    } else if (cleaned.startsWith('0')) {
      return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+234 $2 $3 $4');
    }
    
    return phone;
  }
}

export const contactService = new ContactService();