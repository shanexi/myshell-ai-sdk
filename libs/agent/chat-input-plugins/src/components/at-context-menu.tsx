import { useEffect, useRef, useState } from 'react';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface MentionDropdownProps {
  users: User[];
  onSelect: (user: User) => void;
  onClose: () => void;
  anchorRect: DOMRect;
}

// mock 数据
export const users: User[] = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?img=4' },
];

export const MentionDropdown: React.FC<MentionDropdownProps> = ({
  users,
  onSelect,
  onClose,
  anchorRect,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!dropdownRef.current) return;

    // 创建虚拟定位元素
    const virtualElement = {
      getBoundingClientRect: () => anchorRect,
    };

    // 计算位置
    computePosition(virtualElement, dropdownRef.current, {
      placement: 'bottom-start',
      middleware: [offset(6), flip(), shift({ padding: 8 })],
    }).then(({ x, y }) => {
      if (dropdownRef.current) {
        Object.assign(dropdownRef.current.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      }
    });
  }, [anchorRect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, users.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          onSelect(users[selectedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [users, selectedIndex, onSelect, onClose]);

  return (
    <div
      ref={dropdownRef}
      style={{
        position: 'absolute',
        background: 'white',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        minWidth: '200px',
        maxHeight: '200px',
        overflowY: 'auto',
      }}
    >
      {users.map((user, index) => (
        <div
          key={user.id}
          onClick={() => onSelect(user)}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            backgroundColor:
              index === selectedIndex ? '#f0f2f5' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
              }}
            />
          )}
          <span>{user.name}</span>
        </div>
      ))}
    </div>
  );
};
