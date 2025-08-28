// Data Types
export type UserRole = 'TENANT' | 'OWNER' | 'MEDIATOR' | 'CLEANER'
export type TaskType = 'TURNOVER' | 'INSPECTION' | 'DEEP_CLEAN'
export type TaskStatus = 'PENDING' | 'ASSIGNED' | 'IN_PROGRESS' | 'SUBMITTED' | 'APPROVED' | 'REJECTED'
export type RoomType = 'BEDROOM' | 'BATHROOM' | 'KITCHEN' | 'LIVING' | 'OTHER'
export type ItemState = 'OK' | 'WORN' | 'DAMAGED'
export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH'
export type IncidentStatus = 'OPEN' | 'APPROVED' | 'REPAIRED' | 'REJECTED'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
  tenantId?: string
}

export interface Property {
  id: string
  title: string
  address: string
  coverImage: string
}

export interface Room {
  id: string
  propertyId: string
  type: RoomType
  name: string
}

export interface InventoryItem {
  id: string
  roomId: string
  name: string
  expectedQty: number
  expectedState: ItemState
  basePhotos: string[]
}

export interface Task {
  id: string
  propertyId: string
  title: string
  type: TaskType
  status: TaskStatus
  dueAt: string // ISO date string
  assignees: string[] // User IDs
  createdAt: string // ISO date string
}

export interface Incident {
  id: string
  taskId: string
  description: string
  severity: IncidentSeverity
  estimatedCost?: number
  photos: string[]
  status: IncidentStatus
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Tenant',
    email: 'tenant@example.com',
    phone: '+1 (555) 123-4567',
    role: 'TENANT',
    tenantId: 'tenant-1'
  },
  {
    id: 'user-2',
    name: 'Sarah Owner',
    email: 'owner@example.com',
    phone: '+1 (555) 234-5678',
    role: 'OWNER'
  },
  {
    id: 'user-3',
    name: 'Mike Mediator',
    email: 'mediator@example.com',
    phone: '+1 (555) 345-6789',
    role: 'MEDIATOR'
  },
  {
    id: 'user-4',
    name: 'Lisa Cleaner',
    email: 'cleaner@example.com',
    phone: '+1 (555) 456-7890',
    role: 'CLEANER'
  }
]

export const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Apt 402 — Downtown',
    address: '123 Main St, Downtown, City 12345',
    coverImage: '/placeholder.svg'
  },
  {
    id: 'prop-2',
    title: 'House 12 — Suburb',
    address: '456 Oak Ave, Suburban Heights 67890',
    coverImage: '/placeholder.svg'
  }
]

export const mockRooms: Room[] = [
  // Apt 402 rooms
  {
    id: 'room-1',
    propertyId: 'prop-1',
    type: 'LIVING',
    name: 'Living Room'
  },
  {
    id: 'room-2',
    propertyId: 'prop-1',
    type: 'BEDROOM',
    name: 'Master Bedroom'
  },
  {
    id: 'room-3',
    propertyId: 'prop-1',
    type: 'BATHROOM',
    name: 'Master Bathroom'
  },
  {
    id: 'room-4',
    propertyId: 'prop-1',
    type: 'KITCHEN',
    name: 'Kitchen'
  },
  // House 12 rooms
  {
    id: 'room-5',
    propertyId: 'prop-2',
    type: 'LIVING',
    name: 'Living Room'
  },
  {
    id: 'room-6',
    propertyId: 'prop-2',
    type: 'BEDROOM',
    name: 'Bedroom 1'
  },
  {
    id: 'room-7',
    propertyId: 'prop-2',
    type: 'BEDROOM',
    name: 'Bedroom 2'
  },
  {
    id: 'room-8',
    propertyId: 'prop-2',
    type: 'BATHROOM',
    name: 'Main Bathroom'
  },
  {
    id: 'room-9',
    propertyId: 'prop-2',
    type: 'KITCHEN',
    name: 'Kitchen'
  }
]

