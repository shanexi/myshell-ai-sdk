import React, { ComponentType } from 'react';
declare const withAuth: <P extends {}>(WrappedComponent: ComponentType<P>, redirectRoute?: string | null, loading?: JSX.Element | null) => React.FC<P>;
export default withAuth;
