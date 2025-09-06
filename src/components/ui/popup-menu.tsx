
import React from "react";
import { Sheet } from 'react-modal-sheet';

interface PopupMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showHeader?: boolean;
  className?: string;
}

export function PopupMenu({
  isOpen,
  onClose,
  children,
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
      className="max-w-screen-custom m-auto bg-black/30"
    >
      <Sheet.Container
        className="bg-background pt-0"
        style={{
          borderRadius: '30px 30px 0 0',
          boxShadow: 'none',
        }}>
        <Sheet.Content>
          <div
            className="bg-background pb-10 px-4"
            style={{
              borderRadius: '22px 22px 0 0',
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
