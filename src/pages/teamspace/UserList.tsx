import useWebSocketStore from '@/src/store/useWebSocketStore';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserList = () => {
  const { containerId } = useParams<{ containerId: string }>();
  const { webSocketService, isConnected } = useWebSocketStore();
  // 구독
  useEffect(() => {
    if (webSocketService && isConnected) {
      webSocketService.subscribeToDestination(
        `/topic/room/${containerId}/state`,
        (message) => {
          console.log('현재유저정보 message', message);
        },
      );
    }
    // unsubscribe 고려
  }, [webSocketService, isConnected, containerId]);
  return (
    <div>
      <h1>유저목록리스트</h1>
    </div>
  );
};

export default UserList;
