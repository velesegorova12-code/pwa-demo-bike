import styled from 'styled-components'

export const ToastContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  align-items: center;
  background-color: #ff4d4f;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-weight: 600;
  min-width: 300px;
  justify-content: space-between;
`

export const CloseButton = styled.button`
  margin-left: 15px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`
