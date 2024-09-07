import { FormApi } from '@tanstack/react-form';
import { KnowledgeBaseInfo, WorkShopForm } from '../../../../../../src/common/constants/interfaces/bot.js';
declare function KnowledgeBaseForm({ botId, disable, onUpdateId, form, knowledgeList, setKnowledgeList, showLearnMore, isGuide, onSave }: {
    form: FormApi<WorkShopForm>;
    botId: string;
    disable: boolean;
    onUpdateId: (botId: string) => void;
    knowledgeList: KnowledgeBaseInfo[];
    setKnowledgeList: (list: KnowledgeBaseInfo[]) => void;
    showLearnMore: (section: string) => void;
    isGuide: boolean;
    onSave: () => void;
}): import("react/jsx-runtime").JSX.Element;
export default KnowledgeBaseForm;
