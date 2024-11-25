import { cilPeople, cilBook, cilCloudUpload, cilStar } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCardImage,
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CForm,
  CFormLabel,
  CFormText,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import { useNavigate } from 'react-router-dom'
import WidgetsDropdown from '../../components/dashboard/widgets/WidgetsDropdown'
import Pagination from 'src/views/components/courses-management/courses/Pagination'
import courseService from 'src/services/CourseService'
import orderService from 'src/services/OrderService'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'
import avatar1 from 'src/assets/images/avatars/avatar.png'

const HistoryDownloaded = () => {
  const [registrationOrders, setRegistrationOrders] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    grade: '',
  })

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setCurrentPage(1)
      setSearchQuery((prevQuery) => ({ ...prevQuery, search: searchTerm, page: 1 }))
    }, 200)

    return () => clearTimeout(debounceTimeout)
  }, [searchTerm])

  useEffect(() => {
    fetchAllFiles()
  }, [searchQuery])

  const handlePageChange = (page) => {
    setSearchQuery((prevQuery) => ({ ...prevQuery, page }))
    setCurrentPage(page)
  }

  const downloadThisFile = async (fileID, nameFile) => {
    console.log(fileID, nameFile)
    try {
      console.log(fileID, nameFile)
      const response = await orderService.downloadFile(fileID)

      // Check and log the response data to confirm it's a Blob
      console.log('Response Data:', response.data)

      // Extract the content type and determine the file extension
      const contentType = response.headers['content-type'] || 'application/octet-stream'
      const mimeExtensionMap = {
        'application/pdf': 'pdf',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
        'application/vnd.ms-excel': 'xls',
        'text/plain': 'txt',
        'application/zip': 'zip',
      }
      const fileExtension = mimeExtensionMap[contentType] || 'bin'
      const baseName = nameFile.includes('.')
        ? nameFile.split('.').slice(0, -1).join('.')
        : nameFile
      const fileName = `${baseName}.${fileExtension}`

      // Create a blob from the response data and save using FileSaver.js
      const blob = new Blob([response.data], { type: contentType })
      saveAs(blob, fileName)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const viewFile = async (fileID) => {
    try {
      // Fetch the file from the backend as a blob
      const response = await orderService.downloadFile(fileID, { responseType: 'blob' });

      // Create a Blob from the response data
      const fileBlob = new Blob([response.data], { type: response.headers['content-type'] });
      const fileUrl = URL.createObjectURL(fileBlob);

      // Open the Blob URL in a new tab
      window.open(fileUrl, '_blank');

      // Clean up the URL object after the file has been viewed
      setTimeout(() => URL.revokeObjectURL(fileUrl), 1000 * 60 * 5); // Revoke after 5 minutes
    } catch (error) {
      openErrorNotification(error.response?.data?.message ?? error.message);
    }
  }

  const fetchAllFiles = async () => {
    try {
      const response = await orderService.getAllUser(searchQuery)
      setRegistrationOrders(response.data)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }
  const handleInputChange = (event) => {
    const { id, value } = event.target
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [id]: value,
    }))
  }
  const handleSearch = (event) => {
    event.preventDefault()
    fetchAllFiles() // Trigger file fetching based on searchQuery state
  }
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold fs-5">Tìm kiếm</CCardHeader>
            <CForm className="card-body" onSubmit={handleSearch}>
              <CRow>
                <CCol>
                  <CFormInput
                    type="text"
                    id="name"
                    label="Tên user"
                    value={searchQuery.name}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol>
                  <CFormSelect
                    label="Cấp học"
                    value={searchQuery.grade}
                    onChange={handleInputChange}
                    id="grade"
                  >
                    <option value="">Chọn lớp</option>
                    <option value="6">Lớp 6</option>
                    <option value="7">Lớp 7</option>
                    <option value="8">Lớp 8</option>
                    <option value="9">Lớp 9</option>
                    <option value="10">Lớp 10</option>
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12</option>
                  </CFormSelect>
                </CCol>
                <CCol>

                </CCol>
              </CRow>
              <CButton className="my-4" color="primary">
                Tìm kiếm
              </CButton>
            </CForm>
            <CCardHeader className="fw-bold fs-5">Danh sách học sinh</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap bg-primary">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Tên học sinh</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Email </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Cấp học</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                     Trường
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Ngày tạo
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {registrationOrders.length > 0 ? (
                    registrationOrders.map((order, index) => (
                      <CTableRow key={order.id}>
                        <CTableDataCell>{order.username}</CTableDataCell>
                        <CTableDataCell>{order.email}</CTableDataCell>
                        <CTableDataCell>{order.class}</CTableDataCell>
                        <CTableDataCell>
                          {order.school}
                        </CTableDataCell>
                        <CTableDataCell>{order.created_at}</CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center">
                        No Orders Found
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default HistoryDownloaded