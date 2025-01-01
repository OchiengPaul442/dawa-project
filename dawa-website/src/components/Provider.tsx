'use client';
import { NextAuthProvider } from '@contexts/nextAuthProvider';
import { Provider as LocalProvider } from 'react-redux';
import { store } from '@redux-store/index';

const Provider = (props: any) => {
  // Props
  const { children } = props;

  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>
      <LocalProvider store={store}>{children}</LocalProvider>
    </NextAuthProvider>
  );
};

export default Provider;
