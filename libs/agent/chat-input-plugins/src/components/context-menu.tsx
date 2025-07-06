import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import { cn, context_type_schema } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { Braces, ChevronRight, LucideProps } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { AgentChatInputModel } from './agent-chat-input.model';
import { IconMap } from './chat-input-context-plugin';

// TODO menu dropdown 用一个 stories 实现 样式 + 切换 menu（二级）+ search（本质上也是切换 menu）
export const ContextMenu = observer<{
  comingSoon?: boolean;
}>(({ comingSoon }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const model = useInjection(AgentChatInputModel);

  useEffect(() => {
    if (!dropdownRef.current) return;

    // 创建虚拟定位元素
    const virtualElement = {
      getBoundingClientRect: () =>
        // 已经有判断 `model.chatCommon.edixModel.contextMenuRect && <ContextMenu />`
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        model.chatCommon.edix.contextMenuRect!,
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
    // 虽然我很不喜欢 useEffect + deps 但是先这样
    // 这块是 AI 生成的
  }, [
    model.chatCommon.edix.contextMenuRect,
    model.chatCommon.edix.filteredContextMenus.length, // fix 搜索的时候 menu 位置
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          model.chatCommon.edix.setSelectedMenuIndex(
            model.chatCommon.edix.selectedMenuIndex ===
              model.chatCommon.edix.filteredContextMenus.length - 1
              ? 0 // If at bottom, wrap to top
              : model.chatCommon.edix.selectedMenuIndex + 1,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          model.chatCommon.edix.setSelectedMenuIndex(
            model.chatCommon.edix.selectedMenuIndex === 0
              ? model.chatCommon.edix.filteredContextMenus.length - 1 // If at top, wrap to bottom
              : model.chatCommon.edix.selectedMenuIndex - 1,
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (comingSoon) return;
          model.chatCommon.edix.onSelectContext(
            // 特殊处理
            Math.min(
              model.chatCommon.edix.filteredContextMenus.length - 1,
              model.chatCommon.edix.selectedMenuIndex,
            ),
          );
          break;
        case 'Escape':
          e.preventDefault();
          model.chatCommon.edix.onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (model.chatCommon.edix.filteredContextMenus.length === 0) return;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'absolute',
        'bg-[#FFFEFD]',
        'border border-Cr-border-opaque-v2',
        'rounded-C-dropdown-radius-v2',
        'z-1000',
        'overflow-y-auto',
        'p-spacing-sm-v2',
      )}
      style={{
        boxShadow:
          '2px 6px 18px 0px var(--color-CCr-shadows-modal-default-bolder-v2, rgba(0, 0, 0, 0.12))',
      }}
    >
      {model.chatCommon.edix.filteredContextMenus.map((item, index) => {
        let Icon: React.ForwardRefExoticComponent<
          Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
        >;
        // 兜底
        const typeRes = context_type_schema.safeParse(item.type);
        if (typeRes.success === false) {
          Icon = Braces;
        } else {
          Icon = IconMap[typeRes.data];
        }
        return (
          <div
            key={item.content.name}
            className={cn(
              'flex items-center justify-between gap-spacing-sm-v2',
              'rounded-sm-v2',
              'cursor-pointer',
              'px-spacing-sm-v2 py-spacing-xs-v2',
              'w-[180px]',
              index ===
                // 特殊处理
                Math.min(
                  model.chatCommon.edix.selectedMenuIndex,
                  model.chatCommon.edix.filteredContextMenus.length - 1,
                )
                ? 'bg-[#F5F4F2]'
                : 'transparent',
            )}
            onClick={() => {
              model.chatCommon.edix.onSelectContext(index);
            }}
            onMouseEnter={() => {
              model.chatCommon.edix.setSelectedMenuIndex(index);
            }}
          >
            <div className={cn('flex items-center gap-spacing-sm-v2')}>
              <Icon size={20} strokeWidth={1.5} />
              <span>
                {item.highlightedName.map((segment, segmentIndex) => (
                  <span
                    key={segmentIndex}
                    className={
                      segment.isMatch ? 'bg-yellow-200 font-medium' : ''
                    }
                  >
                    {segment.char}
                  </span>
                ))}
              </span>
            </div>
            <ChevronRight
              size={16}
              strokeWidth={1.5}
              className="h-full text-Cr-Fg-subtlest-v2"
            />
          </div>
        );
      })}
      {comingSoon && <ComingSoon />}
    </div>
  );
});

// Coming Soon 遮罩
export const ComingSoon = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        zIndex: 10,
      }}
    >
      <div
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          color: '#666',
        }}
      >
        Coming Soon
      </div>
    </div>
  );
};
