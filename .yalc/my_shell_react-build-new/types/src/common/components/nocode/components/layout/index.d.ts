import React from 'react';
interface ILayoutProps {
    children?: React.ReactNode;
}
declare function Layout(props: ILayoutProps): import("react/jsx-runtime").JSX.Element;
interface ISideBarProps {
    children?: React.ReactNode;
}
declare function Sidebar(props: ISideBarProps): import("react/jsx-runtime").JSX.Element;
interface IWrokspaceProps {
    children?: React.ReactNode;
}
declare function Workspace(props: IWrokspaceProps): import("react/jsx-runtime").JSX.Element;
export { Layout, Sidebar, Workspace };
