import { useState, useEffect } from 'react'
import Header from '@/components/common/Header'
import RentalTable from '@/components/vehicle/rental/RentalTable'
import RentalTopBar from '@/components/vehicle/rental/RentalTopBar'
import ChangeStatusModal from '@/components/vehicle/rental/ChangeStatusModal'
import {
  VehicleListResponse,
  VehicleStatus,
  UpdateVehicleStatusRequest,
  RegisterVehicleRequest
} from '@/types/vehicle'
import axios from '../axiosConfig'
import SideMenuBar from '@/components/common/SideMenuBar'
import RegisterCarInfoSection from '@/components/vehicle/register/RegisterCarInfoSection'
import RegisterCheckModal from '@/components/vehicle/register/RegisterCheckModal'

interface ModalState {
  isOpen: boolean
  vehicle: VehicleListResponse | null
}

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

// function getCookie(name: string): string | null {
//   const value = `; ${document.cookie}`
//   const parts = value.split(`; ${name}=`)
//   if (parts.length === 2) return parts.pop()!.split(';').shift() || null
//   return null
// }

// axios.interceptors.request.use(
//   config => {
//     const token = getCookie('accessToken')
//     if (token) {
//       config.headers = config.headers || {}
//       config.headers['Authorization'] = `Bearer ${token}`
//     }
//     return config
//   },
//   error => Promise.reject(error)
// )

const updateVehicleStatus = async (
  request: UpdateVehicleStatusRequest
): Promise<void> => {
  try {
    await axios.patch('/api/v1/vehicles', request)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(
        error.response.data.errorReason?.reason ||
          '차량 상태 변경에 실패했습니다.'
      )
    }
    throw new Error('차량 상태 변경에 실패했습니다.')
  }
}

// 차량 등록용 fuelType 변환 맵
const FUEL_TYPE_MAP: { [key: string]: string } = {
  LPG: 'LPG',
  휘발유: 'PETROL',
  경유: 'DIESEL',
  전기: 'ELECTRIC',
  기타: 'PETROL'
}

const registerVehicle = async (
  request: RegisterVehicleRequest
): Promise<void> => {
  try {
    await axios.post('/api/v1/vehicles', request)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(
        error.response.data.errorReason?.reason || '차량 등록에 실패했습니다.'
      )
    }
    throw new Error('차량 등록에 실패했습니다.')
  }
}

