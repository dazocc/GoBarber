import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

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

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviço'
      );
      return;
    }

    setToken(token);

    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.error(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
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
    });
  } catch (err) {
    Alert.error(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );
    yield put(signInFailure());
  }
}

export function resetToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  setToken(token);
}

export default all([
  takeLatest('persist/REHYDRATE', resetToken),
  takeLatest('@auth/SIGN_IN_REQUEST', singIn),
  takeLatest('@auth/SIGN_UP_REQUEST', singUp),
]);
