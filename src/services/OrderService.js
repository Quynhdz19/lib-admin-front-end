import axiosInstance from './axios'
import BaseService from './BaseService'
import axios from 'axios'

class OrderService extends BaseService {
  async addOrder(orderData) {
    try {
      const response = await this.post('/orders', orderData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getRegistrationOrder() {
    try {
      const response = await this.get('/orders/pending-by-user')
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async getOrders(searchParams = {}) {
    try {
      const response = await this.get('/user/search-files', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }
  async getAllFile(searchParams = {}) {
    try {
      const response = await this.get('/admin/show-all-files', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async showAllFilesNotAccepted(searchParams = {}) {
    try {
      const response = await this.get('/admin/show-all-files-not-accept', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async getHistoryDownload(searchParams = {}) {
    try {
      const response = await this.get('/user-downloads', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async getDetailFiles(searchParams = {}) {
    try {
      const response = await this.get('/file-details', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }
  async getAllUser(searchParams = {}) {
    try {
      const response = await this.get('/admin/users', searchParams)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async downloadFile(fileID) {
    try {
      const response = this.api.post(
        '/admin/download-file/',
        { fileID },
        { responseType: 'blob' }, // Ensure responseType is set to blob here
      )
      return response
    } catch (error) {
      throw error.response?.data
    }
  }
  async uploadFiles(params) {
    try {
      const response = this.api.post('/admin/upload-file', params)
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async getFileViewUrl(fileID) {
    try {
      const response = await this.post('/user/view-file', { fileID })
      return response
    } catch (error) {
      throw error.response?.data
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      const response = await this.put(`/orders/orders/${orderId}`, orderData)
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async deleteFile(params) {
    try {
      const response = await this.delete(`/admin/file`, { params })
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }

  async acceptFile(params) {
    try {
      const response = await this.post(`/admin/approve-file`,  params )
      return response.data
    } catch (error) {
      throw error.response?.data
    }
  }
}

const orderService = new OrderService(axiosInstance)
export default orderService
