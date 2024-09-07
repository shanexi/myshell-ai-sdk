import { TagInfo } from './bot';
import { ActionTypes } from '../enums/post';
export interface PostInfo {
    id: string;
    title: string;
    viewCount: string;
    desc: string;
    authorInfo: {
        userId: string;
        userName: string;
        avatar: string;
        nameTag: string;
    };
    likeCount: number;
    language: string;
    source: string;
    createdDate: string;
    sideImageLink: string;
    readTime: string;
    pinned: boolean;
    tagsInfo: TagInfo[];
    userAction: ActionTypes;
}
