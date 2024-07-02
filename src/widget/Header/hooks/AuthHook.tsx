import { useSelector } from 'react-redux';
import { RootState } from '../../../services/store';


const useAuth = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  return isAuthenticated;
};

export default useAuth;