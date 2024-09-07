import React from 'react';
import { IAutomata } from '../../types/IAutomata';
interface IHeaderProps {
    loading?: boolean;
    onSave?: (data: IAutomata) => void;
    onChange?: (data: IAutomata) => void;
    onClose?: () => void;
}
declare const Header: React.FC<IHeaderProps>;
export { Header };
