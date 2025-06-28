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
  commingSoon?: boolean;
}>(({ commingSoon }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const model = useInjection(AgentChatInputModel);

  useEffect(() => {
    if (!dropdownRef.current) return;

    // 创建虚拟定位元素
    const virtualElement = {
      getBoundingClientRect: () =>
        // 已经有判断 `model.chatCommon.edixModel.contextMenuRect && <ContextMenu />`
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        model.chatCommon.edixModel.contextMenuRect!,
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
  }, [model.chatCommon.edixModel.contextMenuRect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          model.setSelectedMenuIndex(
            Math.min(
              model.selectedMenuIndex + 1,
              model.filteredContextMenus.length - 1,
            ),
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          model.setSelectedMenuIndex(Math.max(model.selectedMenuIndex - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (commingSoon) return;
          model.onSelectContext(model.selectedMenuIndex);
          break;
        case 'Escape':
          e.preventDefault();
          model.onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      {model.filteredContextMenus.map((item, index) => {
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
              index === model.selectedMenuIndex
                ? 'bg-[#F5F4F2]'
                : 'transparent',
            )}
            onMouseEnter={() => model.setSelectedMenuIndex(index)}
          >
            <div
              onClick={() => model.onSelectContext(index)}
              className={cn('flex items-center gap-spacing-sm-v2')}
            >
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
              className="h-full text-Cr-Fg-subtlest-light-v2"
            />
          </div>
        );
      })}

      {/* Coming Soon 遮罩 */}
      {commingSoon && (
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
      )}
    </div>
  );
});
