import { addAccessTokenToInterceptor } from '@/services/axios-config';
import { setAuthToken, setIsAuthenticated, setUserId } from '@/store/user';
import { UserAuthResponseUserDataType } from '@/utils/types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const useFetch = (url: string) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (user: UserAuthResponseUserDataType) => {
    if (user) {
      addAccessTokenToInterceptor(user.token);
      dispatch(setHasAccessTokenBeenAddedToInterceptor(true));
      dispatch(setIsAuthenticated(true));
      dispatch(setUserId(user.id));
      dispatch(setAuthToken(user.token))
    }
  };

  const handleGoogle = async (response: any) => {
    setLoading(true);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);

        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          localStorage.setItem('user', JSON.stringify(data?.user));
          handleLogin(data.user)
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, error, handleGoogle };
};

export default useFetch;
function setHasAccessTokenBeenAddedToInterceptor(arg0: boolean): any {
  throw new Error('Function not implemented.');
}

