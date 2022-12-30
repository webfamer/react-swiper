import FullScreenContainer from '@/components/FullScreenContainer';
import {
  IRouteComponentProps,
} from 'umi';
import { FC } from 'react';
const Layout: FC<
  IRouteComponentProps & { address: string; isLogin: boolean; userName: string }
> = ({ children, location, history, address, isLogin, userName }) => {
  return (
    <div className="indexPage">
      <FullScreenContainer>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {children}
        </div>
      </FullScreenContainer>
    </div>
  );
};

export default Layout
