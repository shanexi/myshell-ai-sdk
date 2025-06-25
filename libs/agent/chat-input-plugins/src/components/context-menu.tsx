import { useEffect, useRef, useState } from 'react';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { cn } from '@myshell-run/common-ui';
import { ContextType } from './agent-chat-input.model';
import { IconMap } from './chat-input-context-plugin';
import { ChevronRight } from 'lucide-react';

type ContextItem = {
  id: string;
  name: string;
  type: ContextType;
};

type ContextMenuProps = {
  items: ContextItem[];
  onSelect: (user: ContextItem) => void;
  onClose: () => void;
  anchorRect: DOMRect;
};

// mock 数据
export const items: Array<{
  id: string;
  name: string;
  type: ContextType;
}> = [
  { id: '1', name: 'Requirement', type: 'requirement' },
  { id: '2', name: 'Preview', type: 'preview' },
  { id: '3', name: 'Canvas', type: 'canvas' },
  { id: '4', name: 'Test', type: 'test' },
];

// TODO menu dropdown 用一个 stories 实现 样式 + 切换 menu（二级）+ search（本质上也是切换 menu）
export const ContextMenu: React.FC<ContextMenuProps> = ({
  items,
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
          setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          onSelect(items[selectedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onSelect, onClose]);

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'absolute',
        'bg-[#FFFEFD]',
        'border border-Cr-border-opaque-light-v2',
        'rounded-C-dropdown-radius-v2',
        'z-1000',
        'overflow-y-auto',
        'p-spacing-sm-v2',
      )}
      style={{
        boxShadow:
          '2px 6px 18px 0px var(--color-CCr-shadows-modal-default-bolder-light-v2, rgba(0, 0, 0, 0.12))',
      }}
    >
      {items.map((item, index) => {
        const Icon = IconMap[item.type];
        return (
          <div
            key={item.id}
            className={cn(
              'flex items-center justify-between gap-spacing-sm-v2',
              'rounded-sm-v2',
              'cursor-pointer',
              'px-spacing-sm-v2 py-spacing-xs-v2',
              'w-[180px]',
              index === selectedIndex ? 'bg-[#F5F4F2]' : 'transparent',
            )}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <div
              onClick={() => onSelect(item)}
              className={cn('flex items-center gap-spacing-sm-v2')}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span>{item.name}</span>
            </div>
            <ChevronRight
              size={16}
              strokeWidth={1.5}
              className="h-full text-Cr-Fg-subtlest-light-v2"
            />
          </div>
        );
      })}
    </div>
  );
};
