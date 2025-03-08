import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background: var(--color-background-primary);
    padding: 20px;
    border-radius: var(--border-radius-md);
    width: 400px;
    box-shadow: var(--box-shadow);
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const ModalBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
`;

export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

export const Input = styled.input`
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    font-size: 16px;
`;

export const Button = styled.button<{ variant: string }> `
    padding: 8px 12px;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    background: ${({ variant }) =>
        variant === "primary" ? "var(--color-primary)" : "var(--color-secondary)"};
    color: var(--color-text-on-primary);
    display: flex;
    align-items: center;
    gap: 8px;
    
    &:hover {
        opacity: 0.8;
    }
`;