export const mockInventoryItems: InventoryItem[] = [
  // Kitchen items
  {
    id: 'inv-1',
    roomId: 'room-4',
    name: 'Glasses',
    expectedQty: 6,
    expectedState: 'OK',
    basePhotos: ['/placeholder.svg']
  },
  {
    id: 'inv-2',
    roomId: 'room-4',
    name: 'Plates',
    expectedQty: 4,
    expectedState: 'OK',
    basePhotos: ['/placeholder.svg']
  },
  {
    id: 'inv-3',
    roomId: 'room-4',
    name: 'Cutlery Set',
    expectedQty: 1,
    expectedState: 'OK',
    basePhotos: ['/placeholder.svg']
  },
  // Bathroom items
  {
    id: 'inv-4',
    roomId: 'room-3',
    name: 'Mirrors',
    expectedQty: 3,
    expectedState: 'OK',
    basePhotos: ['/placeholder.svg']
  },
  {
    id: 'inv-5',
    roomId: 'room-3',
    name: 'Towels',
    expectedQty: 4,
    expectedState: 'OK',
    basePhotos: ['/placeholder.svg']
  }
]

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    propertyId: 'prop-1',
    title: 'Turnover Cleaning - Apt 402',
    type: 'TURNOVER',
    status: 'PENDING',
    dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    assignees: [],
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    propertyId: 'prop-2',
    title: 'Deep Clean - House 12',
    type: 'DEEP_CLEAN',
    status: 'ASSIGNED',
    dueAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
    assignees: ['user-4'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Yesterday
  },
  {
    id: 'task-3',
    propertyId: 'prop-1',
    title: 'Monthly Inspection - Apt 402',
    type: 'INSPECTION',
    status: 'IN_PROGRESS',
    dueAt: new Date().toISOString(), // Today
    assignees: ['user-4'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: 'task-4',
    propertyId: 'prop-2',
    title: 'Pre-arrival Clean - House 12',
    type: 'TURNOVER',
    status: 'SUBMITTED',
    dueAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    assignees: ['user-4'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
  },
  {
    id: 'task-5',
    propertyId: 'prop-1',
    title: 'Post-checkout Clean - Apt 402',
    type: 'TURNOVER',
    status: 'APPROVED',
    dueAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    assignees: ['user-4'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
  }
]

export const mockIncidents: Incident[] = [
  {
    id: 'inc-1',
    taskId: 'task-3',
    description: 'Broken glass found in kitchen sink',
    severity: 'MEDIUM',
    estimatedCost: 25,
    photos: ['/placeholder.svg'],
    status: 'OPEN'
  },
  {
    id: 'inc-2',
    taskId: 'task-4',
    description: 'Stain on carpet in bedroom',
    severity: 'LOW',
    estimatedCost: 15,
    photos: ['/placeholder.svg'],
    status: 'APPROVED'
  }
]

// Helper functions
export function getUserById(id: string): User | undefined {
  return mockUsers.find(user => user.id === id)
}

export function getPropertyById(id: string): Property | undefined {
  return mockProperties.find(property => property.id === id)
}

export function getRoomsByPropertyId(propertyId: string): Room[] {
  return mockRooms.filter(room => room.propertyId === propertyId)
}

export function getInventoryItemsByRoomId(roomId: string): InventoryItem[] {
  return mockInventoryItems.filter(item => item.roomId === roomId)
}

export function getTasksByStatus(status: TaskStatus): Task[] {
  return mockTasks.filter(task => task.status === status)
}

export function getTasksByAssignee(assigneeId: string): Task[] {
  return mockTasks.filter(task => task.assignees.includes(assigneeId))
}

export function getIncidentsByTaskId(taskId: string): Incident[] {
  return mockIncidents.filter(incident => incident.taskId === taskId)
}

export function getOpenIncidents(): Incident[] {
  return mockIncidents.filter(incident => incident.status === 'OPEN')
}

export function getTodaysTasks(): Task[] {
  const today = new Date().toDateString()
  return mockTasks.filter(task => new Date(task.dueAt).toDateString() === today)
}
