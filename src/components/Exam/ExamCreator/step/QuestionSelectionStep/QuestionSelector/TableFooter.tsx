import React from 'react'
import { ActionButton, Footer, Pagination } from './styles';
import { FiRefreshCw } from 'react-icons/fi';

const TableFooter: React.FC<{ count: number }> = ({ count }) => (
    <Footer>
        <div>Mostrando {count} questões</div>
        <Pagination>
            <ActionButton className="view" aria-label="Recarregar questões">
                <FiRefreshCw size={16} />
            </ActionButton>
            <span>Página 1 de 1</span>
        </Pagination>
    </Footer>
);

export default TableFooter;