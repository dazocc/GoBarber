import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess, signInFailure } from './actions';

function setToken(token) {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é prestador');
      return;
    }

    setToken(token);

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação verificque seus dados');
    yield put(signInFailure());
  }
}

export function* singUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verificque seus dados');
    yield put(signInFailure());
  }
}

export function resetToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  setToken(token);
}

export function singOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', resetToken),
  takeLatest('@auth/SIGN_IN_REQUEST', singIn),
  takeLatest('@auth/SIGN_UP_REQUEST', singUp),
  takeLatest('@auth/SIGN_OUT', singOut),
]);