export default function Rental() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [changeStatusModal, setChangeStatusModal] = useState<
    ModalState & { status: string }
  >({
    isOpen: false,
    vehicle: null,
    status: ''
  })
  const [vehicles, setVehicles] = useState<VehicleListResponse[]>([])
  // 차량 등록 모달 상태 및 입력값 상태
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showCheckModal, setShowCheckModal] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [carNumber, setCarNumber] = useState('')
  const [model, setModel] = useState('')
  const [carType, setCarType] = useState('')
  const [customCarType, setCustomCarType] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [customManufacturer, setCustomManufacturer] = useState('')
  const [year, setYear] = useState('')
  const [color, setColor] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [hasGps, setHasGps] = useState('')

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('/api/v1/vehicles')
        setVehicles(response.data.data)
      } catch {
        // 에러 무시 (필요시 alert 등 처리 가능)
      }
    }
    fetchVehicles()
  }, [registerSuccess])

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.licensePlate
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesFilter = !filter || vehicle.vehicleStatus === filter
    return matchesSearch && matchesFilter
  })

  const handleChangeStatusConfirm = async () => {
    if (changeStatusModal.vehicle && changeStatusModal.status) {
      try {
        await updateVehicleStatus({
          vehicleId: changeStatusModal.vehicle.vehicleId,
          vehicleStatus: changeStatusModal.status as VehicleStatus
        })
        window.location.reload()
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '차량 상태 변경에 실패했습니다.'
        alert(errorMessage)
      }
    }
    setChangeStatusModal({ isOpen: false, vehicle: null, status: '' })
  }

  const handleChangeStatusCancel = () => {
    setChangeStatusModal({ isOpen: false, vehicle: null, status: '' })
  }

  const handleChangeStatus = (vehicle: VehicleListResponse) => {
    setChangeStatusModal({
      isOpen: true,
      vehicle,
      status: vehicle.vehicleStatus
    })
  }

  return (
    <div className="flex flex-col bg-[#f5f8fa]">
      <header className="flex bg-white">
        <Header />
      </header>

      <div className="flex flex-1">
        <SideMenuBar />
        <main className="relative mx-2 flex h-[calc(100vh-64px)] min-h-0 flex-1 flex-col p-6">
          <RentalTopBar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            onClickAddCar={() => setShowRegisterModal(true)}
          />

          <div className="h-full min-h-0 flex-1">
            <RentalTable
              search={search}
              filter={filter}
              onChangeStatus={handleChangeStatus}
              vehicles={filteredVehicles}
            />
          </div>
          {/* 차량 등록 모달 */}
          {showRegisterModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="relative w-full max-w-2xl rounded-2xl bg-white px-8 py-8 shadow-xl">
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  차량 등록
                </h2>
                <RegisterCarInfoSection
                  carNumber={carNumber}
                  setCarNumber={setCarNumber}
                  model={model}
                  setModel={setModel}
                  carType={carType}
                  setCarType={setCarType}
                  customCarType={customCarType}
                  setCustomCarType={setCustomCarType}
                  manufacturer={manufacturer}
                  setManufacturer={setManufacturer}
                  customManufacturer={customManufacturer}
                  setCustomManufacturer={setCustomManufacturer}
                  year={year}
                  setYear={setYear}
                  color={color}
                  setColor={setColor}
                  fuelType={fuelType}
                  setFuelType={setFuelType}
                  hasGps={hasGps}
                  setHasGps={setHasGps}
                />
                <div className="mt-4 flex justify-end gap-3">
                  <button
                    className="btn btn-default btn-soft rounded-2xl px-6 py-2"
                    onClick={() => setShowRegisterModal(false)}
                    disabled={registering}>
                    취소
                  </button>
                  <button
                    className="btn rounded-2xl bg-blue-500 px-6 py-2 text-white"
                    onClick={() => setShowCheckModal(true)}
                    disabled={registering}>
                    등록
                  </button>
                </div>
                {/* 확인 모달 */}
                {showCheckModal && (
                  <RegisterCheckModal
                    carNumber={carNumber}
                    model={model}
                    carType={carType}
                    customCarType={customCarType}
                    manufacturer={manufacturer}
                    customManufacturer={customManufacturer}
                    year={year}
                    color={color}
                    fuelType={fuelType}
                    hasGps={hasGps}
                    onCancel={() => setShowCheckModal(false)}
                    onConfirm={async () => {
                      setRegistering(true)
                      try {
                        await registerVehicle({
                          vehicleInfo: {
                            model: model,
                            color: color,
                            licensePlate: carNumber,
                            carAge: year,
                            brandName:
                              manufacturer === 'custom'
                                ? customManufacturer
                                : manufacturer,
                            fuelType: FUEL_TYPE_MAP[fuelType] || 'PETROL'
                          },
                          hasGps: hasGps === '예'
                        })
                        setShowCheckModal(false)
                        setShowRegisterModal(false)
                        setRegisterSuccess(true)
                        // 입력값 초기화
                        setCarNumber('')
                        setModel('')
                        setCarType('')
                        setCustomCarType('')
                        setManufacturer('')
                        setCustomManufacturer('')
                        setYear('')
                        setColor('')
                        setFuelType('')
                        setHasGps('')
                        setTimeout(() => setRegisterSuccess(false), 1500)
                      } catch (error) {
                        alert(
                          error instanceof Error
                            ? error.message
                            : '차량 등록에 실패했습니다.'
                        )
                      } finally {
                        setRegistering(false)
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )}
          {/* 등록 성공 안내 */}
          {registerSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="rounded-xl bg-white px-8 py-6 text-center text-lg font-semibold text-blue-600 shadow-xl">
                등록이 완료되었습니다!
              </div>
            </div>
          )}
        </main>
      </div>
      {/* 상태 변경 모달 */}
      {changeStatusModal.isOpen && changeStatusModal.vehicle && (
        <ChangeStatusModal
          carNumber={changeStatusModal.vehicle.licensePlate}
          selectedStatus={changeStatusModal.status}
          onSelect={status =>
            setChangeStatusModal(prev => ({ ...prev, status }))
          }
          onConfirm={handleChangeStatusConfirm}
          onCancel={handleChangeStatusCancel}
        />
      )}
    </div>
  )
}
