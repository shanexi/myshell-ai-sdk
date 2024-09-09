import { ActionTypes } from '../../../../src/common/constants/enums/post';
import { TagInfo } from '../../../../src/common/constants/interfaces/bot';
export interface AuthorInfo {
    userId: string;
    userName: string;
    avatar: string;
    nameTag: string;
}
export interface IForumItem {
    id: string;
    title: string;
    viewCount: number;
    desc: string;
    authorInfo: AuthorInfo;
    likeCount: number;
    language: string;
    source: string;
    createdDate: string;
    sideImageLink: string;
    readTime: string;
    pinned: boolean;
    postSourceLink: string;
    tagsInfo: TagInfo[];
    userAction: ActionTypes;
}
export interface IPostDetail {
    listInfo: IForumItem;
    content: string;
    renderMethod: 'HTML' | 'MARKDOWN';
}
