"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type ModalContextType = {
  show: (content: ReactNode) => void;
  hide: () => void;
  hideWithRefresh: () => void;
  isOpen: boolean;
  content: ReactNode;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const show = (c: ReactNode) => {
    setContent(c);
    setIsOpen(true);
  };

  const hide = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const hideWithRefresh = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      window.location.reload();
    }, 300);
  };

  return (
    <ModalContext.Provider
      value={{ show, hide, hideWithRefresh, isOpen, content }}
    >
      {children}
      {isOpen && (
        <div
          className={`fixed p-10 inset-0 z-50 flex items-center justify-center bg-surface/50 backdrop-blur-xs transition-opacity duration-300 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={hide}
        >
          <div
            className={`flex flex-col items-center h-full h-max-3/4 overflow-scroll relative w-full transition-all duration-300 ease-out transform ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
