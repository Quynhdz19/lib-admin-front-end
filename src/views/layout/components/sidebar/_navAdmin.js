import {
  cilCloudUpload,
  cilEyedropper,
  cilFile,
  cilHistory,
  cilHome,
  cilObjectGroup,
  cilSpeedometer,
  cilUser
} from "@coreui/icons";
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'
import { RouteMap } from 'src/routes/routeMap'

const _navAdmin = [
  {
    component: CNavTitle,
    name: 'Files',
  },
  {
    component: CNavItem,
    name: 'Quản lý Files',
    to: RouteMap.FilesUploaded,
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kiểm duyệt files',
    to: RouteMap.ReviewFiles,
    icon: <CIcon icon={cilEyedropper} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Học sinh',
  },
  {
    component: CNavItem,
    name: 'Danh sách học sinh',
    to: RouteMap.HistoryDownloaded,
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _navAdmin
