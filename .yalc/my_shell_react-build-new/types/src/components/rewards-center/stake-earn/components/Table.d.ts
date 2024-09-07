import { OrderBy, OrderByFields, OrderSort } from '../../../../../../src/apis/apiTypes.js';
type Render<T> = (record: T) => React.ReactElement;
interface IColumn<T> {
    title: string;
    key: string;
    mobile?: boolean;
    dataIndex?: keyof T;
    sortable?: boolean;
    tip?: string;
    render?: Render<T>;
}
interface ITableProps<T> {
    dataSource: T[];
    columns: Array<IColumn<T>>;
    loading?: boolean;
    rowClickable?: boolean;
    defaultSort?: OrderSort;
    defaultField?: OrderByFields;
    renderEmpty: () => React.ReactNode;
    isRowHighlight?: (record: T) => boolean;
    onRowClick?: (record: T) => void;
    onSortClick?: ({ orderBy, columnKey }: {
        orderBy: OrderBy;
        columnKey: string;
    }) => Promise<void>;
    expandedRowRender?: (record: T) => React.ReactNode;
}
export default function Table<T>({ dataSource, columns, loading, renderEmpty, rowClickable, defaultField, defaultSort, isRowHighlight, onRowClick, onSortClick, expandedRowRender }: ITableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
