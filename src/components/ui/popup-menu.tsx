
import React from "react";
import { Sheet } from 'react-modal-sheet';

interface PopupMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  className?: string;
}

export function PopupMenu({
  isOpen,
  onClose,
  children,
  title,
}: PopupMenuProps) {

  const handleClose = () => {
    onClose && onClose()
  }

  return (
    <Sheet
      isOpen={isOpen}
      onClose={handleClose}
      detent="content-height"
      disableScrollLocking={true}
      className="max-w-screen-custom m-auto"
    >
      <Sheet.Container
        className="bg-secondary pt-0"
        style={{
          borderRadius: '20px 20px 0 0',
          boxShadow: 'none',
        }}>
        <Sheet.Content>
          <div
            className="bg-secondary pb-10 px-4"
            style={{
              borderRadius: '20px 20px 0 0',
              boxShadow: 'none',
            }}>
            <Sheet.Header />
            {children}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={handleClose} />
    </Sheet>
  );
}
