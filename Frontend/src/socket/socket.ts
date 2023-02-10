import { apiUrl } from '@/utils/apiUrl'
import { io } from 'socket.io-client'

export const connectSocket = io(`${apiUrl}`, {transports: ['websocket']})

