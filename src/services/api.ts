const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  message?: string;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    gender: string;
    dateOfBirth: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserProfile(userId: string) {
    return this.request(`/auth/users/${userId}`);
  }

  async updateUserProfile(userId: string, data: any) {
    return this.request(`/auth/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(userId: string, data: { currentPassword: string; newPassword: string }) {
    return this.request(`/auth/users/${userId}/password`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getUserStats() {
    return this.request('/auth/users/stats/overview');
  }

  // Profiles
  async getProfiles(params?: {
    gender?: string;
    minAge?: number;
    maxAge?: number;
    religion?: string;
    community?: string;
    location?: string;
    education?: string;
    occupation?: string;
    verified?: boolean;
    premium?: boolean;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });
    }
    return this.request(`/profiles?${queryParams.toString()}`);
  }

  async getProfile(id: string) {
    return this.request(`/profiles/${id}`);
  }

  async createProfile(data: any) {
    return this.request('/profiles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProfile(id: string, data: any) {
    return this.request(`/profiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProfile(id: string) {
    return this.request(`/profiles/${id}`, {
      method: 'DELETE',
    });
  }

  async getProfileStats() {
    return this.request('/profiles/stats');
  }

  // Wedding Services
  async getServices(params?: {
    category?: string;
    minRating?: number;
    sort?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    return this.request(`/services?${queryParams.toString()}`);
  }

  async getService(id: string) {
    return this.request(`/services/${id}`);
  }

  async createService(data: any) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Blog Posts
  async getBlogPosts(params?: {
    category?: string;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }
    return this.request(`/blog?${queryParams.toString()}`);
  }

  async getBlogPost(slug: string) {
    return this.request(`/blog/${slug}`);
  }

  async createBlogPost(data: any) {
    return this.request('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlogPost(slug: string, data: any) {
    return this.request(`/blog/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBlogPost(slug: string) {
    return this.request(`/blog/${slug}`, {
      method: 'DELETE',
    });
  }

  // Success Stories
  async getSuccessStories(params?: { sort?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.sort) {
      queryParams.append('sort', params.sort);
    }
    return this.request(`/stories?${queryParams.toString()}`);
  }

  async getSuccessStory(id: string) {
    return this.request(`/stories/${id}`);
  }

  async createSuccessStory(data: any) {
    return this.request('/stories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSuccessStory(id: string, data: any) {
    return this.request(`/stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSuccessStory(id: string) {
    return this.request(`/stories/${id}`, {
      method: 'DELETE',
    });
  }

  // Pricing Plans
  async getPricingPlans() {
    return this.request('/pricing');
  }

  async getPricingPlan(id: string) {
    return this.request(`/pricing/${id}`);
  }

  async createPricingPlan(data: any) {
    return this.request('/pricing', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePricingPlan(id: string, data: any) {
    return this.request(`/pricing/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePricingPlan(id: string) {
    return this.request(`/pricing/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
const api = new ApiService(API_BASE_URL);
export default api;
